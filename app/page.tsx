"use client";

import { useState, useEffect } from "react";
import currency from "currency.js";
import { InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { timeInTransitByState, StateData, states } from "./data/stateData";
import { stateToZone } from "./data/stateToZone";
import { calculateShippingRateBottles, Rates } from "./calculators/bottles";
import { calculateShippingRateMags } from "./calculators/mags";
import styles from "./page.module.css";

const Home = () => {
  const [state, setState] = useState<string>("");
  const [stateData, setStateData] = useState<StateData | "">("");

  const [bottleCount, setBottleCount] = useState<string>("");
  const [magCount, setMagCount] = useState<string>("");

  const [shippingRate, setShippingRate] = useState<Rates | null>(null);

  const validState = stateData && stateData.notes !== "No shipments allowed";

  const [zone, setZone] = useState<number | null>(null);

  const [displayExpedited, setDisplayExpedited] = useState<boolean>(false);

  const clearForm = () => {
    setState("");
    setZone(null);
    setStateData("");
    setBottleCount("");
    setMagCount("");
    setShippingRate(null);
    setDisplayExpedited(false);
  };

  const clearButtonIsDisabled = !state && !bottleCount && !magCount;

  const canCalculate = !!(state && (bottleCount || magCount)) && validState;

  const daysInTransitCopy =
    stateData && stateData.daysInTransit === 1 ? "day" : "days";

  useEffect(() => {
    if (!state) return;

    const timeInTransit =
      timeInTransitByState.find((data) => data.state === state) || "";

    setStateData(timeInTransit);
    setZone(stateToZone[state].ZONE);
  }, [state]);

  return (
    <main className={styles.main}>
      <h1 className={styles.header}>Shipping Calculator</h1>
      <div className={styles.tool}>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            const magTotal = calculateShippingRateMags(
              Number(magCount),
              `${zone}`,
            );
            const bottleTotal = calculateShippingRateBottles(
              Number(bottleCount),
              `${zone}`,
            );

            setShippingRate({
              ...((bottleTotal.standard || magTotal.standard) && {
                standard: (magTotal.standard || currency("")).add(
                  bottleTotal.standard || currency(""),
                ),
              }),
              ...((magTotal.express || bottleTotal.express) && {
                express: (magTotal.express || currency("")).add(
                  bottleTotal.express || currency(""),
                ),
              }),
              ...((magTotal.twoDay || bottleTotal.twoDay) && {
                twoDay: (magTotal.twoDay || currency("")).add(
                  bottleTotal.twoDay || currency(""),
                ),
              }),
              ...((magTotal.overnight || bottleTotal.overnight) && {
                overnight: (magTotal.overnight || currency("")).add(
                  bottleTotal.overnight || currency(""),
                ),
              }),
            });
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="state">State</InputLabel>
            <div className={styles.fields}>
              <Select
                defaultValue=""
                id="state"
                label="state"
                value={state}
                onChange={(e: SelectChangeEvent) => {
                  clearForm();
                  setState(e.target.value);
                }}
              >
                {states.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </Select>

              <TextField
                id="bottle-count"
                label="Bottles"
                value={bottleCount}
                disabled={!stateData || !validState}
                onChange={(e) => {
                  setBottleCount(e.target.value.replace(/\D+/g, ""));
                  setShippingRate(null);
                }}
                helperText="750ml or smaller"
              />
              <TextField
                id="mag-count"
                label="Mags"
                value={magCount}
                disabled={!stateData || !validState}
                onChange={(e) => {
                  setMagCount(e.target.value.replace(/\D+/g, ""));
                  setShippingRate(null);
                }}
              />
              <Button type="submit" variant="outlined" disabled={!canCalculate}>
                Calculate Rate
              </Button>
            </div>
          </FormControl>
        </form>

        <div />
      </div>
      <div className={styles.data}>
        <div className={styles.shippingNotes}>
          {stateData && !validState ? <p>No shipments allowed</p> : null}
          {stateData && validState ? (
            <>
              <div className={styles.shippingMeta}>
                <span className={styles.eyebrow}>Shipping to</span>
                <h4 className={styles.destination}>{stateData.state}</h4>
                <p className={styles.transit}>
                  {stateData.daysInTransit} {daysInTransitCopy} in transit
                </p>
              </div>
              {stateData.notes ? (
                <div className={styles.notes}>{stateData.notes}</div>
              ) : null}
            </>
          ) : null}
        </div>
        {shippingRate?.standard ? (
          <div className={styles.rate}>
            <div className={styles.rateRow}>
              <span className={styles.rateLabel}>Standard</span>
              <span className={styles.rateValue}>
                {shippingRate.standard.format()}
              </span>
            </div>
            <div className={styles.rateSub}>
              with tax {shippingRate.standard.multiply(1.08875).format()}
            </div>
            {shippingRate?.overnight ? (
              <Button
                style={{
                  marginTop: "10px",
                }}
                variant="outlined"
                disabled={!canCalculate}
                onClick={() => setDisplayExpedited((prev) => !prev)}
              >
                {displayExpedited ? "Hide" : "Show"} Expedited Rates
              </Button>
            ) : (
              <p className={styles.expeditedNotAvailable}>
                Expedited service not available.
              </p>
            )}
            {displayExpedited ? (
              <div className={styles.expeditedRates}>
                <p>Express Saver: {shippingRate.express?.format()}</p>
                <p>Two Day: {shippingRate.twoDay?.format()}</p>
                <p>Overnight: {shippingRate.overnight?.format()}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
      <Button
        style={{
          marginTop: "10px",
        }}
        variant="outlined"
        disabled={clearButtonIsDisabled}
        onClick={() => clearForm()}
      >
        Start over
      </Button>
      <div />
      <p className={styles.updateNote}>Last Updated January 2026</p>
    </main>
  );
};

export default Home;

"use client";
import { useState, useEffect } from "react";
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

  console.log({ shippingRate });

  const validState = stateData && stateData.notes !== "No shipments allowed";

  const [zone, setZone] = useState<number | null>(null);

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
      <div className={styles.tool}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ bottleCount, magCount, state, zone });
            const magTotal = calculateShippingRateMags(
              Number(magCount),
              `${zone}`
            );
            const bottleTotal = calculateShippingRateBottles(
              Number(bottleCount),
              `${zone}`
            );
            setShippingRate({
              standard: magTotal.standard.add(bottleTotal.standard),
              express: magTotal.express.add(bottleTotal.express),
              twoDay: magTotal.twoDay.add(bottleTotal.twoDay),
              overnight: magTotal.overnight.add(bottleTotal.overnight),
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
                onChange={(e: SelectChangeEvent) => {
                  setBottleCount("");
                  setMagCount("");
                  setShippingRate(null);
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
                className={styles.input}
                value={bottleCount}
                disabled={!stateData || !validState}
                onChange={(e) => {
                  setBottleCount(e.target.value);
                  setShippingRate(null);
                }}
                helperText="750ml or smaller"
              />
              <TextField
                id="mag-count"
                label="Mags"
                value={magCount}
                disabled={!stateData || !validState}
                className={styles.input}
                onChange={(e) => {
                  setMagCount(e.target.value);
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
              <div>
                <h5>Shipping to {stateData.state}</h5>
                {stateData.daysInTransit} {daysInTransitCopy} in transit
              </div>
              {stateData.notes ? (
                <div className={styles.notes}>{stateData.notes}</div>
              ) : null}
            </>
          ) : null}
        </div>
        {shippingRate?.standard ? (
          <div className={styles.rate}>
            <p>Standard Rate: {shippingRate.standard.format()}</p>
            <p>with Tax: {shippingRate.standard.multiply(1.08875).format()}</p>
            <Button
              style={{
                borderColor: "#6262ac",
                color: "#6262ac",
                marginTop: "5px",
              }}
              variant="outlined"
              disabled={!canCalculate}
              onClick={() => console.log("hey!")}
            >
              Show Expedited Rates
            </Button>
          </div>
        ) : null}
      </div>
      <div />
    </main>
  );
};

export default Home;

"use client";
import { useState, useEffect } from "react";
import { InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import { timeInTransitByState, StateData, states } from "./data/stateData";
import styles from "./page.module.css";

const Home = () => {
  const [state, setState] = useState<string>("");
  const [stateData, setStateData] = useState<StateData | "">("");

  const [bottleCount, setBottleCount] = useState<string>("");
  const [magCount, setMagCount] = useState<string>("");

  const [shippingRate, setShippingRate] = useState<any>(null);

  const canCalculate = !!(state && (bottleCount || magCount)); // also add logic about being able to ship there

  useEffect(() => {
    if (!state) return;

    const timeInTransit =
      timeInTransitByState.find((data) => data.state === state) || "";

    setStateData(timeInTransit);
  }, [state]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Shipping Calculator</p>
      </div>
      <div className={styles.tool}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ bottleCount, magCount, state });
            setShippingRate("testing!");
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="state">State</InputLabel>
            <div className={styles.fields}>
              <Select
                defaultValue=""
                id="state"
                label="state"
                onChange={(e: SelectChangeEvent) => setState(e.target.value)}
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
                onChange={(e) => setBottleCount(e.target.value)}
                helperText="750ml or smaller"
              />
              <TextField
                id="mag-count"
                label="Mags"
                className={styles.input}
                onChange={(e) => setMagCount(e.target.value)}
              />
              <Button type="submit" variant="outlined" disabled={!canCalculate}>
                Calculate Rate
              </Button>
            </div>
          </FormControl>
        </form>
        <div className={styles.regionInfo}>
          {stateData ? (
            <>
              <div>Days in transit: {stateData.daysInTransit}</div>
              {stateData.notes ? <div>{stateData.notes}</div> : null}
            </>
          ) : null}
        </div>
        <div />
      </div>
      <div className={styles.rate}>
        {shippingRate ? <>Shipping Rate: {shippingRate}</> : null}
      </div>
      <div />
    </main>
  );
};

export default Home;

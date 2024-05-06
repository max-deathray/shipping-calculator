"use client";
import { useState, useEffect } from "react";
import { InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { timeInTransitByState, StateData, states } from "./data/stateData";
import styles from "./page.module.css";

const Home = () => {
  const [state, setState] = useState<string>("");
  const [stateData, setStateData] = useState<StateData | "">("");

  const [bottleCount, setBottleCount] = useState<number | null>(null);
  const [magCount, setMagCount] = useState<number | null>(null);

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
      <div className={styles.center}>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="state">State</InputLabel>
          <Select
            defaultValue=""
            id="state"
            label="state"
            onChange={(event: SelectChangeEvent) =>
              setState(event.target.value)
            }
          >
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {stateData ? (
          <div>
            {stateData.daysInTransit} | {stateData.notes}
          </div>
        ) : null}
        <div />
      </div>
      <div />
    </main>
  );
};

export default Home;

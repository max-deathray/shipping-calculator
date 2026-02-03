import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";
import { headers } from "next/headers";
import styles from "./page.module.css";
import { standardRatesByZone } from "../data/shippingRates/standardShippingRates";
import { expressSaverRatesByZone } from "../data/shippingRates/expressSaveRates";
import { twoDayRatesByZone } from "../data/shippingRates/twoDayRates";
import { overnightRatesByZone } from "../data/shippingRates/overnightRates";

// ---- helpers ----

const getZones = (ratesByZone: Record<string, Record<string, string>>) =>
  Object.keys(ratesByZone).sort((a, b) => Number(a) - Number(b));

const getBottleCounts = (
  ratesByZone: Record<string, Record<string, string>>,
) => {
  const firstZone = Object.keys(ratesByZone)[0];
  return Object.keys(ratesByZone[firstZone]).sort(
    (a, b) => Number(a) - Number(b),
  );
};

// ---- reusable table ----

function RatesTable({
  title,
  ratesByZone,
}: {
  title: string;
  ratesByZone: Record<string, Record<string, string>>;
}) {
  const zones = getZones(ratesByZone);
  const bottleCounts = getBottleCounts(ratesByZone);

  return (
    <>
      <h2>{title}</h2>

      <table className={styles.table}>
        <colgroup>
          <col className={styles.bottlesCol} />
          {zones.map((zone) => (
            <col key={zone} className={styles.zoneCol} />
          ))}
        </colgroup>

        <thead>
          <tr>
            <th>Bottles</th>
            {zones.map((zone) => (
              <th key={zone}>Zone {zone}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {bottleCounts.map((count) => (
            <tr key={count}>
              <td>{count}</td>
              {zones.map((zone) => (
                <td key={zone}>{ratesByZone[zone][count]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

// ---- page ----

export default function OperationsPage() {
  const pathname = headers().get("x-pathname") || "/operations";

  return (
    <main className={styles.main}>
      <h1>Operations Reference</h1>

      <p className={styles.note}>
        Raw rate inputs used by the shipping calculator. Values are shown
        exactly as defined in code.
      </p>

      <RatesTable
        title="Standard Bottle Rates (750ml or smaller)"
        ratesByZone={standardRatesByZone}
      />

      <RatesTable
        title="Express Saver Bottle Rates"
        ratesByZone={expressSaverRatesByZone}
      />

      <RatesTable
        title="Two Day Bottle Rates"
        ratesByZone={twoDayRatesByZone}
      />

      <RatesTable
        title="Overnight Bottle Rates"
        ratesByZone={overnightRatesByZone}
      />
      <footer className={styles.utilityFooter}>
        <span>Last updated January 2026</span>

        <span className={styles.utilityLinks}>
          <a
            href="/"
            aria-label="Calculator"
            className={styles.utilityIconLink}
          >
            <CalculateOutlinedIcon fontSize="small" />
          </a>
        </span>
      </footer>
    </main>
  );
}

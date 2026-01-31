// Manual sanity check: verifies *_7 files equal old * 1.07 rounded to cents.

export type RatesByZone = Record<string, Record<string, string>>;

const toCents = (s: string) => Math.round(parseFloat(s.replace("$", "")) * 100);
const fromCents = (cents: number) => `$${(cents / 100).toFixed(2)}`;

// Multiply by 1.07 exactly in cents, rounding to nearest cent (half-up).
const bump7 = (oldCents: number) => Math.round((oldCents * 107) / 100);

export function verify(
  label: string,
  oldRates: RatesByZone,
  newRates: RatesByZone,
) {
  let errors = 0;

  for (const zone of Object.keys(oldRates)) {
    for (const count of Object.keys(oldRates[zone])) {
      const oldCents = toCents(oldRates[zone][count]);
      const newCents = toCents(newRates[zone][count]);
      const expectedCents = bump7(oldCents);

      if (newCents !== expectedCents) {
        console.error(
          `❌ ${label} | zone ${zone}, count ${count}: expected ${fromCents(
            expectedCents,
          )}, got ${fromCents(newCents)}`,
        );
        errors++;
      }
    }
  }

  if (errors === 0) console.log(`✅ ${label}: all rates correct`);
  else console.log(`⚠️ ${label}: ${errors} mismatches`);
}

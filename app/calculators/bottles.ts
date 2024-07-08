import currency from "currency.js";
import { materialRatesByBottleCount } from "../data/materialRates";
import { standardRatesByZone } from "../data/shippingRates/standardShippingRates";
import { expressSaverRatesByZone } from "../data/shippingRates/expressSaveRates";
import { twoDayRatesByZone } from "../data/shippingRates/twoDayRates";
import { overnightRatesByZone } from "../data/shippingRates/overnightRates";

type GroupQty = {
  quantity: number;
};

type Breakdown = Array<Record<string, GroupQty>>;

export type Rates = Record<string, currency | undefined>;

type BreakdownWithCosts = {
  quantity: number;
  materialName: string;
  materialCost: string;
  standard: string;
  express?: string;
  twoDay?: string;
  overnight?: string;
};

type BreakdownObject = Record<string, BreakdownWithCosts>;

export const determineBreakdown = (bottleCount: number) => {
  let count = bottleCount;
  const groups = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const breakdown: Breakdown = [];

  for (let i = 0; i < groups.length; i++) {
    const currentGroup = groups[i];

    while (count >= currentGroup) {
      const quantityOfCurrentGroup = Math.floor(count / currentGroup);

      breakdown.push({ [currentGroup]: { quantity: quantityOfCurrentGroup } });

      count = count % currentGroup;
    }
  }

  return breakdown;
};

// this could be consolidated with the helper on mags.ts
const addCostsToBreakdown = (breakdown: Breakdown, zone: string) => {
  return breakdown.map((box) => {
    const keys = Object.keys(box);

    const bottleCount = keys[0];

    const newBox = {
      [bottleCount]: {
        quantity: box[bottleCount].quantity,
        materialName: materialRatesByBottleCount[bottleCount].package,
        materialCost: materialRatesByBottleCount[bottleCount].cost,
        standard: standardRatesByZone[zone][bottleCount],
        ...(zone in expressSaverRatesByZone && {
          express: expressSaverRatesByZone[zone][bottleCount],
        }),
        ...(zone in twoDayRatesByZone && {
          twoDay: twoDayRatesByZone[zone][bottleCount],
        }),
        ...(zone in overnightRatesByZone && {
          overnight: overnightRatesByZone[zone][bottleCount],
        }),
      },
    };

    return newBox;
  });
};

export const sumUpCosts = (breakdown: Array<BreakdownObject>) => {
  let rates: Rates = {};

  breakdown.forEach((breakdown: BreakdownObject) => {
    const packageCategory: any = Object.values(breakdown)[0];

    const { quantity, materialCost, materialName, ...shippingRates } =
      packageCategory;

    for (const key in shippingRates) {
      const shippingRate = shippingRates[key];

      const runningTotal = rates[key] || currency("");
      rates[key] = runningTotal?.add(
        currency(materialCost).add(shippingRate).multiply(quantity)
      );
    }
  });

  return rates;
};

// 750s
export const calculateShippingRateBottles = (
  bottleCount: number,
  zone: string
): Rates => {
  const breakdown = determineBreakdown(bottleCount);

  const breakdownWithCosts = addCostsToBreakdown(breakdown, zone);

  const rates = sumUpCosts(breakdownWithCosts);

  return rates;
};

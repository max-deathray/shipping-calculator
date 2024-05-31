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

export type Rates = {
  standard: currency;
  express: currency;
  twoDay: currency;
  overnight: currency;
};

type BreakdownWithCosts = {
  quantity: number;
  materialName: string;
  materialCost: string;
  standardRate: string;
  expressSaverRate: string;
  twoDayRate: string;
  overnightRate: string;
};

type BreakdownObject = Record<string, BreakdownWithCosts>;

const determineBreakdown = (bottleCount: number) => {
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

const addCostsToBreakdown = (breakdown: Breakdown, zone: string) => {
  return breakdown.map((box) => {
    const keys = Object.keys(box);

    const bottleCount = keys[0];

    console.log({ overnightRatesByZone });

    const newBox = {
      [bottleCount]: {
        quantity: box[bottleCount].quantity,
        materialName: materialRatesByBottleCount[bottleCount].package,
        materialCost: materialRatesByBottleCount[bottleCount].cost,
        standardRate: standardRatesByZone[zone][bottleCount],
        expressSaverRate: expressSaverRatesByZone[zone][bottleCount],
        twoDayRate: twoDayRatesByZone[zone][bottleCount],
        overnightRate: overnightRatesByZone[zone][bottleCount],
        // overightRates: "1.00",
      },
    };

    return newBox;
  });
};

export const sumUpCosts = (breakdown: Array<BreakdownObject>) => {
  let standard = currency("");
  let express = currency("");
  let twoDay = currency("");
  let overnight = currency("");

  breakdown.forEach((breakdown: BreakdownObject) => {
    const packageCategory: any = Object.values(breakdown)[0];

    const {
      quantity,
      materialCost,
      standardRate,
      expressSaverRate,
      twoDayRate,
      overnightRate,
    } = packageCategory;

    const boxTotals = [
      standardRate,
      expressSaverRate,
      twoDayRate,
      overnightRate,
    ];

    const boxTotalsWithMaterials = boxTotals.map((shippingRate) =>
      currency(materialCost).add(shippingRate).multiply(quantity)
    );

    const [s, e, t, o] = boxTotalsWithMaterials;

    standard = s;
    express = e;
    twoDay = t;
    overnight = o;
  });

  return { standard, express, twoDay, overnight };
};

// 750s
export const calculateShippingRateBottles = (
  bottleCount: number,
  zone: string
): Rates => {
  const breakdown = determineBreakdown(bottleCount);

  const breakdownWithCosts = addCostsToBreakdown(breakdown, zone);

  const rates = sumUpCosts(breakdownWithCosts);

  // also add support for expedited shipping
  // thinking maybe return an object with all the different rates
  // and only show if the user wants to see?

  return rates;
};

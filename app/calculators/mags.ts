import { materialRatesByMagCount } from "../data/materialRates";
import { standardRatesByZone } from "../data/shippingRates/standardShippingRates";
import { sumUpCosts } from "./bottles";

type GroupQty = {
  quantity: number;
};

type Breakdown = Array<Record<string, GroupQty>>;

type BreakdownWithCosts = {
  quantity: number;
  materialName: string;
  materialCost: string;
  shippingRate: string;
};

type BreakdownObject = Record<string, BreakdownWithCosts>;

const determineBreakdown = (magCount: number) => {
  let count = magCount;
  const groups = [6, 5, 4, 3, 2, 1];

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

    const magCount = keys[0];

    const bottleCount = `${Number(magCount) * 2}`; // convert mag to bottle for rate lookup

    const newBox = {
      [magCount]: {
        quantity: box[magCount].quantity,
        materialName: materialRatesByMagCount[magCount].package,
        materialCost: materialRatesByMagCount[magCount].cost,
        shippingRate: standardRatesByZone[zone][bottleCount],
      },
    };

    return newBox;
  });
};

// mags
export const calculateShippingRateMags = (
  magCount: number,
  zone: string
  //   serviceLevel: string
) => {
  const breakdown = determineBreakdown(magCount);

  const breakdownWithCosts = addCostsToBreakdown(breakdown, zone);

  const total = sumUpCosts(breakdownWithCosts);

  return total;
};

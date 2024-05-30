import currency from "currency.js";
import { materialRatesByBottleCount } from "../data/materialRates";
import { standardRatesByZone } from "../data/shippingRates/standardShippingRates";

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

    const newBox = {
      [bottleCount]: {
        quantity: box[bottleCount].quantity,
        materialName: materialRatesByBottleCount[bottleCount].package,
        materialCost: materialRatesByBottleCount[bottleCount].cost,
        shippingRate: standardRatesByZone[zone][bottleCount],
      },
    };

    return newBox;
  });
};

export const sumUpCosts = (breakdown: Array<BreakdownObject>) => {
  let total = currency("");

  breakdown.forEach((breakdown: BreakdownObject) => {
    const packageCategory: any = Object.values(breakdown)[0];

    const { quantity, materialCost, shippingRate } = packageCategory;

    const boxTotal = currency(materialCost).add(shippingRate);

    const allBoxes = boxTotal.multiply(quantity);

    total = total.add(allBoxes);
  });

  return total;
};

// 750s
export const calculateShippingRateBottles = (
  bottleCount: number,
  zone: string
  // serviceLevel: string
) => {
  const breakdown = determineBreakdown(bottleCount);

  const breakdownWithCosts = addCostsToBreakdown(breakdown, zone);

  const total = sumUpCosts(breakdownWithCosts);

  // also add support for expedited shipping

  return total;
};

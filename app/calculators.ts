import { materialRatesByBottleCount } from "./data/materialRates";
import { standardRatesByZone } from "./data/shippingRates/standardShippingRates";

type GroupQty = {
  quantity: number;
};

type Breakdown = Array<Record<string, GroupQty>>;

//23

const determineBreakdown = (bottleCount: number) => {
  let count = bottleCount;
  const groups = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  const breakdown: Breakdown = [];

  for (let i = 0; i < groups.length; i++) {
    const currentGroup = groups[i]; // 12

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

    console.log({ zone, standardRatesByZone });

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

const sumUpCosts = (breakdown: any) => {
  let total = "";

  breakdown.forEach((breakdown: any) => {
    const packageCategory: any = Object.values(breakdown)[0];

    const { quantity, materialCost, shippingRate } = packageCategory;
    const boxTotal = materialCost + shippingRate; // need to just curreny.js and also multipl by quantity but just testing something here

    console.log({ boxTotal, materialCost, shippingRate, packageCategory });

    total = total + boxTotal;
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

  const totalCost = sumUpCosts(breakdownWithCosts);

  const totalCostWithTax = sumUpCosts(breakdownWithCosts);
  // do a thing that adds tax

  // also add support for expedited shipping

  console.log({ totalCost });

  return { totalCost: "$100", totalCostWithTax: "$105" };
};

// mags
const calculateShippingRateMags = (
  bottleCount: number,
  zone: string,
  serviceLevel: string
): string => {
  // take number

  return "";
};

type MaterialInfo = {
  code: string;
  package: string;
  name: string;
  cost: string;
};

export const materialRatesByBottleCount: Record<string, MaterialInfo> = {
  "1": {
    code: "SHIP1",
    package: "single",
    name: "Shipper-Single",
    cost: "$3.50",
  },
  "2": {
    code: "SHIP3",
    package: "3pack",
    name: "Shipper-3 bottles",
    cost: "$5.00",
  },
  "3": {
    code: "SHIP3",
    package: "3pack",
    name: "Shipper-3 bottles",
    cost: "$5.00",
  },
  "4": {
    code: "SHIP6",
    package: "6pack",
    name: "Shipper-3-6 Bottles",
    cost: "$7.50",
  },
  "5": {
    code: "SHIP6",
    package: "6pack",
    name: "Shipper-3-6 Bottles",
    cost: "$7.50",
  },
  "6": {
    code: "SHIP6",
    package: "6pack",
    name: "Shipper-3-6 Bottles",
    cost: "$7.50",
  },
  "7": {
    code: "SHIP12",
    package: "12er",
    name: "Shipper-7-12 Bottles",
    cost: "$10.00",
  },
  "8": {
    code: "SHIP12",
    package: "12er",
    name: "Shipper-7-12 Bottles",
    cost: "$10.00",
  },
  "9": {
    code: "SHIP12",
    package: "12er",
    name: "Shipper-7-12 Bottles",
    cost: "$10.00",
  },
  "10": {
    code: "SHIP12",
    package: "12er",
    name: "Shipper-7-12 Bottles",
    cost: "$10.00",
  },
  "11": {
    code: "SHIP12",
    package: "12er",
    name: "Shipper-7-12 Bottles",
    cost: "$10.00",
  },
  "12": {
    code: "SHIP12",
    package: "12er",
    name: "Shipper-7-12 Bottles",
    cost: "$10.00",
  },
};

export const materialRatesByMagCount: Record<string, MaterialInfo> = {
  "1": {
    code: "SHIPMAG1",
    package: "mag1",
    name: "Shipper-Single Magnum",
    cost: "$6.50",
  },
  "2": {
    code: "SHIPMAG2",
    package: "mag3",
    name: "Shipper-2-3 Magnum",
    cost: "$11.50",
  },
  "3": {
    code: "SHIPMAG2",
    package: "mag3",
    name: "Shipper-2-3 Magnum",
    cost: "$11.50",
  },
  "4": {
    code: "SHIPMAG3-6",
    package: "mag6",
    name: "Shipper-4-6 Magnum",
    cost: "$19.50",
  },
  "5": {
    code: "SHIPMAG3-6",
    package: "mag6",
    name: "Shipper-4-6 Magnum",
    cost: "$19.50",
  },
  "6": {
    code: "SHIPMAG3-6",
    package: "mag6",
    name: "Shipper-4-6 Magnum",
    cost: "$19.50",
  },
};

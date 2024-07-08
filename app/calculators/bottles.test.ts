import { determineBreakdown } from "./bottles";

describe("determineBreakdown", () => {
  describe("WHEN given more than 12 bottles", () => {
    describe("WHEN given 13 bottles", () => {
      it("returns a breakdown of 1 12er & 1 single", () => {
        const actual = determineBreakdown(13);

        const expected = [{ "12": { quantity: 1 } }, { "1": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
  });

  describe("WHEN given 12 bottles", () => {
    it("returns a breakdown of 1 12er", () => {
      const actual = determineBreakdown(12);

      const expected = [{ "12": { quantity: 1 } }];

      expect(actual).toEqual(expected);
    });
  });
  describe("WHEN given less than 12 bottles", () => {
    describe("WHEN given 11 bottles", () => {
      it("returns a breakdown of 1 11er", () => {
        const actual = determineBreakdown(11);

        const expected = [{ "11": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 10 bottles", () => {
      it("returns a breakdown of 1 10er", () => {
        const actual = determineBreakdown(10);

        const expected = [{ "10": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 9 bottles", () => {
      it("returns a breakdown of 1 9er", () => {
        const actual = determineBreakdown(9);

        const expected = [{ "9": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 8 bottles", () => {
      it("returns a breakdown of 1 8er", () => {
        const actual = determineBreakdown(8);

        const expected = [{ "8": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 7 bottles", () => {
      it("returns a breakdown of 1 7er", () => {
        const actual = determineBreakdown(7);

        const expected = [{ "7": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 6 bottles", () => {
      it("returns a breakdown of 1 6er", () => {
        const actual = determineBreakdown(6);

        const expected = [{ "6": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 5 bottles", () => {
      it("returns a breakdown of 1 5er", () => {
        const actual = determineBreakdown(5);

        const expected = [{ "5": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 4 bottles", () => {
      it("returns a breakdown of 1 4er", () => {
        const actual = determineBreakdown(4);

        const expected = [{ "4": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 3 bottles", () => {
      it("returns a breakdown of 1 3er", () => {
        const actual = determineBreakdown(3);

        const expected = [{ "3": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 2 bottles", () => {
      it("returns a breakdown of 1 2er", () => {
        const actual = determineBreakdown(2);

        const expected = [{ "2": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
    describe("WHEN given 1 bottles", () => {
      it("returns a breakdown of 1 single", () => {
        const actual = determineBreakdown(1);

        const expected = [{ "1": { quantity: 1 } }];

        expect(actual).toEqual(expected);
      });
    });
  });
});

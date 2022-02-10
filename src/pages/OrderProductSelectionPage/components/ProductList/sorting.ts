import { extractNumbersAndTimeUnit } from "../../../../utils/parsers";
import { PriceConfig } from "@welldigital/ui-common/Components/PSProductDetail/types";

export const SortAllowance = {
  BestValue: "BestValue",
  FastestActing: "FastestActing",
  LongestLasting: "LongestLasting",
};

export const sortOptions = [
  { value: SortAllowance.BestValue, label: "Best value" },
  { value: SortAllowance.FastestActing, label: "Fastest acting" },
  { value: SortAllowance.LongestLasting, label: "Longest lasting" },
];

export const sortProducts =
  (sortBy: string) => (a: PriceConfig, b: PriceConfig) => {
    const {
      isBestValue: isBestValueA,
      worksIn: worksInA,
      duration: activeForA,
    } = a.__meta__;
    const {
      isBestValue: isBestValueB,
      worksIn: worksInB,
      duration: activeForB,
    } = b.__meta__;

    switch (sortBy) {
      case SortAllowance.BestValue: {
        // desc
        return +isBestValueB - +isBestValueA;
      }
      case SortAllowance.FastestActing: {
        // asc
        const { min: minA } = extractNumbersAndTimeUnit(worksInA);
        const { min: minB } = extractNumbersAndTimeUnit(worksInB);
        return (minA ?? Infinity) - (minB ?? Infinity);
      }
      case SortAllowance.LongestLasting: {
        // desc
        const { max: maxA } = extractNumbersAndTimeUnit(activeForA);
        const { max: maxB } = extractNumbersAndTimeUnit(activeForB);
        return (maxB ?? -Infinity) - (maxA ?? -Infinity);
      }
      default:
        return 1;
    }
  };

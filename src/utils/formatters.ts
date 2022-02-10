import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export const formatPrice = (price: number) => {
  return `£${price.toFixed(2)}`;
};

export const formatStrength = (strength: string, type: string = "mg") => {
  return `${strength}${type}`;
};

export const formatDateFromIso = (iso: string, formatString: string) => {
  return format(parseISO(iso), formatString);
};

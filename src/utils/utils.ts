import { useLocation } from "react-router-dom";
import queryString from "query-string";

export const getCostStr = (cost: number): string => {
  return cost.toFixed(2);
};

/**
 * Formats markdown as expected by ReactMarkdown.
 * We noticed issues with new lines: https://github.com/rexxars/react-markdown/issues/273#issuecomment-495701177.
 * @param text input markdown
 */
export function formatMarkdown(text?: string | null): string | undefined {
  return text?.replace(/\r\n/gi, "  \n");
}

export function useLocationQuery<T>() {
  const { search } = useLocation();
  return queryString.parse(search) as unknown as T;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getNow() {
  return new Date();
}

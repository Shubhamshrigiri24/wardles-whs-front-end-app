const secondsToSeconds = (seconds: number) => seconds;
const minutesToSeconds = (minutes: number) => secondsToSeconds(minutes * 60);
const hoursToSeconds = (hours: number) => minutesToSeconds(hours * 60);
const daysToSeconds = (days: number) => hoursToSeconds(days * 24);
const monthsToSeconds = (months: number) => daysToSeconds(months * 30);

export const TimeUnit = {
  second: "second",
  minute: "minute",
  hour: "hour",
  day: "day",
  month: "month",
  none: "none",
};

// keys are accepted/known units that can be inserted into text line
const timeUnitsMap = {
  sec: TimeUnit.second,
  secs: TimeUnit.second,
  min: TimeUnit.minute,
  mins: TimeUnit.minute,
  hr: TimeUnit.hour,
  hrs: TimeUnit.hour,
  day: TimeUnit.day,
  days: TimeUnit.day,
  month: TimeUnit.month,
  months: TimeUnit.month,
};

const convertersMap = {
  [TimeUnit.none]: secondsToSeconds,
  [TimeUnit.second]: secondsToSeconds,
  [TimeUnit.minute]: minutesToSeconds,
  [TimeUnit.hour]: hoursToSeconds,
  [TimeUnit.day]: daysToSeconds,
  [TimeUnit.month]: monthsToSeconds,
};

const regexTimeUnits = Object.keys(timeUnitsMap)
  .map((entry) => `\\b${entry}\\b`)
  .join("|");

const regex = new RegExp("(\\d*\\.?\\d+)|" + regexTimeUnits, "g");

export const extractNumbersAndTimeUnit = (str: string) => {
  const extracts = (str.match(regex) || []) as string[];
  const foundUnit = extracts.find((entry: string) =>
    Number.isNaN(+entry)
  ) as keyof typeof timeUnitsMap;
  const normalisedUnit = timeUnitsMap[foundUnit] ?? TimeUnit.none;
  const converter = convertersMap[normalisedUnit];
  const numbers = extracts
    .map((entry) => converter(+entry))
    .filter((entry) => !Number.isNaN(entry))
    .sort((a, b) => a - b);

  const result = {
    numbers,
    foundUnit,
    normalisedUnit,
    min: numbers.length ? numbers[0] : null,
    max: numbers.length ? numbers[numbers.length - 1] : null,
  };
  return result;
};

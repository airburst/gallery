import { type CSSProperties } from "react";

type ProgressProps = {
  value: number;
  max: number;
};

const calcVal = (min: number, max: number, value: number) => {
  if (value < min) return min;
  if (value > max) return max;

  return value;
};

export const Progress = ({ value, max }: ProgressProps) => {
  const min = 1;
  const total = 100;
  const actual = calcVal(min, max, value);
  const val = Math.floor((total / max) * actual);

  return (
    <header className="progress__container">
      <label htmlFor="progress">
        {actual} of {max}
      </label>
      <progress
        id="progress"
        className="progress__bar"
        max={total}
        value={val}
        style={{ "--progress-value": `${val}%` } as CSSProperties}
      />
    </header>
  );
};

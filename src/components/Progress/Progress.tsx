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
    <progress
      className="progress progress-secondary w-full"
      value={val}
      max={total}
    ></progress>
  );
};

import TaskQueue from "./TaskQueue";

const MAX_BATCH_CONCURRENCY = 3;

const limitConcurrency = (concurrency: number) => {
  if (!concurrency || typeof concurrency !== "number" || concurrency < 1) {
    return MAX_BATCH_CONCURRENCY;
  }
  if (concurrency > MAX_BATCH_CONCURRENCY) {
    return MAX_BATCH_CONCURRENCY;
  }
  return concurrency;
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

type Params = Record<string, unknown>;
export type ActionParams = {
  record: unknown;
  params?: Params;
};
export type BatchParams = {
  records: unknown[];
  action: (args: ActionParams) => Promise<void>;
  params?: Params;
};

// Send batch of requests in limited parallel sequence
const batch =
  (concurrency: number) =>
  async ({ records, action, params }: BatchParams) => {
    const queue = new TaskQueue(limitConcurrency(concurrency));

    await new Promise((resolve, reject) => {
      if (!records || records.length === 0) {
        resolve(null);
      }

      let completed = 0;
      const increment = () => {
        completed += 1;
        if (completed === records.length) {
          resolve(null);
        }
      };

      records.map((record) => {
        const task = () => {
          return action({ record, params })
            .then(() => increment())
            .catch((err) => {
              console.error("Upload Error", err);
              increment();
              reject(err);
            });
        };
        queue.pushTask(task);
      });
    });
  };

export default batch;

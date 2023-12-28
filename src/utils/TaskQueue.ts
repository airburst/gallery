export type Task = () => Promise<void>;

class TaskQueue {
  private concurrency: number; // Max number of concurrent tasks
  private running: number; // Number of running tasks
  public queue: Task[];

  constructor(concurrency = 1) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  pushTask(task: Task) {
    this.queue.push(task);
    this.next();
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const task = this.queue.shift();

      if (task) {
        task()
          .then(() => {
            this.running -= 1;
            this.next();
          })
          .catch(console.error);
        this.running += 1;
      }
    }
  }

  empty() {
    this.queue = [];
  }
}

export default TaskQueue;

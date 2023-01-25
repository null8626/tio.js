import type { Option } from './typings'

export default class Timeout {
  private t: Option<NodeJS.Timeout> = null;
  public readonly promise: Promise<null>;

  public constructor(tm: number) {
    this.promise = new Promise(resolve => {
      this.t = setTimeout(() => resolve(null), tm);
    });
  }

  public cancel(): void {
    clearTimeout(this.t!);
  }
}
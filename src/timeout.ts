// rust <3
type Option<T> = T | undefined | null;

export default class Timeout {
  private t: Option<NodeJS.Timeout> = null;
  public readonly promise: Promise<void>;

  public constructor(tm: number) {
    this.promise = new Promise(resolve => {
      this.t = setTimeout(resolve, tm);
    });
  }

  public cancel(): void {
    clearTimeout(this.t!);
  }
}

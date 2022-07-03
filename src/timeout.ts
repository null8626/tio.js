// rust <3
type Option<T> = T | undefined | null

export default class Timeout {
  private t: Option<any> = null
  public readonly promise: Promise<null>

  public constructor(tm: number) {
    this.promise = new Promise(resolve => {
      this.t = setTimeout(() => resolve(null), tm)
    })
  }

  public cancel(): void {
    clearTimeout(this.t)
  }
}

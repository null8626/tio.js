export default class Timeout {
  #t: NodeJS.Timeout | null = null
  readonly promise: Promise<null>

  constructor(tm: number) {
    this.promise = new Promise(resolve => {
      this.#t = setTimeout(() => resolve(null), tm)
    })
  }

  cancel(): void {
    clearTimeout(this.#t!)
  }
}

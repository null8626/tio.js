// rust <3
type Option<T> = T | undefined | null;

export interface TioTimeout {
  cancel: () => void;
  promise: Promise<null>;
}

export default function createTimeout(tm: number): TioTimeout {
  let t: Option<NodeJS.Timeout> = null;

  return {
    cancel(): void {
      clearTimeout(t!);
    },

    promise: new Promise(resolve => {
      t = setTimeout(() => resolve(null), tm);
    })
  };
}

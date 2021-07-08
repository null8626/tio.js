declare module 'tio.js' {
  interface TioResponse {
    output: string;
    language: string;
    timedOut: boolean;
    realTime: number;
    userTime: number;
    sysTime: number;
    CPUshare: number;
    exitCode: number;
  }

  type TioFunction = (code: string, language?: string, timeout?: number) => Promise<TioResponse>;

  interface Tio extends TioFunction {
    setDefaultLanguage: (language: string) => Promise<undefined>;
    getDefaultLanguage: () => string;
    setDefaultTimeout: (timeout: number | null) => undefined;
    getDefaultTimeout: () => number | null;
    languages: () => Promise<string[]>;
    version: string;
  }
  
  export = Tio;
}
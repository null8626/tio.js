declare module 'tio.js' {
  namespace tio {
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
    
    function setDefaultLanguage(language: string): Promise<void>;
    function getDefaultLanguage(): string;
    function setDefaultTimeout(timeout: number | null): void;
    function getDefaultTimeout(): number | null;
    function languages(): Promise<string[]>;
    const version: string;
  }
  
  function tio(code: string, language?: string, timeout?: number): Promise<tio.TioResponse>;
  
  export = tio;
}

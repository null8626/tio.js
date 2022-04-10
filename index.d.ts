export interface TioResponse {
    readonly output: string;
    readonly language: string;
    readonly timedOut: boolean;
    readonly realTime: number;
    readonly userTime: number;
    readonly sysTime: number;
    readonly CPUshare: number;
    readonly exitCode: number;
}
export declare type Option<T> = T | undefined | null;
declare function fetchLanguages(): Promise<string[]>;
declare function setDefaultLanguage(language: string): Promise<void>;
declare function getDefaultLanguage(): string;
declare function setDefaultTimeout(timeout: Option<number>): void;
declare function getDefaultTimeout(): Option<number>;
declare const version: string;
export { fetchLanguages as languages, setDefaultLanguage, getDefaultLanguage, setDefaultTimeout, getDefaultTimeout, version };
export default function tioRun(code: string, language: Option<string>, timeout: Option<number>): Promise<TioResponse>;

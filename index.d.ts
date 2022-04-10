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
declare function tioRun(code: string, language: Option<string>, timeout: Option<number>): Promise<TioResponse>;
export default tioRun;

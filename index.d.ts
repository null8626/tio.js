declare function tio(code: string, language?: string, timeout?: number): Promise<tio.TioResponse>;

declare module tio {
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
    
    export function setDefaultLanguage(language: string): Promise<void>;
    export function getDefaultLanguage(): string;
    export function setDefaultTimeout(timeout: number | null): void;
    export function getDefaultTimeout(): number | null;
    export function languages(): Promise<string[]>;
    export const version: string;
}

export = tio;
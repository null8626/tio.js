declare function tio(code: string, language?: string): Promise<tio.TioResponse>;

declare module tio {
    interface TioResponse {
        output: string;
        language: string;
        realTime: number;
        userTime: number;
        sysTime: number;
        CPUshare: number;
        exitCode: number;
    }
    
    export function setDefaultLanguage(language: string): Promise<void>;
    export function getDefaultLanguage(): string;
    export function languages(): Promise<string[]>;
    export const version: string;
}

export = tio;
declare module 'tio.js' {
    interface TioResponse {
        output: string;
        language: string;
        realTime: number;
        userTime: number;
        sysTime: number;
        CPUshare: number;
        exitCode: number;
    }
    
    function main(name: string, language?: string): Promise<TioResponse>;
    
    export = main;
    export function setDefaultLanguage(language: string): Promise<void>;
    export function getDefaultLanguage(): string;
    export function languages(): Promise<string[]>;
    export const version: string;
}
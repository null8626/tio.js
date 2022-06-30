import type { TioLanguage } from './languages';

export interface TioResponse {
  readonly output: string;
  readonly language: TioLanguage;
  readonly timedOut: boolean;
  readonly realTime: number;
  readonly userTime: number;
  readonly sysTime: number;
  readonly CPUshare: number;
  readonly exitCode: number;
}

// embrace rust <3
export type Option<T> = T | undefined | null;

export class TioError extends Error {
  public constructor(message: string) {
    super(message);

    this.name = `TioError: ${message}`;
  }
}

export class TioHttpError extends TioError {
  public status: number;
  public statusText: string;

  public constructor(response: Response) {
    super(`[HTTP ${response.status}: ${response.statusText}]`);

    this.status = response.status;
    this.statusText = response.statusText;
  }
}

export async function requestText(path: string): Promise<string> {
  const response: Response = await fetch(`https://tio.run${path}`);

  if (response.status >= 400) {
    throw new TioHttpError(response);
  }

  return await response.text();
}

export async function randomHex(size: number): Promise<string> {
  const arr: Uint8Array = new Uint8Array(size);

  // @ts-ignore
  const crypto: any = globalThis.Deno ? globalThis.crypto : await import('node:crypto');
  return [...crypto.getRandomValues(arr)].map(x => x.toString(16).padStart(2, '0')).join('');
}

// constants
const SCRIPT_REGEX: RegExp = /<script src="(\/static\/[0-9a-f]+-frontend\.js)" defer><\/script>/;
const RUNURL_REGEX: RegExp = /^var runURL = "\/cgi-bin\/static\/([^"]+)";$/m;
const DEFAULT_LANGUAGE: 'javascript-node' = 'javascript-node';
const DEFAULT_REFRESH_TIMEOUT: number = 850000;
const version: '3.0.2' = '3.0.2';

export { SCRIPT_REGEX, RUNURL_REGEX, DEFAULT_LANGUAGE, DEFAULT_REFRESH_TIMEOUT, version };

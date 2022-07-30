import type { TioLanguage } from './languages'

export type Option<T> = T | undefined | null

export interface TioResponse {
  readonly output: string
  readonly language: TioLanguage
  readonly timedOut: boolean
  readonly realTime: number
  readonly userTime: number
  readonly sysTime: number
  readonly CPUshare: number
  readonly exitCode: number
}

export type TioFunction = (
  code: string,
  language?: Option<TioLanguage>,
  timeout?: Option<number>
) => Promise<TioResponse>

export interface Tio extends TioFunction {
  version: string
  defaultLanguage: TioLanguage
  defaultTimeout: Option<number>
  refreshTimeout: number
}

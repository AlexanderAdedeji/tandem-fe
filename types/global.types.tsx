export interface IPageWithChildren {
  children: React.ReactNode
}

export interface ISelectData<TLabel = string, TValue = string> {
  label: TLabel;
  value: TValue;
}

export interface ApiInterface<T, M = Record<string, any>> {
  data?: T;
  error?: string;
  message?: string;
  metadata?: M;
}


export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Dictionary<T = unknown> = { [key: string]: T };
export interface Rate {
  currency: string;
  code: string;
  mid: number;
}

export interface ExchangeRates {
  effectiveDate: string;
  rates: Rate[];
}

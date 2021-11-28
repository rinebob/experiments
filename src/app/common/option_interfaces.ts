
// From Visvol interfaces.  Must keep in sync




// ex: LongOneAtmCall, ShortTwoOtm2Put
export interface OptionLegBase {
  name: string;
  type: OptionType;
  moneyness: MoneynessUnit;
  direction: Direction;
  ratio: number;
  // symbol?: OptionSymbolMetadata;
}

export interface OptionLegAsTraded {
  leg: OptionLegBase;
  symbol?: OptionSymbolMetadata;
}
  
  // ex: 20 Delta Short Strangle
  // [ShortOneOtm3Call, ShortOneOtmPut]
export interface OptionSpreadConfigBase {
  name: string;
  legs: OptionLegBase[];
  moneyness?: MoneynessUnit;
  strategyName?: string;
  direction?: Direction;
  putCall?: OptionType;
}

export interface OptionSpreadConfigAsTraded {
  config: OptionSpreadConfigBase;
  legs: OptionLegAsTraded;
}

export interface OptionPosition {
  title: string;
  underlying: string;   // todo - put underlying data in an object
  underlyingPrice: number;
  underlyingIv?: number;
  dateOpened?: Date;
  dateOpenedText?: string;
  openPrice?: number;
  expDate?: Date;
  expDateText?: string;
  config?: OptionSpreadConfigBase;
  symbols?: OptionSymbolMetadata[];
  data?: PositionPricePoint[];    // TODO - normalize to separate table

}

export interface OptionQuote {
  open: number | string;
  high: number | string;
  low: number | string;
  close: number | string;
  volume: number | string;
  date: Date;
}

export interface Option {
  symbol: string;
  type?: OptionType;
  underlying?: string;
  strike?: number;
  expiration?: Date;
  exchange?: Exchange;
}

export interface OptionSymbolMetadata {
  symbol: string;
  label: string;
}

export interface OptionSymbolData {
  symbol: string;
  data: OptionQuote[];
}

export interface PositionPricePoint {
  date: Date;
  price: number;
}

export type Direction = 'LONG' | 'SHORT';
export type OptionType = 'CALL' | 'PUT';
export type CreditDebit = 'CREDIT' | 'DEBIT';
  
export enum Exchange {
  CHICAGO_BOARD_OPTIONS_EXCHANGE = 'CBOE',
}

export enum MoneynessUnit {
  AT_THE_MONEY = 'ATM',
  OUT_OF_THE_MONEY_ONE = 'OTM-1',
  OUT_OF_THE_MONEY_TWO = 'OTM-2',
  OUT_OF_THE_MONEY_THREE = 'OTM-3',
}

const moneynessFactors:[string,number][] = [
  [MoneynessUnit.AT_THE_MONEY, 0],
  [MoneynessUnit.OUT_OF_THE_MONEY_ONE, 0.05],
  [MoneynessUnit.OUT_OF_THE_MONEY_TWO, 0.10],
  [MoneynessUnit.OUT_OF_THE_MONEY_THREE, 0.20],
];

export const moneynessMap = new Map(moneynessFactors);

export interface ExpirationTimeDistance {
  expLabel: ExpriationTimeDistanceLabel;
  expName: ExpriationTimeDistanceName;
  expSeries: ExpirationSeries;
  expDist: number;        // time units (wk, mo, qtr) to expriation
  expDay: number;         // day of week 0(sun) to 6(sat)
}

export interface ExpirationDate {
  expSeries: ExpirationSeries;
  expName: ExpriationTimeDistanceName;
  expLabel: ExpriationTimeDistanceLabel;
  expDate: Date;        // actual expriation date
  expDay: number;         // day of week 0(sun) to 6(sat)
  checkboxLabel: string;
}

export enum ExpriationTimeDistanceName {
  ONE_WEEK = 'One week',
  TWO_WEEK = 'Two week',
  ONE_MONTH = 'One month',
  TWO_MONTH = 'Two month',
  THREE_MONTH = 'Three month',
  SIX_MONTH = 'Six month',
  NINE_MONTH = 'Nine month',
  TWELVE_MONTH = 'Twelve month',
  FIFTEEN_MONTH = 'Fifteen month',
  EIGHTEEN_MONTH = 'Eighteen month',
  TWENTY_FOUR_MONTH = 'Twenty-four month',
}

export enum ExpriationTimeDistanceLabel {
  ONE_WEEK = '1 wk',
  TWO_WEEK = '2 wk',
  ONE_MONTH = '1 mo',
  TWO_MONTH = '2 mo',
  THREE_MONTH = '3 mo',
  SIX_MONTH = '6 mo',
  NINE_MONTH = '9 mo',
  TWELVE_MONTH = '12 mo',
  FIFTEEN_MONTH = '15 mo',
  EIGHTEEN_MONTH = '18 mo',
  TWENTY_FOUR_MONTH = '24 mo',
}

export enum ExpirationSeries {
  WEEKLY = 'Weekly',
  MONTHLY = 'Monthly',
  QUARTERLY = 'Quarterly',
}






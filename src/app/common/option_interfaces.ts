
// From Visvol interfaces.  Must keep in sync

import { OHLCData } from "./interfaces";

export enum OptionStrategyName {
  VERTICAL_CALL_DEBIT_SPREAD = 'Vertical call debit spread',
  VERTICAL_CALL_CREDIT_SPREAD = 'Vertical call credit spread',
  VERTICAL_PUT_DEBIT_SPREAD = 'Vertical put debit spread',
  VERTICAL_PUT_CREDIT_SPREAD = 'Vertical put credit spread',
  ATM_LONG_STRADDLE = 'ATM long straddle',
  TWENTY_DELTA_SHORT_STRANGLE = 'Twenty delta short strangle',
  IRON_CONDOR = 'Iron condor',
  ATM_CALL_CALENDAR_SPREAD = 'ATM call calendar spread',
  ATM_PUT_CALENDAR_SPREAD = 'ATM put calendar spread',
}

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
  name: OptionStrategyName;
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
  status?: OpenClosedStatus;
  openPriceEventData?: OptionPositionPriceEventData;
  lastPriceEventData?: OptionPositionPriceEventData;
  closePriceEventData?: OptionPositionPriceEventData;
  config?: OptionSpreadConfigBase;
  symbols?: OptionSymbolMetadata[];
  data?: PositionPricePoint[];    // TODO - normalize to separate table

}

export interface OptionPositionPriceEventData {
  date: Date;
  dateString: string;
  price: number;
  pricePctChgDay?: number;
  pricePctChgLife?: number;
  underlyingPrice: number;
  undPctChgDay?: number;
  undPctChgLife?: number;
  implVolty: number;
  ivPctChgDay?: number;
  ivPctChgLife?: number;

}


export interface PositionOutcome {
  closeDate: Date;
  closePrice: number;
  
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

export interface BlackScholesInputs {
  S0: number;   // S0 - price of underlying security ($)
  X: number;    // X - option strike price ($)
  s: number;    // s - implied volatility (% / yr as decimal) (s = sigma)
  t: number;    // t - time to expiration (percent of the year as decimal (i.e. 3 mo = .25 year))
  r: number;    // r - risk free interest rate (% / yr as decimal)
  q: number;    // q - dividend yield (% / yr as decimal).  If stock pays no dividend enter zero
}

export interface BlackScholesOutput {
  callPrice: number;
  callDelta: number;
  callTheta: number;
  putPrice: number;
  putDelta: number;
  putTheta: number;
  gamma: number;
  vega: number;
  rho: number;
}

// key is the strike price for the series
export interface BlackScholesOutputSeries {
  strike: number;
  // series: BlackScholesOutput[];
  series: OHLCData[];
}

export type OptionProjectionDataSet = BlackScholesOutputSeries[];

// export interface OptionProjectionDataSet {
//   dataSet: BlackScholesOutputSeries[];
// }

export interface BlackScholesCalculatorConfig {
  undPriceMin: number;
  undPriceMax: number;
  strikeMin: number;
  strikeMax: number;
  strikeIncrement: number;
  timeMin: number;
  timeMax: number;
  volMin: number;
  volMax: number;
  numDataPoints: number;
}

export type Direction = 'LONG' | 'SHORT';
export type OptionType = 'CALL' | 'PUT';
export type CreditDebit = 'CREDIT' | 'DEBIT';
export type OpenClosedStatus = 'OPEN' | 'CLOSED';
  
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






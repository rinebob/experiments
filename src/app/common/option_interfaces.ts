
// From Visvol interfaces.  Must keep in sync




// ex: LongOneAtmCall, ShortTwoOtm2Put
export interface OptionLeg {
    type: OptionType;
    moneyness: MoneynessUnit;
    direction: Direction;
    ratio: number;
    symbol?: OptionSymbolMetadata;
  }
  
  // ex: 20 Delta Short Strangle
  // [ShortOneOtm3Call, ShortOneOtmPut]
  export interface OptionSpreadConfig {
    name: string;
    legs: OptionLeg[];
  }
  
  export interface OptionPosition {
    title: string;
    underlying: string;   // todo - put underlying data in an object
    underlyingPrice: number,
    underlyingIv?: number,
    dateOpened?: Date;
    expiration?: Date;
    config?: OptionSpreadConfig;
    symbols?: OptionSymbolMetadata[];
    data?: PositionPricePoint[];
  
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
    type: OptionType;
    underlying: string;
    strike: number;
    expiration: Date;
    exchange: Exchange;
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
  
  
  
  
  
  
  
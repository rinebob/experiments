import { OptionType } from "./option_interfaces";




export interface OratsFileFormat {
    symbol?: string;
    ctxSymbol? : string;
    ctxSymbolHash?: string;
    stkPx?:  string;
    expirDate?: string;
    yte?:  string;
    strike?:  string;
    cVolu?:  string;
    cOi?:  string;
    pVolu?:  string;
    pOi?:  string;
    cBidPx?:  string;
    cValue?:  string;
    cAskPx?:  string;
    pBidPx?:  string;
    pValue?:  string;
    pAskPx?:  string;
    cBidIv?:  string;
    cMidIv?:  string;
    cAskIv?:  string;
    smoothSmvVol?: string ;
    pBidIv?:  string;
    pMidIv?:  string;
    pAskIv?:  string;
    iRate?:  string;
    divRate?:  string;
    residualRateData?:  string;
    delta?:  string;
    gamma?:  string;
    theta?:  string;
    vega?:  string;
    rho?:  string;
    phi?:  string;
    driftlessTheta?:  string;
    extVol?:  string;
    extCTheo?:  string;
    extPTheo?:  string;
    spot_px?:  string;
    trade_date?: string;
    callSymbol?: string;
    putSymbol?: string;
}

export interface OratsUiDatum {
    symbol?: string;
    ctxSymbol? : string;
    callSymbol?: string;
    putSymbol?: string;
    trade_date?: string;
    stkPx?:  string;
    expirDate?: string;
    yte?:  string;
    strike?:  string;
    cValue?:  string;
    pValue?:  string;
    delta?:  string;
    cMidIv?:  string;
    pMidIv?:  string;
    
    // ctxSymbolHash?: string;
    // cVolu?:  string;
    // cOi?:  string;
    // pVolu?:  string;
    // pOi?:  string;
    // cBidPx?:  string;
    // cAskPx?:  string;
    // pBidPx?:  string;
    // pAskPx?:  string;
    // cBidIv?:  string;
    // cAskIv?:  string;
    // smoothSmvVol?: string ;
    // pBidIv?:  string;
    // pAskIv?:  string;
    // iRate?:  string;
    // divRate?:  string;
    // residualRateData?:  string;
    // gamma?:  string;
    // theta?:  string;
    // vega?:  string;
    // rho?:  string;
    // phi?:  string;
    // driftlessTheta?:  string;
    // extVol?:  string;
    // extCTheo?:  string;
    // extPTheo?:  string;
    // spot_px?:  string;
    
    
}

export interface StrikeMetadata {
    underlyingSymbol: string;
    strikeSymbol: string;
    contractSymbol: string;
    expirationDate: string;
    strike: string;
    type: OptionType;
}

export interface OratsDatum {
    date: string;
    oratsDataPoint: OratsFileFormat;
}

export interface OratsStrikeData {
    metadata: StrikeMetadata;
    dataSeries?: OratsDatum[];
}

export interface StrikesByExpiration {
    yte: string;
    date: string;
    strikes: string[];
}

export interface StrikesWithExpirations {
    strike: string;
    expirations: string[];
}

// key = strike value = array of expriation data strings for that strike
export interface ExpirationsByStrike {
    [key: number]: string[];
}

export interface DeltaStrikesGridData {
    // key as expiration date and value as array of records for each target delta
    [key: string]: OratsUiDatum[];
}

export interface ContractLookupObject {
    // key is the call/put option contract symbol.  Value is the OratsUiDatum for that symbol
    [key: string]: OratsUiDatum;
}

// for generateAllContractsByStrikeAndExpiration (CsvService #5).  This is the interface for
// the value 
export interface DataByExpirationForStrike {
    // key is the expiration.  Value is the OratsUiDatum for that expiration
    [key: string]: OratsUiDatum;
}

// for generateAllContractsByStrikeAndExpiration (CsvService #5)
export interface AllContractsByStrikeAndExpiration {
    // key is the strike.  Value is an object with key = expiration and value = OratsUiDatum 
    // for that strike/exp
    [key: string]: DataByExpirationForStrike;
}

// object with property strike and key = expiration and value = OratsUiDatum for that 
// strike/expiration.  This is one object in the 
export interface AllContractsDataForStrike {
    strike: string;
    [key: string]: OratsUiDatum | string;
}

export interface TradedStrikesGridData {
    allExpirations: string[];
    tradedStrikesData: AllContractsDataForStrike[];
}

// Object with key = exiration and value = array of option contract symbols for that expiration.
export interface SymbolsForExpiration {
    [key: string]: string[];
}

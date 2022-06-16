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

export interface DeltaStrikesGridData {
    // key as expiration date and value as array of records for each target delta
    [key: string]: OratsUiDatum[]   
}
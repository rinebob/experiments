import { OptionType } from "./option_interfaces";




export interface OratsFileFormat {
    ticker?: string;
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
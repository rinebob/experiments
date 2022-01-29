import { ChartPanelConfig, PlotType, PaneType,  PlotName,  ScaleLocation, ScaleType, SeriesLabel, SeriesName, SeriesParam, Indicator, RsiConfig, PlotConfig, ReferenceLines, NewSeries, AxisConfig} from "./interfaces_chart";
import { PriceComponent } from './interfaces';
import {INDICATOR_LINES_MAP} from './constants';

// ========================================================================
// SERIES CONFIGS

// export interface NewSeries {
//     title: string;
//     idLabel: string;
//     seriesName: SeriesName;
//     seriesLabel: SeriesLabel;
//     seriesConfig?: IndicatorConfig;
//     xAxisConfig?: AxisConfig;
//     yAxisConfig?: AxisConfig;
//     referenceLines?: ReferenceLines;
// }


// moving avg
// export interface MovingAverageConfig {
//     source: string;
//     maType: MovingAverageType;
//     period: number;
//     maLine: PlotConfig;
// }

// // rsi
// export interface RsiConfig {
//     source: string;
//     period: number;
//     rsiLine: PlotConfig;
//     referenceLines: ReferenceLines;
// }

// // stochastic
// export interface StochasticConfig {
//     source: string;
//     k: number;
//     d: number;
//     fastLine: PlotConfig;
//     slowLine: PlotConfig;
//     smoothedLine: PlotConfig;
//     referenceLines: ReferenceLines;
// }


// export interface BollingerBandsConfig {
//     source: string;
//     period: number;
//     multiplier: number;
//     upperLine: PlotConfig;
//     lowerLine: PlotConfig;
//     centerLine: PlotConfig;
// }


// // macd
// export interface MacdConfig {
//     source: string;
//     fastPeriod: number;
//     slowPeriod: number;
//     signalPeriod: number;
//     macdLine: PlotConfig;
//     signalLine: PlotConfig;
//     divergenceLine: PlotConfig;
//     referenceLines: ReferenceLines;
// }

// export interface PlotConfig {
//     plotType: PlotType;
//     plotName: PlotName;
//     idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
//     param?: Param;
//     target: string; // column name created by data calculator. For single field series (line, point, area)
//     targets?: OHLCTargets;
//     color?: string;
//     upColor?: string;
//     downColor?: string;
//     style?: string;
//     thickness?: string;
//     minExtentsTarget?: string;
//     maxExtentsTarget?: string;
// }

// export interface ReferenceLines {
//     upperLineLevel?: number;
//     lowerLineLevel?: number;
//     upperRangeLimit?: number;
//     lowerRangeLimit?: number;
//     hasZeroLine?: boolean;
// }

// RSI 14 period
const rsi14Plot: PlotConfig = {
    plotType: PlotType.LINE,
    plotName: PlotName.RSI,
    idLabel: 'rsi-14',
    target: 'rsi-14',
    minExtentsTarget: 'low',
    maxExtentsTarget: 'high',
}

const rsi14ReferenceLines: ReferenceLines = {
    upperLineLevel: 80,
    lowerLineLevel: 20,
    upperRangeLimit: 100,
    lowerRangeLimit: 0,
    hasZeroLine: false,
}

export const rsi14Config: RsiConfig = {
    source: PriceComponent.CLOSE,
    period: 14,
    rsiLine: rsi14Plot,
    referenceLines: rsi14ReferenceLines,
}

// export interface NewSeries {
//     title: string;
//     idLabel: string;
//     seriesName: SeriesName;
//     seriesLabel: SeriesLabel;
//     seriesConfig?: IndicatorConfig;
//     xAxisConfig?: AxisConfig;
//     yAxisConfig?: AxisConfig;
//     referenceLines?: ReferenceLines;
// }

// export interface AxisConfig {
//     type?: ScaleType;
//     location?: ScaleLocation;
// }

const bottomXAxis: AxisConfig = {
    type: ScaleType.DATE,
    location: ScaleLocation.BOTTOM,
}

const topXAxis: AxisConfig = {
    type: ScaleType.DATE,
    location: ScaleLocation.TOP,
}

const leftLinearYAxis: AxisConfig = {
    type: ScaleType.LINEAR,
    location: ScaleLocation.LEFT,
}

const rightLinearYAxis: AxisConfig = {
    type: ScaleType.LINEAR,
    location: ScaleLocation.RIGHT,
}

const leftLogYAxis: AxisConfig = {
    type: ScaleType.LOG,
    location: ScaleLocation.LEFT,
}

const rightLogYAxis: AxisConfig = {
    type: ScaleType.LOG,
    location: ScaleLocation.RIGHT,
}


export const rsi14Series: NewSeries = {
    title: 'RSI 14',
    idLabel: 'rsi-14',
    seriesName: SeriesName.RSI,
    seriesLabel: SeriesLabel.RSI,
    seriesConfig: rsi14Config,
    xAxisConfig: bottomXAxis,
    yAxisConfig: rightLogYAxis,
    
}



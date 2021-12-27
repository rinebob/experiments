import * as av from '../services/av/av_interfaces';

// export enum TimeFrame {
//     ONE_MINUTE = '1min',
//     FIVE_MINUTE = '5min',
//     FIFTEEN_MINUTE = '15min',
//     THIRTY_MINUTE = '30min',
//     SIXTY_MINUTE = '60min',
//     DAILY = 'Daily',
//     WEEKLY = 'Weekly',
//     MONTHLY = 'Monthly',
// }

export enum PlotType {
    LINE = 'line',
    OHLCBAR = 'ohlcBar',
    CANDLESTICK = 'candlestick',
    BAR = 'bar',
    ERROR_BAR = 'errorBar',
    AREA = 'area',
    STACKED_AREA = 'stackedArea'
    // RENKO = 'renko',
    // HEIKEN_ASHI = 'heiken-ashi',
    // RANGE_BAR = 'range-bar',
}

export enum ScaleType {
    NONE = 'none',
    LINEAR = 'linear',
    LOG = 'log',
    DATE = 'date',
    FINANCE_DATE = 'finance-date',
    PERCENT_CHANGE = 'percent-change',
}
  
export interface ChartSetting {
    chartType?: PlotType;
    scaleType?: ScaleType;
    verticalScaleFactor?: number;
    startDate?: Date;
    endDate?: Date;
}
  
export interface ChartDimensions {
    top?: number;
    left?: number;
    height?: string;
    width?: string;
    fullHeight?: boolean;
    fullWidth?: boolean;
}

export interface ChartPanelDimensions {
    svgDim: {width: number; height: number};
    mainChartDim: {width: number; height: number};
    indicatorDim: {width: number; height: number};
    chartAnchor: {right: number; down: number};
    xAxisAnchor: {right: number; down: number};
    yAxisAnchor: {right: number; down: number};
}

export enum TimeFrame {
    ONE_MINUTE = '1min',
    FIVE_MINUTE = '5min',
    FIFTEEN_MINUTE = '15min',
    THIRTY_MINUTE = '30min',
    SIXTY_MINUTE = '60min',
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly',
}

export interface SymbolTimeSetting {
    symbol: string;
    timeFrame: TimeFrame;
    startDate?: Date;
    endDate?: Date;
}

export enum Zoom {
    IN = 'in',
    OUT = 'out',
}

// export enum PanDistance {
//     END = 'end',
//     LEFT = 'left',
//     RIGHT = 'right',
//     START = 'start',

// }

export enum PanDistance {
    START = 'start',
    LEFT = 'left',
    RIGHT = 'right',
    END = 'end',
}

export enum VerticalAdjustment {
    VERT_EXPAND = 'vert_expand',
    VERT_CONTRACT = 'vert_contract',
}

export interface ChartMoveEvent {
    numDataPoints: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface ChartMoveResult {
    currentIndex: number;
    previousIndex: number
    currentZoomLevel: number;
    previousZoomLevel: number;
    currentPageSize: number;
    previousPageSize: number;
    
}

export interface DomRectCoordinates {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
    margin?: MarginConfig;
}

export interface MarginConfig {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    buffer?: number;
    gutter?: number;
    factor?: number;
}


export enum ScaleLocation {
    NONE = 'none',
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export enum PaneType {
    CHART = 'chart',
    INDICATOR = 'indicator'
}


export interface ChartPanelConfig {
    containerDims?: DomRectCoordinates,
    panelDims?: ChartPanelDimensions;
    title?: string;
    description?: string;
    panes?: ChartPaneConfig[];
    details?: PanelDetails;
    
}

export interface PanelDetails {
    panelOrigin?: TranslationCoord;
    chartPresent: boolean;
    chartHeight: number,                    // height of chart pane itself w/o axes
    chartPaneHeight?: number;               // height of chart pane with axes
    numIndicatorPanes: number;
    indicatorHeight: number;               // height of indicator pane w/o axes
    singleIndicatorPaneHeight?: number;    // height of one indicator pane with axes
    chartIndWidth?: number;                 // width of a chart/indicator without axes
    fullPaneWidth?: number;                 // width of a chart/indicator with axes
    panelHeight?: number;                   // sum of chartPanelHeight + all singleIndicatorPaneHeight s
    panelWidth?: number;                    // sum of pane width + total width of axes
    
}

export interface ChartPaneConfig {
    paneNumber?: number;    // what position among all panes stacked top to bottom 1, 2, 3 etc.
    title?: string;
    description?: string;
    idLabel?: string;
    paneType?: PaneType;
    seriesConfigs?: ChartSeriesConfig[];
    annotationsConfigs?: any;
    layerConfigs?: PaneLayerConfig[];
    
}

export interface AxisConfig {
    type?: ScaleType;
    location?: ScaleLocation;
}

// A ChartSeries is any data series.  Can be price or an indicator
// series like a MA or RSI
// DEPRECATED IN FAVOR OF LAYER CONFIG
export interface ChartSeriesConfig {
    seriesType: SeriesName;
    title?: string;
    options?: {};
    xAxisConfig?: AxisConfig;
    yAxisConfig?: AxisConfig;
    displayConfig?: SeriesDisplayConfig;
}

// DEPRECATED IN FAVOR OF PLOT CONFIG
export interface SeriesDisplayConfig {
    chartType: PlotType;
    color?: any;
    thickness?: any;

}

export interface Extents {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
}

export interface TranslationCoord {
    right: number;
    down: number;
}

export interface PaneLayout {
    paneNumber: number;
    fullPaneWidth: number;
    fullPaneHeight: number;
    chartIndHeight: number;
    chartIndWidth: number;
    // paneExtents: PaneExtents;
    paneOrigin: TranslationCoord;
    dataOrigin: TranslationCoord;
    topAxisOrigin: TranslationCoord;
    rightAxisOrigin: TranslationCoord;
    bottomAxisOrigin: TranslationCoord;
    leftAxisOrigin: TranslationCoord;
}

export interface RenderablePane {
    layout?: PaneLayout;
    renderItem?: any;    // this will be the HTML group element for this pane that will be appended to the root svg/group
    config?: ChartPaneConfig;
}

// this is the final output from the main chart panel gen svc
export interface RenderablePanel {
    panelConfig?: ChartPanelConfig;
    panesMap?: Map<number, RenderablePane>;
    renderPanel?: any;
}

export interface MultilineIndicator {
    multiLine: boolean;     // whether the indicator has more than one line (i.e. stochastic, macd, bb)
    lines: string[];        // lines the indicator contains
}

export enum SeriesName {
    PRICE = 'price', // use close instead (or anything but there's no 'price' in any data)
    OPEN = 'open',
    HIGH = 'high',
    LOW = 'low',
    CLOSE = 'close',
    VOLUME = 'volume',
    SMA = 'SMA',
    EMA = 'EMA',
    MACD = 'MACD',
    RSI = 'RSI',
    STOCHASTIC = 'Stochastic',
    BOLLINGER_BANDS = 'Bollinger bands',

}

export enum Indicator {
    SMA = 'SMA',
    EMA = 'EMA',
    MACD = 'MACD',
    RSI = 'RSI',
    STOCHASTIC = 'Stochastic',
    BOLLINGER_BANDS = 'Bollinger bands',

}

// String values should match the property names added to the data object by the calculator 
// export enum PlotLine {
//     EMA = 'ema',
//     SMA = 'sma',
//     RSI = 'rsi',
//     STOCH_K = 'k',
//     STOCH_D = 'd',
//     MACD_MACD = 'macd',
//     MACD_DIVERGENCE = 'divergence',
//     MACD_SIGNAL = 'signal',
//     BB_UPPER = 'upper',
//     BB_LOWER = 'lower',
//     BB_AVERAGE = 'lower',

// }

// export enum PlotName {
//     OPEN = 'open',
//     HIGH = 'high',
//     LOW = 'low',
//     CLOSE = 'close',
//     // PRICE = 'price', // use close instead (or anything but there's no 'price' in any data)
//     VOLUME = 'volume',
//     EMA = 'ema',
//     SMA = 'sma',
//     RSI = 'rsi',
//     STOCH_K = 'k',
//     STOCH_D = 'd',
//     MACD_MACD = 'macd',
//     MACD_DIVERGENCE = 'divergence',
//     MACD_SIGNAL = 'signal',
//     BB_UPPER = 'upper',
//     BB_LOWER = 'lower',
//     BB_AVERAGE = 'lower',

// }

export enum PlotName {
    PRICE = 'price', // For candlestick price plots.  For individual lines use close instead (or anything but there's no 'price' in any data)
    OPEN = 'open',
    HIGH = 'high',
    LOW = 'low',
    CLOSE = 'close',
    VOLUME = 'volume',
    EMA = 'ema',
    SMA = 'sma',
    RSI = 'rsi',
    STOCH_K = 'k-stoch',
    STOCH_D = 'd-stoch',
    MACD_MACD = 'macd-macd',
    MACD_DIVERGENCE = 'divergence-macd',
    MACD_SIGNAL = 'signal-macd',
    BB_UPPER = 'upper-bb',
    BB_LOWER = 'lower-bb',
    BB_AVERAGE = 'average-bb',

}

export interface PaneLayerConfig {
    layerNumber: number;
    title?: string;
    idLabel?: string;
    options?: {};
    upperRangeLimit?: number;
    lowerRangeLimit?: number;
    hasZeroLine?: boolean;
    upperLineLevel?: number;
    lowerLineLevel?: number;
    showGridlines?: boolean;
    // annotationsConfig?: {};
    xAxisConfig?: AxisConfig;
    yAxisConfig?: AxisConfig;
    series: PlotSeries[];
}

export interface PlotSeries {
    title: string;
    idLabel: string;
    seriesName: SeriesName;
    minExtentsTarget?: string;
    maxExtentsTarget?: string;
    params?: Param[];
    plots: PlotConfig[];
}

export interface Param {
    idLabel?: string;   // used as g element id in html.  do not use as column header for generating line series.  
    name: SeriesParam;
    value: number;
}

export interface PlotConfig {
    plotType: PlotType;
    plotName: PlotName;
    idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
    param?: Param;
    target: string; // column name created by data calculator. For single field series (line, point, area)
    targets?: OHLCTargets;
    color?: string;
    upColor?: string;
    downColor?: string;
    style?: string;
    thickness?: string;
    // upperRangeLimit?: number;
    // lowerRangeLimit?: number;
    // hasZeroLine?: boolean;
    // upperLineLevel?: number;
    // lowerLineLevel?: number;

}

// export interface SeriesParams {
//     period?: number;
//     k?: number;
//     d?: number;
//     fast?: number;
//     slow?: number;
//     signal?: number;
//     multiplier?: number;
// }
// export interface StochConfig {
//     k: number;
//     d: number;
// }

// export interface MacdConfig {
//     fast: number;
//     slow: number;
//     signal: number;
// }

// export interface BollingerBandsConfig {
//     period: number;
//     multiplier: number;
// }

export enum SeriesParam {
    PERIOD = 'period',
    K = 'k',
    D = 'd',
    FAST = 'fast',
    SLOW = 'slow',
    SIGNAL = 'signal',
    MULTIPLIER = 'multiplier',
}

// data column names for creating ohlc charts (candlestick, ohlc, h-a, renko, range etc.)
export interface OHLCTargets {
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
}

export interface SingleLineCoords {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

export interface RawGridlinePxValues {
    horzLineYValues: number[],
    vertLineXValues: number[],
}



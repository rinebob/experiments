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

export enum ChartType {
    LINE = 'line',
    BAR = 'bar',
    CANDLESTICK = 'candlestick',
    // RENKO = 'renko',
    // HEIKEN_ASHI = 'heiken-ashi',
    // RANGE_BAR = 'range-bar',
}

export enum ScaleType {
    LINEAR = 'linear',
    LOG = 'log',
    DATE = 'date',
    FINANCE_DATE = 'finance-date',
    PERCENT_CHANGE = 'percent-change',
}
  
export interface ChartSetting {
    chartType?: ChartType;
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
}

export interface ChartPanelConfig {
    dimensions: any;
    title: string;
    description: string;
    panes: ChartPaneConfig[];
    layout: any;
}

export interface ChartPaneConfig {
    xAxisConfig: AxisConfig;
    yAxisConfig: AxisConfig;
    seriesConfigs?: ChartSeriesConfig[];
    indicatorConfigs?: SeriesConfig[];

}

// A ChartSeries is any data series.  Can be price or an indicator
// series like a MA or RSI
export interface ChartSeriesConfig {
    chartType: ChartType;
    series: SeriesConfig;
    color: any;
    thickness: any;

}

export interface AxisConfig {
    type: ScaleType;
    location: ScaleLocation;
}

export interface SeriesConfig {
    type: Series;
    title?: string;
    options?: {};
}

export enum Series {
    PRICE = 'price',
    VOLUME = 'volume',
    SMA = 'SMA',
    EMA = 'EMA',
    MACD = 'MACD',
    RSI = 'RSI',
    STOCHASTIC = 'Stochastic',

}

export enum ScaleLocation {
    TOP = 'top',
    RIGHT = 'right',
    BOTTOM = 'bottom',
    LEFT = 'left',
}

export interface PaneExtents {
    xMin: number;
    yMin: number;
    xMax: number;
    yMax: number;
}


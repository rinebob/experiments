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
}

export enum ScaleType {
    LINEAR = 'linear',
    LOG = 'log',
}
  
export interface ChartSetting {
    chartType?: ChartType;
    scaleType?: ScaleType;
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
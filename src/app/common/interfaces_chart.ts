import * as av from '../services/av/av_interfaces';

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
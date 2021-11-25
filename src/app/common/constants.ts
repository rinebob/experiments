import { Equity, GalleryViewOption } from "./interfaces";
import { DomRectCoordinates, SymbolTimeSetting, TimeFrame } from "./interfaces_chart";
import * as av from "../services/av/av_interfaces";
import { ExpirationSeries, ExpirationTimeDistance, ExpriationTimeDistanceLabel, ExpriationTimeDistanceName, OptionPosition} from "./option_interfaces";
import { ChartPanelDimensions, ChartType, ScaleType } from "./interfaces_chart";
import { Option } from "./option_interfaces";

export const DEFAULT_PICKER_TABLE_DATUM = {symbol: 'TSLA', company: 'Tesla, Inc.', price: 50, implVolty: 20};

export const DEFAULT_EQUITY_SYMBOL = 'MSFT';
export const DEFAULT_EQUITY: Equity = {symbol: "MSFT", company: "Microsoft"};
export const DEFAULT_OPTION_SYMBOL = 'MSFT211219C00330000'; // dec 19 21 330 call
export const DEFAULT_OPTION: Option = {symbol: DEFAULT_OPTION_SYMBOL};

export const DEFAULT_CHART_SETTING = {
    chartType: ChartType.LINE,
    scaleType: ScaleType.LINEAR,
    // startDate: Date;
    // endDate: Date;
};

export const DEFAULT_SYMBOL_TIME_SETTING: SymbolTimeSetting = {
    symbol: DEFAULT_EQUITY_SYMBOL,
    timeFrame: TimeFrame.DAILY,
    // startDate: new Date(),
    // endDate: new Date(),
};

export const DEFAULT_AV_BASE_DATA_SETTING: av.BaseSetting = {
  slice: av.Slice.YEAR1MONTH1,
  adjusted: av.Adjusted.ADJUSTED,
  outputSize: av.OutputSize.FULL,
  dataType: av.DataType.JSON,
};

export const DEFAULT_CHART_DIMENSIONS = {
    top: undefined,
    left: undefined,
    height: undefined,
    width: undefined,
    fullHeight: true,
    fullWidth: true,
}

export const GalleryNavSelections = [
    {buttonText: GalleryViewOption.FULLSCREEN},
    {buttonText: GalleryViewOption.GALLERY},
    {buttonText: GalleryViewOption.FILMSTRIP},
  
];


export const MONTHS_MAP = new Map([
    [0, 'JAN'],
    [1, 'FEB'],
    [2, 'MAR'],
    [3, 'APR'],
    [4, 'MAY'],
    [5, 'JUN'],
    [6, 'JUL'],
    [7, 'AUG'],
    [8, 'SEP'],
    [9, 'OCT'],
    [10, 'NOV'],
    [11, 'DEC'],
]);

export const DAYS_MAP = new Map([
    [0, 'SUN'],
    [1, 'MON'],
    [2, 'TUE'],
    [3, 'WED'],
    [4, 'THU'],
    [5, 'FRI'],
    [6, 'SAT'],
]);

export const DAYS_IN_A_MONTH_MAP = new Map([
    [0, 31],
    [1, 28],
    [2, 31],
    [3, 30],
    [4, 31],
    [5, 30],
    [6, 31],
    [7, 31],
    [8, 30],
    [9, 31],
    [10, 30],
    [11, 31],
]);


//   Default OptionPosition
export const DEFAULT_OPTION_POSITION: OptionPosition = {
    title: '',
    underlying: '',
    underlyingPrice: 0,
}

export const MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000;

export const DEFAULT_HISTORICAL_ANALYSIS_DATE = {
    date: new Date(),
    symbol: 'TSLA',
    price: 600,
    implVolty: 50,
  };

// List of option expiration months to expiration
export const OPTION_EXPIRATION_TIME_DISTANCES: ExpirationTimeDistance[] = [
{
    expLabel: ExpriationTimeDistanceLabel.ONE_WEEK,
    expSeries: ExpirationSeries.WEEKLY,
    expName: ExpriationTimeDistanceName.ONE_WEEK,
    expDist: 1,
    expDay: 5,
},
{
    expLabel: ExpriationTimeDistanceLabel.TWO_WEEK,
    expSeries: ExpirationSeries.WEEKLY,
    expName: ExpriationTimeDistanceName.TWO_WEEK,
    expDist: 2,
    expDay: 5,
},
{
    expLabel: ExpriationTimeDistanceLabel.ONE_MONTH,
    expSeries: ExpirationSeries.MONTHLY,
    expName: ExpriationTimeDistanceName.ONE_MONTH,
    expDist: 1,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.TWO_MONTH,
    expSeries: ExpirationSeries.MONTHLY,
    expName: ExpriationTimeDistanceName.TWO_MONTH,
    expDist: 2,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.THREE_MONTH,
    expSeries: ExpirationSeries.MONTHLY,
    expName: ExpriationTimeDistanceName.THREE_MONTH,
    expDist: 3,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.SIX_MONTH,
    expSeries: ExpirationSeries.QUARTERLY,
    expName: ExpriationTimeDistanceName.SIX_MONTH,
    expDist: 6,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.NINE_MONTH,
    expSeries: ExpirationSeries.QUARTERLY,
    expName: ExpriationTimeDistanceName.NINE_MONTH,
    expDist: 9,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.TWELVE_MONTH,
    expSeries: ExpirationSeries.QUARTERLY,
    expName: ExpriationTimeDistanceName.TWELVE_MONTH,
    expDist: 12,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.FIFTEEN_MONTH,
    expSeries: ExpirationSeries.QUARTERLY,
    expName: ExpriationTimeDistanceName.FIFTEEN_MONTH,
    expDist: 15,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.EIGHTEEN_MONTH,
    expSeries: ExpirationSeries.QUARTERLY,
    expName: ExpriationTimeDistanceName.EIGHTEEN_MONTH,
    expDist: 18,
    expDay: 4,
},
{
    expLabel: ExpriationTimeDistanceLabel.TWENTY_FOUR_MONTH,
    expSeries: ExpirationSeries.QUARTERLY,
    expName: ExpriationTimeDistanceName.TWENTY_FOUR_MONTH,
    expDist: 24,
    expDay: 4,
},
];

// MAR, JUN, SEP, DEC
export const QUARTERLY_EXPIRATION_MONTHS = [2, 5, 8, 11];

export const STANDARD_DAYS_IN_A_MONTH = 30;
export const DAYS_IN_A_WEEK = 7;
export const TWO_CALENDAR_WEEKS = 14;

export const DEFAULT_CHART_MOVE_EVENT = {
    numDataPoints: 0,
    startIndex: 0,
    endIndex: 0,
    hasNextPage: false,
    hasPreviousPage: false,
}

// export const ZOOM_LEVELS = new Map([
//   [1, 0.001],
//   [2, 0.005],
//   [3, 0.01],
//   [4, 0.025],
//   [5, 0.1],
//   [6, 0.25],
//   [7, 0.5],
//   [8, 1.0],
// ]);

export const ZOOM_LEVELS = new Map([
    [1, 0.01],
    [2, 0.025],
    [3, 0.05],
    [4, 0.1],
    [5, 0.25],
    [6, 0.5],
    [7, 0.75],
    [8, 1.0],
  ]);

// export const ZOOM_LEVELS = new Map([
//     [1, 0.01],
//     [2, 0.05],
//     [3, 0.1],
//     [4, 0.25],
//     [5, 0.5],
//     [6, 0.75],
//   ]);

export const DEFAULT_ZOOM_LEVEL = ZOOM_LEVELS.size;

export const DOM_RECT_COORDS_INITIALIZER:DomRectCoordinates = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
}

export const CHART_MARGINS = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    gutter: 50,

};

export const CHART_PANEL_DIMENSIONS_INITIALIZER: ChartPanelDimensions = {
    svgDim: {width: 0, height: 0},
    mainChartDim: {width: 0, height: 0},
    indicatorDim: {width: 0, height: 0},
    chartAnchor: {right: 0, down: 0},
    xAxisAnchor: {right: 0, down: 0},
    yAxisAnchor: {right: 0, down: 0},  
  }

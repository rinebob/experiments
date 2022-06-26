import { Equity, GalleryViewOption, OHLCData, RibbonInfo } from "./interfaces";
import { ChartPanelConfig, DomRectCoordinates, PlotName, MarginConfig, ScaleLocation, SymbolTimeSetting, TimeFrame, TranslationCoord } from "./interfaces_chart";
import * as av from "../services/av/av_interfaces";
import { BlackScholesCalculatorConfig, BlackScholesOutput, ExpirationSeries, ExpirationTimeDistance, ExpriationTimeDistanceLabel, ExpriationTimeDistanceName, OptionPosition} from "./option_interfaces";
import { ChartPanelDimensions, ChartSetting, PlotType, PaneType, SeriesName, ScaleType } from "./interfaces_chart";
import { BlackScholesInputs, Option } from "./option_interfaces";

import { nflxData as NFLX_DATA } from 'src/assets/data/nflx_21-0917';
import { tslaData as TSLA_DATA } from 'src/assets/data/tsla_21-0917';

export const DEFAULT_PICKER_TABLE_DATUM = {symbol: 'TSLA', company: 'Tesla, Inc.', price: 50, implVolty: 20};

export const DEFAULT_EQUITY_SYMBOL = 'MSFT';
export const DEFAULT_EQUITY: Equity = {symbol: "MSFT", company: "Microsoft"};
export const DEFAULT_OPTION_SYMBOL = 'MSFT211219C00330000'; // dec 19 21 330 call
export const DEFAULT_OPTION: Option = {symbol: DEFAULT_OPTION_SYMBOL};

export const VERTICAL_ADJUSTMENT_FACTOR = 0.25;

export const OHLC_INITIALIZER: OHLCData = {
    date: new Date(Date.now()),
    stringDate: '',
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
  }

export const DEFAULT_CHART_SETTING: ChartSetting = {
    chartType: PlotType.CANDLESTICK,
    scaleType: ScaleType.LOG,
    verticalScaleFactor: 2.5,
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
  outputSize: av.OutputSize.COMPACT,
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

// export const DEFAULT_ZOOM_LEVEL = ZOOM_LEVELS.size;
export const DEFAULT_ZOOM_LEVEL = 4;

export const DEFAULT_SHOW_CROSSHAIRS_SETTING = false;

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

  export const INDICATOR_OPTIONS = new Map([
      [SeriesName.SMA, {period: 9}],
      [SeriesName.EMA, {period: 9}],
      [SeriesName.MACD, {fast: 12, slow: 26, smoother: 9}],
      [SeriesName.RSI, {period: 14}],
      [SeriesName.STOCHASTIC, {k: 14, d: 9}],
  ]);


export const PANE_HEIGHT_MATRIX = new Map<number, number>([
    [1, 1],
    [2, 0.75],
    [3, 0.60],
    [4, 0.40],
    [5, 0.33],
]);

// export const PANE_HEIGHT_MATRIX = new Map<number, number>([
//     [1, .75],
//     [2, 0.5],
//     [3, 0.35],
//     [4, 0.25],
//     [5, 0.1],
// ]);

// export const DEFAULT_MARGIN_CONFIG: MarginConfig = {
//     top: 50,
//     right: 50,
//     bottom: 50,
//     left: 50,
//     buffer: 20,
//     gutter: 20,
//     factor: .9,
// };

export const DEFAULT_MARGIN_CONFIG: MarginConfig = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    buffer: 20,
    gutter: 20,
    factor: .9,
};


export const AXIS_THICKNESS = 30;
// export const AXIS_THICKNESS = 20;

// We will always use calendar days for Black-Scholes and other calculations
export const DAYS_IN_A_YEAR = 365;

export const BLACK_SCHOLES_INITIALIZER: BlackScholesInputs = {
    S0: 100, X: 100, s: .25, t: .15, r: .02, q: 0,
};

export const BLACK_SCHOLES_INPUTS: BlackScholesInputs[] = [
    {
      S0: 100, X: 100, s: .25, t: .15, r: .02, q: 0,
    },
    {
      S0: 103,
      X: 100,
      s: .3,
      t: .145,
      r: .02,
      q: 0,
    },
    {
      S0: 105,
      X: 100,
      s: .35,
      t: .14,
      r: .02,
      q: 0,
    },
    {
      S0: 107,
      X: 100,
      s: .4,
      t: .135,
      r: .02,
      q: 0,
    },
    {
      S0: 109,
      X: 100,
      s: .45,
      t: .13,
      r: .02,
      q: 0,
    },
    {
      S0: 111,
      X: 100,
      s: .5,
      t: .125,
      r: .02,
      q: 0,
    },
    
  ];

  export const BLACK_SCHOLES_OUTPUT_INITIALIZER: BlackScholesOutput = {
    callPrice: 0,
    callDelta: 0,
    callTheta: 0,
    putPrice: 0,
    putDelta: 0,
    putTheta: 0,
    gamma: 0,
    vega: 0,
    rho: 0
}

export const BLACK_SCHOLES_CONFIG_INITIALIZER: BlackScholesCalculatorConfig = {
    undPriceMin: 100,
    undPriceMax: 110,
    strikeMin: 100,
    strikeMax: 110,
    strikeIncrement: 5,
    timeMin: 0.125,
    timeMax: 0.25,
    volMin: 0.25,
    volMax: 0.75,
    numDataPoints: 20,
}

  export const PRICE_SERIES = new Set([SeriesName.OPEN, SeriesName.HIGH, SeriesName.LOW, SeriesName.CLOSE]);

  export const INDICATOR_LINES_MAP = new Map([
    [SeriesName.PRICE, [PlotName.OPEN, PlotName.HIGH, PlotName.LOW, PlotName.CLOSE]],
    [SeriesName.STOCHASTIC, [PlotName.STOCH_K, PlotName.STOCH_D]],
    [SeriesName.MACD, [PlotName.MACD_DIVERGENCE, PlotName.MACD_MACD, PlotName.MACD_SIGNAL]],
    [SeriesName.BOLLINGER_BANDS, [PlotName.BB_UPPER, PlotName.BB_LOWER]],
    
]);

export const EXTENTS_HIGH_TARGET_MAP = new Map<SeriesName, string | number>([
    [SeriesName.INDEX, 'index'],
    [SeriesName.OPEN, 'open'],
    [SeriesName.HIGH, 'high'],
    [SeriesName.LOW, 'low'],
    [SeriesName.CLOSE, 'high'],
    [SeriesName.VOLUME , 'volume'],
    [SeriesName.EMA, 'high'],
    [SeriesName.SMA, 'high'],
    [SeriesName.BOLLINGER_BANDS, 'high'],
    [SeriesName.RSI, 100],
    [SeriesName.STOCHASTIC, 100],
    [SeriesName.MACD, 'macd'],
    [SeriesName.CALL_PRICE , 'callPrice'],
    [SeriesName.CALL_DELTA , 'callDelta'],
    [SeriesName.CALL_THETA , 'callTheta'],
    [SeriesName.PUT_PRICE , 'putPrice'],
    [SeriesName.PUT_DELTA , 'putDelta'],
    [SeriesName.PUT_THETA , 'putTheta'],
    [SeriesName.GAMMA , 'gamma'],
    [SeriesName.VEGA , 'vega'],
]);

export const EXTENTS_LOW_TARGET_MAP = new Map<SeriesName, string | number>([
    [SeriesName.INDEX, 'index'],
    [SeriesName.OPEN, 'open'],
    [SeriesName.HIGH, 'high'],
    [SeriesName.LOW, 'low'],
    [SeriesName.CLOSE, 'low'],
    [SeriesName.VOLUME , 'volume'],
    [SeriesName.EMA, 'low'],
    [SeriesName.SMA, 'low'],
    [SeriesName.BOLLINGER_BANDS, 'low'],
    [SeriesName.RSI, 0],
    [SeriesName.STOCHASTIC, 0],
    [SeriesName.MACD, 'macd'],
    [SeriesName.CALL_PRICE , 'callPrice'],
    [SeriesName.CALL_DELTA , 'callDelta'],
    [SeriesName.CALL_THETA , 'callTheta'],
    [SeriesName.PUT_PRICE , 'putPrice'],
    [SeriesName.PUT_DELTA , 'putDelta'],
    [SeriesName.PUT_THETA , 'putTheta'],
    [SeriesName.GAMMA , 'gamma'],
    [SeriesName.VEGA , 'vega'],
]);


export const EQUITY_DATA_MAP = new Map<string, OHLCData[]>([
    ['NFLX', NFLX_DATA],
    ['TSLA', TSLA_DATA],
    // ['MSFT', MSFT_DATA],
]);

export const SYMBOLS: string[] = [
    "AAPL",
    "ABBV",
    "ABT",
    "ACN",
    "ADBE",
    "AIG",
    "AMGN",
    "AMT",
    "AMZN",
    "AVGO",
    "AXP",
    "BA",
    "BAC",
    "BIIB",
    "BK",
    "BKNG",
    "BLK",
    "BMY",
    "BRK_B",
    "C",
    "CAT",
    "CHTR",
    "CL",
    "CMCSA",
    "COF",
    "COP",
    "COST",
    "CRM",
    "CSCO",
    "CVS",
    "CVX",
    "DD",
    "DHR",
    "DIS",
    "DOW",
    "DUK",
    "EMR",
    "EXC",
    "F",
    "FB",
    "FDX",
    "GD",
    "GE",
    "GILD",
    "GM",
    "GOOG",
    "GOOGL",
    "GS",
    "HD",
    "HON",
    "IBM",
    "INTC",
    "JNJ",
    "JPM",
    "KHC",
    "KO",
    "LIN",
    "LLY",
    "LMT",
    "LOW",
    "MA",
    "MCD",
    "MDLZ",
    "MDT",
    "MET",
    "MMM",
    "MO",
    "MRK",
    "MS",
    "MSFT",
    "NEE",
    "NFLX",
    "NKE",
    "NVDA",
    "ORCL",
    "PEP",
    "PFE",
    "PG",
    "PM",
    "PYPL",
    "QCOM",
    "RTX",
    "SBUX",
    "SO",
    "SPG",
    "T",
    "TGT",
    "TMO",
    "TMUS",
    "TSLA",
    "TXN",
    "UNH",
    "UNP",
    "UPS",
    "USB",
    "V",
    "VZ",
    "WBA",
    "WFC",
    "WMT",
    "XOM"
];

export const RIBBON_INFO_INITIALIZER: RibbonInfo = {
    symbol: '',
    date: '',
    price: '',
    iv: '',
}

// For DeltaStrikesGrid component
// Map of key target delta and value number of records to return for that target delta
export const DELTA_STRIKES_TARGET_DELTA_NUM_RECORDS = new Map([
    [.80, 3],
    [.50, 5],
    [.20, 3],
]);

export const NDX_SYMBOLS_0622 = [
    'ATVI',
    'ADBE',
    'ADP',
    'ABNB',
    'ALGN',
    'GOOGL',
    'GOOG',
    'AMZN',
    'AMD',
    'AEP',
    'AMGN',
    'ADI',
    'ANSS',
    'AAPL',
    'AMAT',
    'ASML',
    'AZN',
    'TEAM',
    'ADSK',
    'BIDU',
    'BIIB',
    'BKNG',
    'AVGO',
    'CDNS',
    'CHTR',
    'CTAS',
    'CSCO',
    'CTSH',
    'CMCSA',
    'CEG',
    'CPRT',
    'COST',
    'CRWD',
    'CSX',
    'DDOG',
    'DXCM',
    'DOCU',
    'DLTR',
    'EBAY',
    'EA',
    'EXC',
    'FAST',
    'FISV',
    'FTNT',
    'GILD',
    'HON',
    'IDXX',
    'ILMN',
    'INTC',
    'INTU',
    'ISRG',
    'JD',
    'KDP',
    'KLAC',
    'KHC',
    'LRCX',
    'LCID',
    'LULU',
    'MAR',
    'MRVL',
    'MTCH',
    'MELI',
    'META',
    'MCHP',
    'MU',
    'MSFT',
    'MRNA',
    'MDLZ',
    'MNST',
    'NTES',
    'NFLX',
    'NVDA',
    'NXPI',
    'ORLY',
    'OKTA',
    'ODFL',
    'PCAR',
    'PANW',
    'PAYX',
    'PYPL',
    'PEP',
    'PDD',
    'QCOM',
    'REGN',
    'ROST',
    'SGEN',
    'SIRI',
    'SWKS',
    'SPLK',
    'SBUX',
    'SNPS',
    'TMUS',
    'TSLA',
    'TXN',
    'VRSN',
    'VRSK',
    'VRTX',
    'WBA',
    'WDAY',
    'XEL',
    'ZM',
    'ZS',
]
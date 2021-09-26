

export interface NavigationLink {
    label: string;
    link: string;
    index: number;
}

export enum GalleryChartMode {
    FULLSCREEN_MODE = 'fullscreen',
    GALLERY_MODE = 'gallery',
    FILMSTRIP_MAIN_MODE = 'filmstrip-main',
    FILMSTRIP_STRIP_MODE = 'filmstrip-strip',
}

export interface ChartDimensions {
    top?: number;
    left?: number;
    height?: string;
    width?: string;
    fullHeight?: boolean;
    fullWidth?: boolean;
}



// Data structure for Picker Table Component
export interface PickerTableData {
    symbol: string;
    company: string;
    price: number;
    implVolty: number;
    date?: Date;
}

// Data structure for Historical Analysis Trading Date Selection
export interface HistoricalAnalysisDate {
    date: Date;
    symbol: string;
    price: number;
    implVolty: number;
}

export interface NavBarSelection {
    buttonText: string;
  }
  
export enum GalleryViewOptions {
    FULLSCREEN = 'fullscreen',
    GALLERY = 'gallery',
    FILMSTRIP = 'filmstrip',
  
  } 

export interface TimeParts {
    mo: number;
    dy: number;
    yr: number;
    hr: number;
    min: number;
    sec: number;
}  

export interface ExpirationTimeDistance {
    expName: ExpriationTimeDistanceName;
    expSeries: ExpirationSeries;
    expDist: number;        // time units (wk, mo, qtr) to expriation
    expDay: number;         // day of week 0(sun) to 6(sat)
}

export interface ExpirationDate {
    expName: ExpriationTimeDistanceName;
    expDate: Date;        // actual expriation date
    expDay: number;         // day of week 0(sun) to 6(sat)
}

export enum ExpriationTimeDistanceName {
    ONE_WEEK = 'One week',
    TWO_WEEK = 'Two week',
    ONE_MONTH = 'One month',
    TWO_MONTH = 'Two month',
    THREE_MONTH = 'Three month',
    SIX_MONTH = 'Six month',
    NINE_MONTH = 'Nine month',
    TWELVE_MONTH = 'Twelve month',
    FIFTEEN_MONTH = 'Fifteen month',
    EIGHTEEN_MONTH = 'Eighteen month',
    TWENTY_FOUR_MONTH = 'Twenty-four month',
}

export enum ExpirationSeries {
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly',
    QUARTERLY = 'Quarterly',
}

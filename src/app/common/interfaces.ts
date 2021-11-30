


export interface Equity {
    symbol: string;
    company?: string;
    exchange?: string;

}

export const OHLC_INITIALIZER: OHLCData = {
    date: new Date(Date.now()),
    stringDate: '',
    open: 0,
    high: 0,
    low: 0,
    close: 0,
    volume: 0,
  }
  
  export interface OHLCData {
    date: Date | string;
    stringDate?: string;
    open: number;
    high: number;
    low: number;
    close: number;
    adjustedClose?: number;
    volume: number;
    dividendAmount?: number;
    splitCoefficient?: number;
  }

    // intraday intervals


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
  
export enum GalleryViewOption {
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

export interface MenuConfig {
    label: string;
    route: string;
    triggerFor?: string;
}



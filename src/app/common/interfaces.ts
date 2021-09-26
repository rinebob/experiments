

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

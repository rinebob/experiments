import { GalleryViewOptions } from "./interfaces";

export const DEFAULT_PICKER_TABLE_DATUM = {symbol: 'TSLA', company: 'Tesla, Inc.', price: 50, implVolty: 20};

export const DEFAULT_CHART_DIMENSIONS = {
    top: undefined,
    left: undefined,
    height: undefined,
    width: undefined,
    fullHeight: true,
    fullWidth: true,
}

export const GalleryNavSelections = [
    {buttonText: GalleryViewOptions.FULLSCREEN},
    {buttonText: GalleryViewOptions.GALLERY},
    {buttonText: GalleryViewOptions.FILMSTRIP},
  
  ];
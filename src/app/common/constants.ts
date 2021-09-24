import { GalleryViewOptions } from "./interfaces";
import { OptionPosition } from "./option_interfaces";

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



let getMonthValues = [
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
];

export const monthsMap = new Map([
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

//   Default OptionPosition
export const DEFAULT_OPTION_POSITION: OptionPosition = {
    title: '',
    underlying: '',
    underlyingPrice: 0,
}
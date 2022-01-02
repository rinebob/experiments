import { ChartPanelConfig, PlotType, PaneType,  PlotName,  ScaleLocation, ScaleType, SeriesLabel, SeriesName, SeriesParam, Indicator} from "./interfaces_chart";
import {INDICATOR_LINES_MAP} from './constants';

// ========================================================================
// CONFIGS WITH LAYERS

export const SINGLE_PANE_LAYER_PANEL_CONFIG: ChartPanelConfig = {
    panes: [
        {
            title: 'Pane 1',
            idLabel: 'pane-1',
            description: 'Hey it\'s the big one with all the squiggly lines...', 
            paneType: PaneType.CHART,
            paneNumber: 1,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'layer-1',
                    showGridlines: true,
                    // showGridlines: false,
                    series: [
                        // {
                        //     title: 'close',
                        //     seriesName: SeriesName.CLOSE,
                        //     idLabel: PlotName.CLOSE,
                        //     plots: [
                        //         {
                        //             plotType: PlotType.LINE,
                        //             plotName: PlotName.CLOSE,
                        //             idLabel: PlotName.CLOSE,
                        //             target: PlotName.CLOSE,
                        //             color: 'yellow',
                        //             upColor: 'blue',
                        //             downColor: 'blue',
                        //             style: 'line',
                        //             thickness: '2.5',
                        //         },
                        //     ],
                        // },
                        {
                            title: 'price',
                            seriesName: SeriesName.PRICE,
                            seriesLabel: SeriesLabel.PRICE,
                            idLabel: PlotName.PRICE,
                            plots: [
                                {
                                    plotType: PlotType.CANDLESTICK,
                                    plotName: PlotName.PRICE,
                                    idLabel: PlotName.PRICE,
                                    target: PlotName.PRICE,
                                    color: 'yellow',
                                    upColor: 'steelblue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                },
                            ],
                        },
                        // {
                        //     title: 'price',
                        //     seriesName: SeriesName.PRICE,
                        //     idLabel: PlotName.PRICE,
                        //     plots: [
                        //         {
                        //             plotType: PlotType.OHLCBAR,
                        //             plotName: PlotName.PRICE,
                        //             idLabel: PlotName.PRICE,
                        //             target: PlotName.PRICE,
                        //             color: 'yellow',
                        //             upColor: 'blue',
                        //             downColor: 'blue',
                        //             style: 'line',
                        //             thickness: '2.5',
                        //         },
                        //     ],
                        // },

                        {
                            title: 'Layer 1 ema 10',
                            seriesName: SeriesName.EMA,
                            seriesLabel: SeriesLabel.EMA,
                            idLabel: PlotName.EMA,
                            params: [{idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 10}],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.EMA,
                                    idLabel: `${PlotName.EMA}-10-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 10},
                                    target: `${PlotName.EMA}-10`,
                                    color: 'rgb(36, 164, 204)',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        // {
                        //     title: 'Layer 1 ema 50',
                        //     seriesName: SeriesName.EMA,
                        //     seriesLabel: SeriesLabel.EMA,
                        //     idLabel: PlotName.EMA,
                        //     params: [{idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 50}],
                        //     plots: [
                        //         {
                        //             plotType: PlotType.LINE,
                        //             plotName: PlotName.EMA,
                        //             idLabel: `${PlotName.EMA}-50-${PlotType.LINE}`,
                        //             param: {name: SeriesParam.PERIOD, value: 50},
                        //             target: `${PlotName.EMA}-50`,
                        //             color: 'blue',
                        //             upColor: 'red',
                        //             downColor: 'red',
                        //             style: 'line',
                        //             thickness: '2.0',
                        //         },

                        //     ],
                        // },
                        // {
                        //     title: 'Layer 1 ema 200',
                        //     seriesName: SeriesName.EMA,
                        //     seriesLabel: SeriesLabel.EMA,
                        //     idLabel: PlotName.EMA,
                        //     params: [{idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 200}],
                        //     plots: [
                        //         {
                        //             plotType: PlotType.LINE,
                        //             plotName: PlotName.EMA,
                        //             idLabel: `${PlotName.EMA}-200-${PlotType.LINE}`,
                        //             param: {name: SeriesParam.PERIOD, value: 200},
                        //             target: `${PlotName.EMA}-200`,
                        //             color: 'yellow',
                        //             upColor: 'green',
                        //             downColor: 'red',
                        //             style: 'line',
                        //             thickness: '2.0',
                        //         },

                        //     ],
                        // },
                        // {
                        //     title: 'Pane 1 Layer 1 sma 20',
                        //     seriesName: SeriesName.SMA,
                        //     seriesLabel: SeriesLabel.SMA,
                        //     idLabel: PlotName.SMA,
                        //     params: [{idLabel: PlotName.SMA, name: SeriesParam.PERIOD, value: 20}],
                        //     plots: [
                        //         {
                        //             plotType: PlotType.LINE,
                        //             plotName: PlotName.SMA,
                        //             idLabel: `${PlotName.SMA}-20-${PlotType.LINE}`,
                        //             param: {name: SeriesParam.PERIOD, value: 20},
                        //             target: `${PlotName.SMA}-20`,
                        //             color: 'red',
                        //             upColor: 'green',
                        //             downColor: 'red',
                        //             style: 'line',
                        //             thickness: '2.0',
                        //         },

                        //     ],
                        // },
                        // {
                        //     title: 'Pane 1 Layer 1 sma 50',
                        //     seriesName: SeriesName.SMA,
                        //     seriesLabel: SeriesLabel.SMA,
                        //     idLabel: PlotName.SMA,
                        //     params: [{idLabel: PlotName.SMA, name: SeriesParam.PERIOD, value: 50}],
                        //     plots: [
                        //         {
                        //             plotType: PlotType.LINE,
                        //             plotName: PlotName.SMA,
                        //             idLabel: `${PlotName.SMA}-50-${PlotType.LINE}`,
                        //             param: {name: SeriesParam.PERIOD, value: 50},
                        //             target: `${PlotName.SMA}-50`,
                        //             color: 'green',
                        //             upColor: 'green',
                        //             downColor: 'red',
                        //             style: 'line',
                        //             thickness: '2.0',
                        //         },

                        //     ],
                        // },
                        {
                            title: 'Pane 1 Layer 1 bb 20 2',
                            seriesName: SeriesName.BOLLINGER_BANDS,
                            seriesLabel: SeriesLabel.BOLLINGER_BANDS,
                            idLabel: `${SeriesName.BOLLINGER_BANDS}-20-2`,
                            params: [
                                {name: SeriesParam.PERIOD, value: 20},
                                {name: SeriesParam.MULTIPLIER, value: 2},
                            ],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.BB_UPPER,
                                    idLabel: `${PlotName.BB_UPPER}-20-2-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: `${PlotName.BB_UPPER}-20-2`,
                                    color: 'yellow',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.BB_LOWER,
                                    idLabel: `${PlotName.BB_LOWER}-20-2-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: `${PlotName.BB_LOWER}-20-2`,
                                    color: 'yellow',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                // {
                                //     plotType: PlotType.LINE,
                                //     plotName: PlotName.BB_AVERAGE,
                                //     idLabel: `${PlotName.BB_AVERAGE}-20-2-${PlotType.LINE}`,
                                //     param: {name: SeriesParam.PERIOD, value: 20},
                                //     target: `${PlotName.BB_AVERAGE}-20-2`,
                                //     color: 'white',
                                //     upColor: 'green',
                                //     downColor: 'red',
                                //     style: 'line',
                                //     thickness: '2.0',
                                // },

                            ],
                        },
                      
                      
                    ],
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.RIGHT},
                },
                {
                    layerNumber: 2,
                    title: 'Pane 1 Layer 2',
                    idLabel: 'layer-2',
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.LEFT},
                    showGridlines: false,
                    upperRangeLimit: 100,
                    lowerRangeLimit: 0,
                    upperLineLevel: 70,
                    lowerLineLevel: 30,
                    hasZeroLine: false,
                    series: [
                        {
                            title: `Series 1 - ${Indicator.RSI}`,
                            idLabel: `${PlotName.RSI}-14`,
                            seriesName: SeriesName.RSI,
                            seriesLabel: SeriesLabel.RSI,
                            params: [
                                {name: SeriesParam.PERIOD, value: 14},
                            ],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.RSI,
                                    idLabel: '',    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                                    param: {name: SeriesParam.PERIOD, value: 14},
                                    target: `${PlotName.RSI}-14`, // column name created by data calculator
                                    color: 'red',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                            ],
                        },
                    ]
                },
            ],
        },
    ],
}


export const LAYER_PANEL_CONFIG: ChartPanelConfig = {
    panes: [
        {
            title: 'Pane 1',
            idLabel: 'pane-1',
            description: 'Hey it\'s the big one with all the squiggly lines...', 
            paneType: PaneType.CHART,
            paneNumber: 1,
            layerConfigs: [
                   // export interface PaneLayerConfig {
            //     layerNumber: number;
            //     title?: string;
            //     idLabel?: string;
            //     options?: {};
            //     upperRangeLimit?: number;
            //     lowerRangeLimit?: number;
            //     hasZeroLine?: boolean;
            //     upperLineLevel?: number;
            //     lowerLineLevel?: number;
            //     showGridlines?: boolean;
            //     // annotationsConfig?: {};
            //     xAxisConfig?: AxisConfig;
            //     yAxisConfig?: AxisConfig;
            //     series: PlotSeries[];
            // }
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'layer-1',
                    showGridlines: true,
                    // showGridlines: false,
                    series: [
                        // {
                        //     title: 'close',
                        //     seriesName: SeriesName.CLOSE,
                        //     seriesLabel: SeriesLabel.CLOSE,
                        //     idLabel: PlotName.CLOSE,
                        //     plots: [
                        //         {
                        //             plotType: PlotType.LINE,
                        //             plotName: PlotName.CLOSE,
                        //             idLabel: PlotName.CLOSE,
                        //             target: PlotName.CLOSE,
                        //             color: 'yellow',
                        //             upColor: 'blue',
                        //             downColor: 'blue',
                        //             style: 'line',
                        //             thickness: '2.5',
                        //         },
                        //     ],
                        // },
                        // {
                        //     title: 'price',
                        //     seriesName: SeriesName.PRICE,
                        //     seriesLabel: SeriesLabel.PRICE,
                        //     idLabel: PlotName.PRICE,
                        //     plots: [
                        //         {
                        //             plotType: PlotType.CANDLESTICK,
                        //             plotName: PlotName.PRICE,
                        //             idLabel: PlotName.PRICE,
                        //             target: PlotName.PRICE,
                        //             color: 'yellow',
                        //             upColor: 'steelblue',
                        //             downColor: 'blue',
                        //             style: 'line',
                        //             thickness: '2.5',
                        //         },
                        //     ],
                        // },
                        {
                            title: 'price',
                            seriesName: SeriesName.PRICE,
                            seriesLabel: SeriesLabel.PRICE,
                            idLabel: PlotName.PRICE,
                            plots: [
                                {
                                    plotType: PlotType.OHLCBAR,
                                    plotName: PlotName.PRICE,
                                    idLabel: PlotName.PRICE,
                                    target: PlotName.PRICE,
                                    color: 'yellow',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                },
                            ],
                        },

                        {
                            title: 'Layer 1 ema 10',
                            seriesName: SeriesName.EMA,
                            seriesLabel: SeriesLabel.EMA,
                            idLabel: PlotName.EMA,
                            params: [{idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 10}],
                            plots: [
                                // export interface PlotConfig {
                                //     plotType: PlotType;
                                //     plotName: PlotName;
                                //     idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                                //     param?: Param;
                                //     target: string; // column name created by data calculator. For single field series (line, point, area)
                                //     targets?: OHLCTargets;
                                //     color?: string;
                                //     upColor?: string;
                                //     downColor?: string;
                                //     style?: string;
                                //     thickness?: string;
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.EMA,
                                    idLabel: `${PlotName.EMA}-10-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 10},
                                    target: `${PlotName.EMA}-10`,
                                    color: 'rgb(36, 164, 204)',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        {
                            title: 'Layer 1 ema 50',
                            seriesName: SeriesName.EMA,
                            seriesLabel: SeriesLabel.EMA,
                            idLabel: PlotName.EMA,
                            params: [{idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 50}],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.EMA,
                                    idLabel: `${PlotName.EMA}-50-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 50},
                                    target: `${PlotName.EMA}-50`,
                                    color: 'blue',
                                    upColor: 'red',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        {
                            title: 'Layer 1 ema 200',
                            seriesName: SeriesName.EMA,
                            seriesLabel: SeriesLabel.EMA,
                            idLabel: PlotName.EMA,
                            params: [{idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 200}],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.EMA,
                                    idLabel: `${PlotName.EMA}-200-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 200},
                                    target: `${PlotName.EMA}-200`,
                                    color: 'yellow',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        {
                            title: 'Pane 1 Layer 1 bb 20 2',
                            seriesName: SeriesName.BOLLINGER_BANDS,
                            seriesLabel: SeriesLabel.BOLLINGER_BANDS,
                            idLabel: `${SeriesName.BOLLINGER_BANDS}-20-2`,
                            params: [
                                {name: SeriesParam.PERIOD, value: 20},
                                {name: SeriesParam.MULTIPLIER, value: 2},
                            ],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.BB_UPPER,
                                    idLabel: `${PlotName.BB_UPPER}-20-2-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: `${PlotName.BB_UPPER}-20-2`,
                                    color: 'yellow',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.BB_LOWER,
                                    idLabel: `${PlotName.BB_LOWER}-20-2-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: `${PlotName.BB_LOWER}-20-2`,
                                    color: 'yellow',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                // {
                                //     plotType: PlotType.LINE,
                                //     plotName: PlotName.BB_AVERAGE,
                                //     idLabel: `${PlotName.BB_AVERAGE}-20-2-${PlotType.LINE}`,
                                //     param: {name: SeriesParam.PERIOD, value: 20},
                                //     target: `${PlotName.BB_AVERAGE}-20-2`,
                                //     color: 'white',
                                //     upColor: 'green',
                                //     downColor: 'red',
                                //     style: 'line',
                                //     thickness: '2.0',
                                // },

                            ],
                        },
                      
                      
                    ],
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.RIGHT},
                    // yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                },
                // {
                //     layerNumber: 2,
                //     title: 'Pane 1 Layer 2',
                //     idLabel: 'layer-2',
                //     xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                //     yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.LEFT},
                //     showGridlines: false,
                //     upperRangeLimit: 100,
                //     lowerRangeLimit: 0,
                //     series: [
                //         {
                //             title: `Series 1 - ${Indicator.RSI}`,
                //             idLabel: `${PlotName.RSI}-14`,
                //             seriesName: SeriesName.RSI,
                //             seriesLabel: SeriesLabel.RSI,
                //             params: [
                //                 {name: SeriesParam.PERIOD, value: 14},
                //             ],
                //             plots: [
                //                 {
                //                     plotType: PlotType.LINE,
                //                     plotName: PlotName.RSI,
                //                     idLabel: '',    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                //                     param: {name: SeriesParam.PERIOD, value: 14},
                //                     target: `${PlotName.RSI}-14`, // column name created by data calculator
                //                     color: 'red',
                //                     upColor: 'green',
                //                     downColor: 'red',
                //                     style: 'line',
                //                     thickness: '2.0',
                //                 },
                //             ],
                //         },
                //     ]
                // },
            ],
        },
        {
            title: 'Pane 2',
            idLabel: 'pane-2',
            description: 'Stochastic', 
            paneType: PaneType.INDICATOR,
            paneNumber: 2,
            // export interface PaneLayerConfig {
            //     series: PlotSeries[];
            //     title?: string;
            //     idLabel?: string;
            //     options?: {};
            //     xAxisConfig?: AxisConfig;
            //     yAxisConfig?: AxisConfig;
            //     upperRangeLimit?: number;
            //     lowerRangeLimit?: number;
            //     hasZeroLine?: boolean;
            //     upperLineLevel?: number;
            //     lowerLineLevel?: number;
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Pane 2 Layer 1',
                    idLabel: 'layer-1',
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                    showGridlines: true,
                    upperRangeLimit: 100,
                    lowerRangeLimit: 0,
                    upperLineLevel: 80,
                    lowerLineLevel: 20,
                    hasZeroLine: false,
                    series: [
                        // export interface PlotSeries {
                        //     title: string;
                        //     idLabel: string;
                        //     seriesName: SeriesName;
                        //     params?: Param[];
                        //     plots: PlotConfig[];
                        // }
                        // {
                        //     title: `Series 1 - ${Indicator.RSI}`,
                        //     idLabel: `${PlotName.RSI}-14`,
                        //     seriesName: SeriesName.RSI,
                        //     seriesLabel: SeriesLabel.RSI,
                        //     params: [
                        //         {name: SeriesParam.PERIOD, value: 14},
                        //     ],
                        //     plots: [
                        //         // export interface PlotConfig {
                        //             // plotType: PlotType;
                        //             // plotName: PlotName;
                        //             // idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                        //             // param?: Param;
                        //             // target: string; // column name created by data calculator
                        //             // color?: string;
                        //             // upColor?: string;
                        //             // downColor?: string;
                        //             // style?: string;
                        //             // thickness?: string;
                        //         {
                        //             plotType: PlotType.LINE,
                        //             plotName: PlotName.RSI,
                        //             idLabel: '',    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                        //             param: {name: SeriesParam.PERIOD, value: 14},
                        //             target: `${PlotName.RSI}-14`, // column name created by data calculator
                        //             color: 'yellow',
                        //             upColor: 'green',
                        //             downColor: 'red',
                        //             style: 'line',
                        //             thickness: '2.0',
                        //         },
                        //     ],
                        // },
                        {
                            title: `Series 2 - ${Indicator.STOCHASTIC}`,
                            idLabel: `${SeriesName.STOCHASTIC}-14-5`,
                            seriesName: SeriesName.STOCHASTIC,
                            seriesLabel: SeriesLabel.STOCHASTIC,
                            params: [
                                {name: SeriesParam.K, value: 14},
                                {name: SeriesParam.D, value: 5},
                            ],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.STOCH_K,
                                    idLabel: '',    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                                    param: {name: SeriesParam.K, value: 14},
                                    target: `${PlotName.STOCH_K}-14-5`, // column name created by data calculator
                                    color: 'rgb(36, 164, 204)',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.STOCH_D,
                                    idLabel: '',    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                                    param: {name: SeriesParam.D, value: 5},
                                    target: `${PlotName.STOCH_D}-14-5`, // column name created by data calculator
                                    color: 'red',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                            ],
                        },
                    ],
                },
                
            ],
            
        },
        {
            title: 'Pane 3',
            idLabel: 'pane-3',
            description: 'MACD', 
            paneType: PaneType.INDICATOR,
            paneNumber: 3,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Pane 3 Layer 1',
                    idLabel: 'layer-1',
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                    showGridlines: true,
                    upperLineLevel: 0,
                    lowerLineLevel: 0,
                    hasZeroLine: true,
                    series: [
                        {
                            title: `Series 1 - ${Indicator.MACD}`,
                            idLabel: `${SeriesName.MACD}-12-26-5`,
                            seriesName: SeriesName.MACD,
                            seriesLabel: SeriesLabel.MACD,
                            minExtentsTarget: `${PlotName.MACD_MACD}-12-26-5`,
                            maxExtentsTarget: `${PlotName.MACD_MACD}-12-26-5`,
                            params: [
                                {name: SeriesParam.FAST, value: 12},
                                {name: SeriesParam.SLOW, value: 26},
                                {name: SeriesParam.SIGNAL, value: 5},
                            ],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.MACD_MACD,
                                    idLabel: '',    
                                    target: `${PlotName.MACD_MACD}-12-26-5`,
                                    color: 'rgb(36, 164, 204)',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.MACD_SIGNAL,
                                    idLabel: '',
                                    target: `${PlotName.MACD_SIGNAL}-12-26-5`,
                                    color: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                {
                                    plotType: PlotType.BAR,
                                    plotName: PlotName.MACD_DIVERGENCE,
                                    idLabel: '',
                                    target: `${PlotName.MACD_DIVERGENCE}-12-26-5`,
                                    color: 'white',
                                    upColor: 'rgb(36, 164, 204)',
                                    downColor: 'red',
                                    style: 'bar',
                                    thickness: '2.0',
                                },
                            ],
                        },
                        
                    ],
                },
                
            ],
            
        },
        {
            title: 'Pane 4',
            idLabel: 'pane-4',
            description: 'RSI', 
            paneType: PaneType.INDICATOR,
            paneNumber: 4,
            layerConfigs: [
                // put a layer with RSI as the series here
                {
                    layerNumber: 1,
                    title: 'Pane 4 Layer 1',
                    idLabel: 'layer-1',
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                    showGridlines: true,
                    upperRangeLimit: 100,
                    lowerRangeLimit: 0,
                    upperLineLevel: 70,
                    lowerLineLevel: 30,
                    hasZeroLine: false,
                    series: [
                        {
                            title: `Series 1 - ${Indicator.RSI}`,
                            idLabel: `${PlotName.RSI}-14`,
                            seriesName: SeriesName.RSI,
                            seriesLabel: SeriesLabel.RSI,
                            params: [
                                {name: SeriesParam.PERIOD, value: 14},
                            ],
                            plots: [
                                // export interface PlotConfig {
                                    // plotType: PlotType;
                                    // plotName: PlotName;
                                    // idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                                    // param?: Param;
                                    // target: string; // column name created by data calculator
                                    // color?: string;
                                    // upColor?: string;
                                    // downColor?: string;
                                    // style?: string;
                                    // thickness?: string;
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.RSI,
                                    idLabel: '',    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                                    param: {name: SeriesParam.PERIOD, value: 14},
                                    target: `${PlotName.RSI}-14`, // column name created by data calculator
                                    color: 'yellow',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                            ],
                        },

                    ],
                }
            ],
        },
    ],
};

export const ALL_INDICATORS_LAYER_CONFIGS: ChartPanelConfig = {
    panes: [
        {
            title: 'Pane with configs for all indicators - use this as source',
            idLabel: 'pane-1-source',
            description: 'source', 
            paneType: PaneType.CHART,
            paneNumber: 1,
            layerConfigs: [
                // export interface PaneLayerConfig {
                //     series: PlotSeries[];
                //     title?: string;
                //     idLabel?: string;
                //     options?: {};
                //     xAxisConfig?: AxisConfig;
                //     yAxisConfig?: AxisConfig;
                //     upperRangeLimit?: number;
                //     lowerRangeLimit?: number;
                //     hasZeroLine?: boolean;
                //     upperLineLevel?: number;
                //     lowerLineLevel?: number;
                {
                    layerNumber: 1,
                    title: 'Layer 1 close ema sma bb',
                    idLabel: 'pane-1-layer-1',
                    series: [
                        // export interface PlotSeries {
                        //     title: string;
                        //     idLabel: string;
                        //     seriesName: SeriesName;
                        //     params?: Param[];
                        //     plots: PlotConfig[];
                        // }
                        {
                            title: 'close',
                            seriesName: SeriesName.CLOSE,
                            seriesLabel: SeriesLabel.CLOSE,
                            idLabel: PlotName.CLOSE,
                            // export interface PlotConfig {
                            //     plotType: PlotType;
                            //     plotName: PlotName;
                            //     idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                            //     // plotName: PlotName2;
                            //     param?: Param;
                            //     target: string; // column name created by data calculator
                            //     color?: string;
                            //     upColor?: string;
                            //     downColor?: string;
                            //     style?: string;
                            //     thickness?: string;
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.CLOSE,
                                    idLabel: PlotName.CLOSE,
                                    target: PlotName.CLOSE,
                                    color: 'yellow',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                },
                            ],
                        },
                        {
                            title: 'Pane 1 Layer 1 ema 9',
                            seriesName: SeriesName.EMA,
                            seriesLabel: SeriesLabel.EMA,
                            idLabel: PlotName.EMA,
                            params: [
                                // export interface Param {
                                //     idLabel?: string;   // used as g element id in html.  do not use as column header for generating line series.  
                                //     name: SeriesParam;
                                //     value: number;
                                // }
                                {idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 9},
                            ],

                            // export interface PlotConfig {
                            //     plotType: PlotType;
                            //     plotName: PlotName;
                            //     idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                            //     // plotName: PlotName2;
                            //     target: string; // column name created by data calculator
                            //     color?: string;
                            //     upColor?: string;
                            //     downColor?: string;
                            //     style?: string;
                            //     thickness?: string;
                            //     upperRangeLimit?: number;
                            //     lowerRangeLimit?: number;
                            //     hasZeroLine?: boolean;
                            //     upperLineLevel?: number;
                                // lowerLineLevel?: number;
                            
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.EMA,
                                    idLabel: `${PlotName.EMA}-9-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 9},
                                    target: PlotName.CLOSE,
                                    color: 'blue',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        {
                            title: 'Pane 1 Layer 1 sma 20',
                            seriesName: SeriesName.SMA,
                            seriesLabel: SeriesLabel.SMA,
                            idLabel: PlotName.SMA,
                            params: [{idLabel: PlotName.SMA, name: SeriesParam.PERIOD, value: 20}],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.SMA,
                                    idLabel: `${PlotName.SMA}-20-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: PlotName.CLOSE,
                                    color: 'red',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        {
                            title: 'Pane 1 Layer 1 bb 20 2',
                            seriesName: SeriesName.BOLLINGER_BANDS,
                            seriesLabel: SeriesLabel.BOLLINGER_BANDS,
                            idLabel: `${SeriesName.BOLLINGER_BANDS}-20-2`,
                            params: [
                                {name: SeriesParam.PERIOD, value: 20},
                                {name: SeriesParam.MULTIPLIER, value: 2},
                            ],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.BB_UPPER,
                                    idLabel: `${PlotName.BB_UPPER}-20-2-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: PlotName.CLOSE,
                                    color: 'green',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.BB_LOWER,
                                    idLabel: `${PlotName.BB_LOWER}-20-2-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: PlotName.CLOSE,
                                    color: 'green',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                      
                    ],
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.RIGHT},
                },
            ],
        },
    ],
};

export const TWO_PANE_LAYER_PANEL_CONFIG: ChartPanelConfig = {
    panes: [
        {
            title: 'Pane 1',
            idLabel: 'pane-1-',
            description: 'Hey it\'s the big one with all the squiggly lines...', 
            paneType: PaneType.CHART,
            paneNumber: 1,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'pane-1-layer-1',
                    series: [
                        {
                            title: 'close',
                            seriesName: SeriesName.CLOSE,
                            seriesLabel: SeriesLabel.CLOSE,
                            idLabel: PlotName.CLOSE,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.CLOSE,
                                    idLabel: PlotName.CLOSE,
                                    target: PlotName.CLOSE,
                                    color: 'yellow',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                },
                            ],
                        },
                        {
                            title: 'Pane 1 Layer 1 ema 9',
                            seriesName: SeriesName.EMA,
                            seriesLabel: SeriesLabel.EMA,
                            idLabel: PlotName.EMA,
                            params: [{idLabel: PlotName.EMA, name: SeriesParam.PERIOD, value: 9}],
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.EMA,
                                    idLabel: `${PlotName.EMA}-9-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 9},
                                    target: PlotName.CLOSE,
                                    color: 'blue',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        {
                            title: 'Pane 1 Layer 1 sma 20',
                            seriesName: SeriesName.SMA,
                            seriesLabel: SeriesLabel.SMA,
                            idLabel: PlotName.SMA,
                            params: [{idLabel: PlotName.SMA, name: SeriesParam.PERIOD, value: 20}],

                            // export interface PlotConfig {
                            //     plotType: PlotType;
                            //     plotName: PlotName;
                            //     idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                            //     // plotName: PlotName2;
                            //     target: string; // column name created by data calculator
                            //     color?: string;
                            //     upColor?: string;
                            //     downColor?: string;
                            //     style?: string;
                            //     thickness?: string;
                            //     upperRangeLimit?: number;
                            //     lowerRangeLimit?: number;
                            //     hasZeroLine?: boolean;
                            //     upperLineLevel?: number;
                                // lowerLineLevel?: number;
                            
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.SMA,
                                    idLabel: `${PlotName.SMA}-20-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 20},
                                    target: PlotName.CLOSE,
                                    color: 'red',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                        {
                            title: 'Pane 1 Layer 1 sma 50',
                            seriesName: SeriesName.SMA,
                            seriesLabel: SeriesLabel.SMA,
                            idLabel: PlotName.SMA,
                            params: [{idLabel: PlotName.SMA, name: SeriesParam.PERIOD, value: 50}],

                            // export interface PlotConfig {
                            //     plotType: PlotType;
                            //     plotName: PlotName;
                            //     idLabel: string;    // output of concatenating labels for pane-layer-params?-series-source-plotName-plotType
                            //     // plotName: PlotName2;
                            //     target: string; // column name created by data calculator
                            //     color?: string;
                            //     upColor?: string;
                            //     downColor?: string;
                            //     style?: string;
                            //     thickness?: string;
                            //     upperRangeLimit?: number;
                            //     lowerRangeLimit?: number;
                            //     hasZeroLine?: boolean;
                            //     upperLineLevel?: number;
                                // lowerLineLevel?: number;
                            
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.SMA,
                                    idLabel: `${PlotName.SMA}-50-${PlotType.LINE}`,
                                    param: {name: SeriesParam.PERIOD, value: 50},
                                    target: PlotName.CLOSE,
                                    color: 'green',
                                    upColor: 'green',
                                    downColor: 'red',
                                    style: 'line',
                                    thickness: '2.0',
                                },

                            ],
                        },
                      
                    ],
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.RIGHT},
                    // series: [SeriesName.CLOSE, SeriesName.EMA],
                },
            ],
        },
    ],
};

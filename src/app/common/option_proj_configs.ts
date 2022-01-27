import { ChartPanelConfig, PlotType, PaneType,  PlotName,  ScaleLocation, ScaleType, SeriesLabel, SeriesName, SeriesParam, Indicator} from "./interfaces_chart";

export const OPTION_DATA_SET_RENDER_CONFIG: ChartPanelConfig = {
    panes: [
        {
            title: 'Pane 1',
            idLabel: 'pane-1',
            description: 'Option projection data set', 
            paneType: PaneType.CHART,
            paneNumber: 1,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'layer-1',
                    showGridlines: true,
                    // showGridlines: false,
                    extentsConfig: {
                        xScaleType: ScaleType.LINEAR,
                        xMinTarget: 'index',
                        xMaxTarget: 'index',
                        yScaleType: ScaleType.LINEAR,
                        yMinTarget: SeriesLabel.PUT_PRICE,
                        yMaxTarget: SeriesLabel.LONG_STRADDLE,
                    },
                    series: [
                        {
                            title: 'Call price',
                            seriesName: SeriesName.CALL_PRICE,
                            seriesLabel: SeriesLabel.CALL_PRICE,
                            idLabel: PlotName.CALL_PRICE,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.CALL_PRICE,
                                    idLabel: PlotName.CALL_PRICE,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.CALL_PRICE,
                                    color: 'blue',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                        {
                            title: 'Put price',
                            seriesName: SeriesName.PUT_PRICE,
                            seriesLabel: SeriesLabel.PUT_PRICE,
                            idLabel: PlotName.PUT_PRICE,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.PUT_PRICE,
                                    idLabel: PlotName.PUT_PRICE,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.PUT_PRICE,
                                    color: 'red',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                        {
                            title: 'Long straddle',
                            seriesName: SeriesName.LONG_STRADDLE,
                            seriesLabel: SeriesLabel.LONG_STRADDLE,
                            idLabel: SeriesLabel.LONG_STRADDLE,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.LONG_STRADDLE,
                                    idLabel: PlotName.LONG_STRADDLE,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.LONG_STRADDLE,
                                    color: 'green',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                      
                    ],
                    xAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                },
                
            ],
        },
        {
            title: 'Pane 2',
            idLabel: 'pane-2',
            description: 'Option projection data set', 
            paneType: PaneType.INDICATOR,
            paneNumber: 2,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'layer-1',
                    showGridlines: true,
                    // showGridlines: false,
                    upperRangeLimit: 1,
                    lowerRangeLimit: 0.5,
                    extentsConfig: {
                        xScaleType: ScaleType.LINEAR,
                        xMinTarget: 'index',
                        xMaxTarget: 'index',
                        yScaleType: ScaleType.LINEAR,
                        yMinTarget: SeriesLabel.CALL_DELTA,
                        yMaxTarget: SeriesLabel.CALL_DELTA,
                    },
                    series: [
                        {
                            title: 'Call delta',
                            seriesName: SeriesName.CALL_DELTA,
                            seriesLabel: SeriesLabel.CALL_DELTA,
                            idLabel: PlotName.CALL_DELTA,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.CALL_DELTA,
                                    idLabel: PlotName.CALL_DELTA,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.CALL_DELTA,
                                    color: 'blue',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                    ],
                    xAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                },
                {
                    layerNumber: 2,
                    title: 'Layer 2',
                    idLabel: 'layer-2',
                    // showGridlines: true,
                    // showGridlines: false,
                    upperRangeLimit: -0.1,
                    lowerRangeLimit: -0.6,
                    extentsConfig: {
                        xScaleType: ScaleType.LINEAR,
                        xMinTarget: 'index',
                        xMaxTarget: 'index',
                        yScaleType: ScaleType.LINEAR,
                        yMinTarget: SeriesLabel.PUT_DELTA,
                        yMaxTarget: SeriesLabel.PUT_DELTA,
                    },
                    series: [
                        {
                            title: 'Put delta',
                            seriesName: SeriesName.PUT_DELTA,
                            seriesLabel: SeriesLabel.PUT_DELTA,
                            idLabel: PlotName.PUT_DELTA,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.PUT_DELTA,
                                    idLabel: PlotName.PUT_DELTA,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.PUT_DELTA,
                                    color: 'red',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                    ],
                    xAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.TOP},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.LEFT},
                },
                
            ],
        },
        {
            title: 'Pane 3',
            idLabel: 'pane-3',
            description: 'Option projection data set', 
            paneType: PaneType.INDICATOR,
            paneNumber: 3,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'layer-1',
                    showGridlines: true,
                    // showGridlines: false,
                    extentsConfig: {
                        xScaleType: ScaleType.LINEAR,
                        xMinTarget: 'index',
                        xMaxTarget: 'index',
                        yScaleType: ScaleType.LINEAR,
                        yMinTarget: SeriesLabel.PUT_THETA,
                        yMaxTarget: SeriesLabel.CALL_THETA,
                    },
                    series: [
                        {
                            title: 'Call THETA',
                            seriesName: SeriesName.CALL_THETA,
                            seriesLabel: SeriesLabel.CALL_THETA,
                            idLabel: PlotName.CALL_THETA,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.CALL_THETA,
                                    idLabel: PlotName.CALL_THETA,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.CALL_THETA,
                                    color: 'blue',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                        {
                            title: 'Put THETA',
                            seriesName: SeriesName.PUT_THETA,
                            seriesLabel: SeriesLabel.PUT_THETA,
                            idLabel: PlotName.PUT_THETA,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.PUT_THETA,
                                    idLabel: PlotName.PUT_THETA,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.PUT_THETA,
                                    color: 'red',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                       
                      
                    ],
                    xAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                },
                
            ],
        },
        {
            title: 'Pane 4',
            idLabel: 'pane-4',
            description: 'Option projection data set', 
            paneType: PaneType.INDICATOR,
            paneNumber: 4,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'layer-1',
                    showGridlines: true,
                    // showGridlines: false,
                    extentsConfig: {
                        xScaleType: ScaleType.LINEAR,
                        xMinTarget: 'index',
                        xMaxTarget: 'index',
                        yScaleType: ScaleType.LINEAR,
                        yMinTarget: SeriesLabel.GAMMA,
                        yMaxTarget: SeriesLabel.GAMMA,
                    },
                    series: [
                        {
                            title: 'Gamma',
                            seriesName: SeriesName.GAMMA,
                            seriesLabel: SeriesLabel.GAMMA,
                            idLabel: PlotName.GAMMA,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.GAMMA,
                                    idLabel: PlotName.GAMMA,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.GAMMA,
                                    color: 'blue',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                        
                    ],
                    xAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                },
                
            ],
        },
        {
            title: 'Pane 5',
            idLabel: 'pane-5',
            description: 'Option projection data set', 
            paneType: PaneType.INDICATOR,
            paneNumber: 5,
            layerConfigs: [
                {
                    layerNumber: 1,
                    title: 'Layer 1',
                    idLabel: 'layer-1',
                    showGridlines: true,
                    // showGridlines: false,
                    extentsConfig: {
                        xScaleType: ScaleType.LINEAR,
                        xMinTarget: 'index',
                        xMaxTarget: 'index',
                        yScaleType: ScaleType.LINEAR,
                        yMinTarget: SeriesLabel.VEGA,
                        yMaxTarget: SeriesLabel.VEGA,
                    },
                    series: [
                        {
                            title: 'Vega',
                            seriesName: SeriesName.VEGA,
                            seriesLabel: SeriesLabel.VEGA,
                            idLabel: PlotName.VEGA,
                            plots: [
                                {
                                    plotType: PlotType.LINE,
                                    plotName: PlotName.VEGA,
                                    idLabel: PlotName.VEGA,
                                    xTarget: PlotName.INDEX,
                                    yTarget: SeriesLabel.VEGA,
                                    color: 'red',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                   
                                },
                            ],
                        },
                    ],
                    xAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                },
                
            ],
        },
    ],
}
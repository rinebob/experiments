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
                                    target: SeriesLabel.CALL_PRICE,
                                    color: 'yellow',
                                    upColor: 'blue',
                                    downColor: 'blue',
                                    style: 'line',
                                    thickness: '2.5',
                                },
                            ],
                        },
                      
                    ],
                    xAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.RIGHT},
                },
                
            ],
        },
    ],
}
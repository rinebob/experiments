import { ChartPanelConfig, ChartType, PaneType,  ScaleLocation, ScaleType, Series} from "./interfaces_chart";

export const SIMPLE_CHART_PANEL_CONFIG: ChartPanelConfig = {
    panes: [
        {
            title: 'Main chart pane', description: 'Hey it\'s the big one with all the squiggly lines...', 
            paneType: PaneType.CHART,
            paneNumber: 1,
            seriesConfigs: [
                {
                    seriesType: Series.PRICE,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.RIGHT},
                    displayConfig: {chartType: ChartType.LINE}
                },
            ]
        },
    ],
};

export const INITIAL_CHART_PANEL_CONFIG: ChartPanelConfig = {
    panes: [
        {
            title: 'Main chart pane', description: 'Hey it\'s the big one with all the squiggly lines...',
            paneType: PaneType.CHART,
            paneNumber: 1,
            seriesConfigs: [
                {
                    seriesType: Series.PRICE,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.RIGHT},
                    displayConfig: {chartType: ChartType.LINE}
                },
                {
                    seriesType: Series.VOLUME,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.LEFT},
                    displayConfig: {chartType: ChartType.BAR}
                },
                {
                    seriesType: Series.SMA,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                    yAxisConfig: {type: ScaleType.LOG, location: ScaleLocation.NONE},
                    displayConfig: {chartType: ChartType.LINE}
                },
            ]
        },
        {
            title: 'Indicator pane one', description: 'Hey just what it says dude, indicator pane one...',
            paneType: PaneType.INDICATOR,
            paneNumber: 2,
            seriesConfigs: [
                {
                    seriesType: Series.MACD,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                    displayConfig: {chartType: ChartType.LINE}
                },
                {
                    seriesType: Series.RSI,
                    // xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.LEFT},
                    displayConfig: {chartType: ChartType.CANDLESTICK}
                },
                
            ]
        },
        {
            title: 'Indicator pane two', description: 'Jeez this again dude?? wtf it\'s indicator pane two!',
            paneType: PaneType.INDICATOR,
            paneNumber: 3,
            seriesConfigs: [
                {
                    seriesType: Series.STOCHASTIC,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                    displayConfig: {chartType: ChartType.BAR}
                },
                {
                    seriesType: Series.EMA,
                    // xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.LEFT},
                    displayConfig: {chartType: ChartType.LINE}
                },
                
            ]
        },
        {
            title: 'Indicator pane three', description: 'Indicator pane three dude...',
            paneType: PaneType.INDICATOR,
            paneNumber: 4,
            seriesConfigs: [
                {
                    seriesType: Series.STOCHASTIC,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                    displayConfig: {chartType: ChartType.BAR}
                },
                {
                    seriesType: Series.EMA,
                    // xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.LEFT},
                    displayConfig: {chartType: ChartType.LINE}
                },
                
            ]
        },
        {
            title: 'Indicator pane four', description: 'Indicator pane four dude...',
            paneType: PaneType.INDICATOR,
            paneNumber: 5,
            seriesConfigs: [
                {
                    seriesType: Series.STOCHASTIC,
                    xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.BOTTOM},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.RIGHT},
                    displayConfig: {chartType: ChartType.BAR}
                },
                {
                    seriesType: Series.EMA,
                    // xAxisConfig: {type: ScaleType.DATE, location: ScaleLocation.NONE},
                    yAxisConfig: {type: ScaleType.LINEAR, location: ScaleLocation.LEFT},
                    displayConfig: {chartType: ChartType.LINE}
                },
                
            ]
        },
    ],
};

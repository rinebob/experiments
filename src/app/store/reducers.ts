import { Action, createReducer, on } from '@ngrx/store';
import { Equity, OHLCData } from '../common/interfaces';
import { ChartSetting, SymbolTimeSetting } from '../common/interfaces_chart';
import { Option } from '../common/option_interfaces';
import { BaseSetting } from '../services/av/av_interfaces';
import * as actions from '../store/actions';
import { DEFAULT_EQUITY, DEFAULT_EQUITY_SYMBOL, DEFAULT_OPTION, DEFAULT_OPTION_SYMBOL, DEFAULT_CHART_SETTING, DEFAULT_SYMBOL_TIME_SETTING, DEFAULT_AV_BASE_DATA_SETTING } from '../common/constants';



export interface AppState {
    equity: Equity;
    option: Option;
    chartSetting: ChartSetting;
    symbolTimeSetting: SymbolTimeSetting;
    avBaseSetting: BaseSetting;
    equityData: OHLCData[];
}

export const initialState: AppState = {
    equity: DEFAULT_EQUITY,
    option: DEFAULT_OPTION,
    chartSetting: DEFAULT_CHART_SETTING,
    symbolTimeSetting: DEFAULT_SYMBOL_TIME_SETTING,
    avBaseSetting: DEFAULT_AV_BASE_DATA_SETTING,
    equityData: [],
}

const onSetEquity = on(actions.setEquity, (state: AppState,  {equity}) => {
    console.log('r onSetEquity. equity: ', equity);
    return  {
        ...state,
        equity
    }
});

const onSetEquityData = on(actions.setEquityData, (state: AppState,  {equityData}) => {
    // console.log('r onSetEquityData. equityData: ', equityData);
    return  {
        ...state,
        equityData
    }
});

const onSetOption = on(actions.setOption, (state: AppState,  {option}) => {
    console.log('r onSetOption. option: ', option);
    return  {
        ...state,
        option
    }
});

const onSetChartSetting = on(actions.setChartSetting, (state: AppState,  {chartSetting}) => {
    console.log('r onSetChartSetting. chartSetting: ', chartSetting);
    return  {
        ...state,
        chartSetting
    }
});

const onSetSymbolTimeSetting = on(actions.setSymbolTimeSetting, (state: AppState,  {symbolTimeSetting}) => {
    console.log('r onSetSymbolTimeSetting. symbolTimeSetting: ', symbolTimeSetting);
    return  {
        ...state,
        symbolTimeSetting: symbolTimeSetting
    }
});

const onSetAvBaseSetting = on(actions.setAvBaseSetting, (state: AppState,  {baseSetting}) => {
    console.log('r onSetAvBaseSetting. baseSetting: ', baseSetting);
    return  {
        ...state,
        avBaseSetting: baseSetting
    }
});

export const appReducer = createReducer(
    initialState,
    onSetEquity,
    onSetEquityData,
    onSetOption,
    onSetChartSetting,
    onSetSymbolTimeSetting,
    onSetAvBaseSetting,
    
);
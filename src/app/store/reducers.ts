import { Action, createReducer, on } from '@ngrx/store';
import { Equity } from '../common/interfaces';
import { ChartSetting, SymbolTimeSetting } from '../common/interfaces_chart';
import { Option } from '../common/option_interfaces';
import { BaseSetting } from '../services/av/av_interfaces';
import * as actions from '../store/actions';
import { DEFAULT_EQUITY, DEFAULT_EQUITY_SYMBOL, DEFAULT_OPTION, DEFAULT_OPTION_SYMBOL, DEFAULT_CHART_SETTING, DEFAULT_SYMBOL_TIME_SETTING, DEFAULT_AV_BASE_DATA_SETTING } from '../common/constants';



export interface AppState {
    equity: Equity;
    option: Option;
    chartSetting: ChartSetting;
    dataSetting: SymbolTimeSetting;
    avDataSetting: BaseSetting;
}

export const initialState: AppState = {
    equity: DEFAULT_EQUITY,
    option: DEFAULT_OPTION,
    chartSetting: DEFAULT_CHART_SETTING,
    dataSetting: DEFAULT_SYMBOL_TIME_SETTING,
    avDataSetting: DEFAULT_AV_BASE_DATA_SETTING,
}

const onSetEquity = on(actions.setEquity, (state: AppState,  {equity}) => {
    console.log('r onSetEquity. equity: ', equity);
    return  {
        ...state,
        equity
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

const onSetDataSetting = on(actions.setDataSetting, (state: AppState,  {symbolTimeSetting}) => {
    console.log('r onSetDataSetting. dataSetting: ', symbolTimeSetting);
    return  {
        ...state,
        dataSetting: symbolTimeSetting
    }
});

const onSetAvDataSetting = on(actions.setAvDataSetting, (state: AppState,  {baseSetting}) => {
    console.log('r onSetAvDataSetting. avDataSetting: ', baseSetting);
    return  {
        ...state,
        avDataSetting: baseSetting
    }
});

export const appReducer = createReducer(
    initialState,
    onSetEquity,
    onSetOption,
    onSetChartSetting,
    onSetDataSetting,
    onSetAvDataSetting,
    
);
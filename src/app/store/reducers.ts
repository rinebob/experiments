import { Action, createReducer, on } from '@ngrx/store';
import { Equity } from '../common/interfaces';
import { ChartSetting, SymbolTimeSetting } from '../common/interfaces_chart';
import { Option } from '../common/option_interfaces';
import { BaseSetting } from '../services/av/av_interfaces';
import * as actions from '../store/actions';
import { DEFAULT_EQUITY, DEFAULT_EQUITY_SYMBOL, DEFAULT_OPTION, DEFAULT_OPTION_SYMBOL, DEFAULT_CHART_SETTING, DEFAULT_SYMBOL_TIME_SETTING, DEFAULT_AV_BASE_DATA_SETTING } from '../common/constants';
import { state } from '@angular/animations';


export interface State {
    equity: Equity;
    option: Option;
    chartSetting: ChartSetting;
    dataSetting: SymbolTimeSetting;
    avDataSetting: BaseSetting;
}

export const initialState: State = {
    equity: DEFAULT_EQUITY,
    option: DEFAULT_OPTION,
    chartSetting: DEFAULT_CHART_SETTING,
    dataSetting: DEFAULT_SYMBOL_TIME_SETTING,
    avDataSetting: DEFAULT_AV_BASE_DATA_SETTING,
}

export const reducer = createReducer(
    initialState,
    on(actions.setEquity, 
        (state, {equity}) => ({
            ...state,
            equity
        })
    ),

    on(actions.setOption,
        (state, {option}) => ({
            ...state,
            option
        })
    ),

    on(actions.setChartSetting,
        (state, {chartSetting}) => ({
            ...state,
            chartSetting
        })
    ),

    on(actions.setDataSetting,
        (state, {symbolTimeSetting}) => ({
            ...state,
            dataSettings: symbolTimeSetting
        })
    ),

    on(actions.setAvDataSetting,
        (state, {baseSetting}) => ({
            ...state,
            avDataSettings: baseSetting

        })
    ),

);
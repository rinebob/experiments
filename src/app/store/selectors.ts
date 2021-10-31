import { createSelector } from "@ngrx/store";
import { State } from '../store/reducers';

export const selectEquity = (state: State) => state.equity;
export const selectOption = (state: State) => state.option;
export const selectChartSettings = (state: State) => state.chartSetting;
export const selectDataSettings = (state: State) => state.dataSetting;
export const selectAvDataSettings = (state: State) => state.avDataSetting;
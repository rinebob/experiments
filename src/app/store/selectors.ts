import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from '../store/reducers';

export const selectApp = createFeatureSelector<AppState>('app');

export const selectEquity = createSelector(
    selectApp,
    (app) =>  app.equity
);

export const selectEquityData = createSelector(
    selectApp,
    (app) =>  app.equityData
);

export const selectOption = createSelector(
    selectApp,
    (app) =>  app.option
);

export const selectChartSettings = createSelector(
    selectApp,
    (app) =>  app.chartSetting
);

export const selectSymbolTimeSettings = createSelector(
    selectApp,
    (app) =>  app.symbolTimeSetting
);

export const selectAvBaseSettings = createSelector(
    selectApp,
    (app) =>  app.avBaseSetting
);

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from '../store/reducers';

export const selectApp = createFeatureSelector<AppState>('app');

export const selectEquity = createSelector(
    selectApp,
    (app) =>  app.equity
);

export const selectOption = createSelector(
    selectApp,
    (app) =>  app.option
);

export const selectChartSettings = createSelector(
    selectApp,
    (app) =>  app.chartSetting
);

export const selectDataSettings = createSelector(
    selectApp,
    (app) =>  app.dataSetting
);

export const selectAvDataSettings = createSelector(
    selectApp,
    (app) =>  app.avDataSetting
);

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

// export const selectEquity = (state: AppState) => state.equity;
// export const selectOption = (state: AppState) => state.option;
// export const selectChartSettings = (state: AppState) => state.chartSetting;
// export const selectDataSettings = (state: AppState) => state.dataSetting;
// export const selectAvDataSettings = (state: AppState) => state.avDataSetting;
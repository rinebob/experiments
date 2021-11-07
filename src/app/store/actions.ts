
import { createAction, props } from '@ngrx/store';

import { Equity, OHLCData } from '../common/interfaces';
import { Option } from '../common/option_interfaces';
import { ChartSetting, SymbolTimeSetting } from '../common/interfaces_chart';
import { BaseSetting, DataSetting } from '../services/av/av_interfaces';

export const fetchEquityData = createAction(
    '[bCV ctor] Fetch Equity Data',
    props<{dataSetting: DataSetting}>()
);

export const fetchOptionData = createAction(
    '[Data service] Fetch Option Data',
    props<{option: Option}>()
);

export const setEquity = createAction(
    '[Chart setting] Set equity',
    props<{equity: Equity}>()
);

export const setEquityData = createAction(
    '[e onFetchEquityData] Set equity data',
    props<{equityData: OHLCData[]}>()
);

export const setOption = createAction(
    '[Chart setting] Set option', 
    props<{option: Option}>()
);

export const setChartSetting = createAction(
    '[Chart setting] Set chart settings', 
    props<{chartSetting: ChartSetting}>()
);

export const setSymbolTimeSetting = createAction(
    '[bCV updateDataSetting ] Set symbol time settings',
    props<{symbolTimeSetting: SymbolTimeSetting}>()
);

export const setAvBaseSetting = createAction(
    '[Av data setting] Set Av bata settings',
    props<{baseSetting: BaseSetting}>()
);

export const persistEquity = createAction(
    '[Effects] Persist equity ',
    props<{equity: Equity}>()
);

export const persistEquityData = createAction(
    '[Effects] Persist equity data ',
);

export const persistOption = createAction(
    '[Effects] Persist option ',
    props<{option: Option}>()
);

export const persistOptionData = createAction(
    '[Effects] Persist option data',
);
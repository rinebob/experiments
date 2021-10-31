
import { createAction, props } from '@ngrx/store';

import { Equity } from '../common/interfaces';
import { Option } from '../common/option_interfaces';
import { ChartSetting, SymbolTimeSetting } from '../common/interfaces_chart';
import { BaseSetting } from '../services/av/av_interfaces';

export const fetchEquityData = createAction(
    '[Data service] Fetch Equity Data',
    props<{equity: Equity}>()
);

export const fetchOptionData = createAction(
    '[Data service] Fetch Option Data',
    props<{option: Option}>()
);

export const setEquity = createAction(
    '[Chart setting] Set equity',
    props<{equity: Equity}>()
);

export const setOption = createAction(
    '[Chart setting] Set option', 
    props<{option: Option}>()
);

export const setChartSetting = createAction(
    '[Chart setting] Set chart settings', 
    props<{chartSetting: ChartSetting}>()
);

export const setDataSetting = createAction(
    '[Data setting] Set data settings',
    props<{symbolTimeSetting: SymbolTimeSetting}>()
);

export const setAvDataSetting = createAction(
    '[Av data setting] Set Av data settings',
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
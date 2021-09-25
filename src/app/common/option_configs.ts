

// from Visvol option_configs.ts.  Must keep insync


import {MoneynessUnit, OptionSpreadConfigBase, OptionLegBase } from "./option_interfaces";
import * as legs from '../common/option_legs';


// Option spread configuration objects.  These are generic specifications that
// are combined with an underlying stock, stock price and date to create a 
// tracking position for historical analysis

export const VERTICAL_CALL_DEBIT_SPREAD: OptionSpreadConfigBase = {
    name: 'Vertical call debit spread',
    legs: [
        legs.LONG_ONE_OTM_ONE_CALL,
        legs.SHORT_ONE_OTM_TWO_CALL
    ],
    strategyName: 'Vertical',
    direction: 'LONG',
    putCall: 'CALL',
}

export const VERTICAL_CALL_CREDIT_SPREAD: OptionSpreadConfigBase = {
    name: 'Vertical call credit spread',
    legs: [
        legs.SHORT_ONE_OTM_TWO_CALL,
        legs.LONG_ONE_OTM_THREE_CALL,
    ],
    strategyName: 'Vertical',
    direction: 'SHORT',
    putCall: 'CALL',
}

export const VERTICAL_PUT_DEBIT_SPREAD: OptionSpreadConfigBase = {
    name: 'Vertical put debit spread',
    legs: [
        legs.LONG_ONE_OTM_ONE_PUT,
        legs.SHORT_ONE_OTM_TWO_PUT,
    ],
    strategyName: 'Vertical',
    direction: 'LONG',
    putCall: 'PUT',
}

export const VERTICAL_PUT_CREDIT_SPREAD: OptionSpreadConfigBase = {
    name: 'Vertical put credit spread',
    legs: [
        legs.SHORT_ONE_OTM_TWO_PUT,
        legs.LONG_ONE_OTM_THREE_PUT,
    ],
    strategyName: 'Vertical',
    direction: 'SHORT',
    putCall: 'PUT',
}

export const ATM_LONG_STRADDLE: OptionSpreadConfigBase = {
    name: 'ATM long straddle',
    legs: [
        legs.LONG_ONE_ATM_CALL,
        legs.LONG_ONE_ATM_PUT,
    ],
    moneyness: MoneynessUnit.AT_THE_MONEY,
    strategyName: 'Straddle',
    direction: 'LONG',
}

export const TWENTY_DELTA_SHORT_STRANGLE: OptionSpreadConfigBase = {
    name: 'Twenty delta short strangle',
    legs: [
        legs.SHORT_ONE_OTM_THREE_CALL,
        legs.SHORT_ONE_OTM_THREE_PUT,
    ],
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    strategyName: 'Strangle',
    direction: 'SHORT',
}

export const IRON_CONDOR: OptionSpreadConfigBase = {
    name: 'Iron condor',
    legs: [
        legs.SHORT_ONE_OTM_TWO_CALL,
        legs.LONG_ONE_OTM_THREE_CALL,
        legs.SHORT_ONE_OTM_TWO_PUT,
        legs.LONG_ONE_OTM_THREE_PUT,
    ],
    strategyName: 'Iron condor',
    direction: 'SHORT',
}

export const ATM_CALL_CALENDAR_SPREAD: OptionSpreadConfigBase = {
    name: 'ATM call calendar spread',
    legs: [
        legs.SHORT_ONE_ATM_CALL,
        legs.LONG_ONE_ATM_CALL_LONG_EXP,
    ],
    strategyName: 'Calendar',
    direction: 'LONG',
    putCall: 'CALL',
}

export const ATM_PUT_CALENDAR_SPREAD: OptionSpreadConfigBase = {
    name: 'ATM put calendar spread',
    legs: [
        legs.SHORT_ONE_ATM_PUT,
        legs.LONG_ONE_ATM_PUT_LONG_EXP,
    ],
    strategyName: 'Calendar',
    direction: 'LONG',
    putCall: 'PUT',
}



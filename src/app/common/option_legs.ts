

// from Visvol option_configs.ts.  Must keep in sync


import {MoneynessUnit, OptionLegBase } from "./option_interfaces";

// Individual option legs that will be used to compose an
// option spread configuration

///////////////// LONG CALLS //////////////////////
export const LONG_ONE_ATM_CALL: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const LONG_ONE_ATM_CALL_LONG_EXP: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const LONG_ONE_OTM_ONE_CALL: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'CALL',
}

export const LONG_ONE_OTM_TWO_CALL: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'CALL',
}

export const LONG_ONE_OTM_THREE_CALL: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'CALL',
}

///////////////// SHORT CALLS //////////////////////

export const SHORT_ONE_ATM_CALL: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const SHORT_ONE_OTM_ONE_CALL: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'CALL',
}

export const SHORT_ONE_OTM_TWO_CALL: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'CALL',
}

export const SHORT_ONE_OTM_THREE_CALL: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'CALL',
}

///////////////// LONG PUTS //////////////////////

export const LONG_ONE_ATM_PUT: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const LONG_ONE_ATM_PUT_LONG_EXP: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const LONG_ONE_OTM_ONE_PUT: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'PUT',
}

export const LONG_ONE_OTM_TWO_PUT: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'PUT',
}

export const LONG_ONE_OTM_THREE_PUT: OptionLegBase = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'PUT',
}

///////////////// SHORT PUTS //////////////////////

export const SHORT_ONE_ATM_PUT: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const SHORT_ONE_OTM_ONE_PUT: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'PUT',
}

export const SHORT_ONE_OTM_TWO_PUT: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'PUT',
}

export const SHORT_ONE_OTM_THREE_PUT: OptionLegBase = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'PUT',
}


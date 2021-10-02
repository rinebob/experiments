

// from Visvol option_configs.ts.  Must keep in sync


import {MoneynessUnit, OptionLegBase } from "./option_interfaces";

// Individual option legs that will be used to compose an
// option spread configuration

///////////////// LONG CALLS //////////////////////
export const LONG_ONE_ATM_CALL: OptionLegBase = {
    name: 'Long one ATM Call',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const LONG_ONE_ATM_CALL_LONG_EXP: OptionLegBase = {
    name: 'Long one ATM Call - Long exp',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const LONG_ONE_OTM_ONE_CALL: OptionLegBase = {
    name: 'Long one OTM1 Call',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'CALL',
}

export const LONG_ONE_OTM_TWO_CALL: OptionLegBase = {
    name: 'Long one OTM2 Call',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'CALL',
}

export const LONG_ONE_OTM_THREE_CALL: OptionLegBase = {
    name: 'Long one OTM3 Call',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'CALL',
}

///////////////// SHORT CALLS //////////////////////

export const SHORT_ONE_ATM_CALL: OptionLegBase = {
    name: 'Short one ATM Call',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const SHORT_ONE_OTM_ONE_CALL: OptionLegBase = {
    name: 'Short one OTM1 Call',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'CALL',
}

export const SHORT_ONE_OTM_TWO_CALL: OptionLegBase = {
    name: 'Short one OTM2 Call',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'CALL',
}

export const SHORT_ONE_OTM_THREE_CALL: OptionLegBase = {
    name: 'Short one OTM3 Call',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'CALL',
}

///////////////// LONG PUTS //////////////////////

export const LONG_ONE_ATM_PUT: OptionLegBase = {
    name: 'Long one ATM Put',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const LONG_ONE_ATM_PUT_LONG_EXP: OptionLegBase = {
    name: 'Long one ATM Put - Long exp',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const LONG_ONE_OTM_ONE_PUT: OptionLegBase = {
    name: 'Long one OTM1 Put',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'PUT',
}

export const LONG_ONE_OTM_TWO_PUT: OptionLegBase = {
    name: 'Long one OTM2 Put',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'PUT',
}

export const LONG_ONE_OTM_THREE_PUT: OptionLegBase = {
    name: 'Long one OTM3 Put',
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'PUT',
}

///////////////// SHORT PUTS //////////////////////

export const SHORT_ONE_ATM_PUT: OptionLegBase = {
    name: 'Short one ATM Put',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const SHORT_ONE_OTM_ONE_PUT: OptionLegBase = {
    name: 'Short one OTM1 Put',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'PUT',
}

export const SHORT_ONE_OTM_TWO_PUT: OptionLegBase = {
    name: 'Short one OTM2 Put',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'PUT',
}

export const SHORT_ONE_OTM_THREE_PUT: OptionLegBase = {
    name: 'Short one OTM3 Put',
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'PUT',
}


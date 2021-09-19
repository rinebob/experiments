

// from Visvol option_configs.ts.  Must keep in sync


import {MoneynessUnit, OptionLeg } from "./option_interfaces";

// Individual option legs that will be used to compose an
// option spread configuration

///////////////// LONG CALLS //////////////////////
export const LONG_ONE_ATM_CALL: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const LONG_ONE_ATM_CALL_LONG_EXP: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const LONG_ONE_OTM_ONE_CALL: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'CALL',
}

export const LONG_ONE_OTM_TWO_CALL: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'CALL',
}

export const LONG_ONE_OTM_THREE_CALL: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'CALL',
}

///////////////// SHORT CALLS //////////////////////

export const SHORT_ONE_ATM_CALL: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'CALL',
}

export const SHORT_ONE_OTM_ONE_CALL: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'CALL',
}

export const SHORT_ONE_OTM_TWO_CALL: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'CALL',
}

export const SHORT_ONE_OTM_THREE_CALL: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'CALL',
}

///////////////// LONG PUTS //////////////////////

export const LONG_ONE_ATM_PUT: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const LONG_ONE_ATM_PUT_LONG_EXP: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const LONG_ONE_OTM_ONE_PUT: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'PUT',
}

export const LONG_ONE_OTM_TWO_PUT: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'PUT',
}

export const LONG_ONE_OTM_THREE_PUT: OptionLeg = {
    direction: 'LONG',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'PUT',
}

///////////////// SHORT PUTS //////////////////////

export const SHORT_ONE_ATM_PUT: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.AT_THE_MONEY,
    type: 'PUT',
}

export const SHORT_ONE_OTM_ONE_PUT: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_ONE,
    type: 'PUT',
}

export const SHORT_ONE_OTM_TWO_PUT: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_TWO,
    type: 'PUT',
}

export const SHORT_ONE_OTM_THREE_PUT: OptionLeg = {
    direction: 'SHORT',
    ratio: 1,
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    type: 'PUT',
}


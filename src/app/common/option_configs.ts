

// // from Visvol option_configs.ts.  Must keep insync


import {MoneynessUnit, OptionSpreadConfig, OptionLeg } from "./option_interfaces";
import * as legs from '../common/option_legs';


// Option spread configuration objects.  These are generic specifications that
// are combined with an underlying stock, stock price and date to create a 
// tracking position for historical analysis

export const VERTICAL_CALL_DEBIT_SPREAD: OptionSpreadConfig = {
    name: 'Vertical call debit spread',
    legs: [
        legs.LONG_ONE_OTM_ONE_CALL,
        legs.SHORT_ONE_OTM_TWO_CALL
    ],
    strategyName: 'Vertical',
    direction: 'LONG',
    putCall: 'CALL',
}

export const VERTICAL_CALL_CREDIT_SPREAD: OptionSpreadConfig = {
    name: 'Vertical call credit spread',
    legs: [
        legs.SHORT_ONE_OTM_TWO_CALL,
        legs.LONG_ONE_OTM_THREE_CALL,
    ],
    strategyName: 'Vertical',
    direction: 'SHORT',
    putCall: 'CALL',
}

export const VERTICAL_PUT_DEBIT_SPREAD: OptionSpreadConfig = {
    name: 'Vertical put debit spread',
    legs: [
        legs.LONG_ONE_OTM_ONE_PUT,
        legs.SHORT_ONE_OTM_TWO_PUT,
    ],
    strategyName: 'Vertical',
    direction: 'LONG',
    putCall: 'PUT',
}

export const VERTICAL_PUT_CREDIT_SPREAD: OptionSpreadConfig = {
    name: 'Vertical put credit spread',
    legs: [
        legs.SHORT_ONE_OTM_TWO_PUT,
        legs.LONG_ONE_OTM_THREE_PUT,
    ],
    strategyName: 'Vertical',
    direction: 'SHORT',
    putCall: 'PUT',
}

export const ATM_LONG_STRADDLE: OptionSpreadConfig = {
    name: 'ATM long straddle',
    legs: [
        legs.LONG_ONE_ATM_CALL,
        legs.LONG_ONE_ATM_PUT,
    ],
    moneyness: MoneynessUnit.AT_THE_MONEY,
    strategyName: 'Straddle',
    direction: 'LONG',
}

export const TWENTY_DELTA_SHORT_STRANGLE: OptionSpreadConfig = {
    name: 'Twenty delta short strangle',
    legs: [
        legs.SHORT_ONE_OTM_THREE_CALL,
        legs.SHORT_ONE_OTM_THREE_PUT,
    ],
    moneyness: MoneynessUnit.OUT_OF_THE_MONEY_THREE,
    strategyName: 'Strangle',
    direction: 'SHORT',
}

export const IRON_CONDOR: OptionSpreadConfig = {
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

export const ATM_CALL_CALENDAR_SPREAD: OptionSpreadConfig = {
    name: 'ATM call calendar spread',
    legs: [
        legs.SHORT_ONE_ATM_CALL,
        legs.LONG_ONE_ATM_CALL_LONG_EXP,
    ],
    strategyName: 'Calendar',
    direction: 'LONG',
    putCall: 'CALL',
}

export const ATM_PUT_CALENDAR_SPREAD: OptionSpreadConfig = {
    name: 'ATM put calendar spread',
    legs: [
        legs.SHORT_ONE_ATM_PUT,
        legs.LONG_ONE_ATM_PUT_LONG_EXP,
    ],
    strategyName: 'Calendar',
    direction: 'LONG',
    putCall: 'PUT',
}






// export const ATMCall: OptionLeg = {
//     type: 'CALL',
//     moneyness: 0,
// }

// export const OTM1Call: OptionLeg = {
//     type: 'CALL',
//     moneyness: .05, // 5% OTM
// }

// export const OTM2Call: SingleOptionLeg = {
//     type: 'CALL',
//     moneyness: .10, // 10% OTM
// }

// export const OTM3Call: SingleOptionLeg = {
//     type: 'CALL',
//     moneyness: .2, // 5% OTM
// }

// export const ATMPut: SingleOptionLeg = {
//     type: 'PUT',
//     moneyness: 0,
// }

// export const OTM1Put: SingleOptionLeg = {
//     type: 'PUT',
//     moneyness: 0.05,
// }

// export const OTM2Put: SingleOptionLeg = {
//     type: 'PUT',
//     moneyness: 0.10,
// }

// export const OTM3Put: SingleOptionLeg = {
//     type: 'PUT',
//     moneyness: 0.20,
// }

// export const LongAtmCall: OptionConfigLeg = {
//     leg: ATMCall,
//     direction: 'LONG',
// }

// export const ShortAtmCall: OptionConfigLeg = {
//     leg: ATMCall,
//     direction: 'SHORT',
// }




// export const VerticalCallSpread: OptionPositionConfig = {
//     leg1: 
// }
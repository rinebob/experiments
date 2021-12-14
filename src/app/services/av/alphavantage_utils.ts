import { OHLCData, OHLC_INITIALIZER} from '../../common/interfaces';
import {DataSetting, FullSetting} from '../av/av_interfaces';
import { TimeFrame } from '../../common/interfaces_chart';
import {IntradayChartData } from './av_interfaces';


// Alphavantage API endpoint URL
import { Alphavantage_API_KEY } from 'src/secrets/secrets';
export const AV_URL = 'https://www.alphavantage.co'



// method to convert Alphavantage intraday data into VisVol specific intraday data series
export function convertAvToVz(data: any):OHLCData[] {
    console.log('aU cITGS input data: ', data);

    const dataKeys = Object.keys(data);
    // console.log('aU cITGS data keys: ', dataKeys);

    // Metadata extraction
    const metaData = data[dataKeys[0]];
    // console.log('aU meta data: ', metaData);
    
    // Time series extraction
    const timeSeries = data[dataKeys[1]];
    // console.log('aU cITGS time series: ', timeSeries);
    const timeSeriesArray = (Object.entries(timeSeries)).reverse();
    // console.log('aU cITGS timeSeriesArray: ', timeSeriesArray);

    // Metadata info extraction
    const info = metaData['1. Information'];
    // console.log('aU info: ', info);

    // Determine whether input data is daily or non-daily
    const daily = info.includes(TimeFrame.DAILY);
    // console.log('aU info contains daily: ', daily);
    
    if (daily) {
        // console.log('aU daily conversion');
        const dailyData: OHLCData[] = convertToDailyFormat(timeSeriesArray);
        // console.log('aU daily data: ', dailyData);

        return dailyData;
        
    } else {
        // console.log('aU non-daily conversion');
        const nonDailyData: OHLCData[] = convertToNonDailyFormat(timeSeriesArray);
        // console.log('aU non daily data: ', nonDailyData);

        return nonDailyData;
    }
}

function convertToDailyFormat(timeSeriesArray: any): OHLCData[] {
    // console.log('aU cTDF input timeSeries: ', timeSeriesArray);
    const dayOHLCData: OHLCData[] = [];
    timeSeriesArray.forEach(
        value => {
            // console.log('aU cITGS input value: ', value);
            const dataPoint: OHLCData = OHLC_INITIALIZER;
            dataPoint.date = new Date(value[0]);
            dataPoint.stringDate = value[0];
            dataPoint.open = Number(value[1]['1. open']);
            dataPoint.high = Number(value[1]['2. high']);
            dataPoint.low = Number(value[1]['3. low']);
            dataPoint.close = Number(value[1]['4. close']);
            dataPoint.adjustedClose = Number(value[1]['5. adjusted close']);
            dataPoint.volume = Number(value[1]['6. volume']);
            dataPoint.dividendAmount = Number(value[1]['7. dividend amount']);
            dataPoint.splitCoefficient = Number(value[1]['8. split coefficient']);

            dayOHLCData.push({...dataPoint});


            // console.log('aU cITGS dataPoint: ', dataPoint);
        }
    );

    return dayOHLCData;
}

function convertToNonDailyFormat(timeSeriesArray: any): OHLCData[] {
    // console.log('aU cTNDF input timeSeries: ', timeSeriesArray);
    const dayOHLCData: OHLCData[] = [];
    timeSeriesArray.forEach(
        value => {
            // console.log('aU cITGS input value: ', value);
            const dataPoint: OHLCData = OHLC_INITIALIZER;
            dataPoint.date = new Date(value[0]);
            dataPoint.stringDate = value[0];
            dataPoint.open = Number(value[1]['1. open']);
            dataPoint.high = Number(value[1]['2. high']);
            dataPoint.low = Number(value[1]['3. low']);
            dataPoint.close = Number(value[1]['4. close']);
            dataPoint.volume = Number(value[1]['6. volume']);
            
            dayOHLCData.push({...dataPoint});


            // console.log('aU cTNDF dataPoint: ', dataPoint);
        }
    );

    return dayOHLCData;
}


const intradayTimes = ['1min', '5min', '15min', '30min', '60min'];

function generateTimeType(timeFrame: string) {
    const timeType = 
        intradayTimes.includes(timeFrame) ? 'INTRADAY'
        : timeFrame === 'Daily' ? 'DAILY' 
        : timeFrame === 'Weekly' ? 'WEEKLY' 
        : 'MONTHLY';

    // console.log('aV gTT timeType: ', timeType);

    return timeType;
}

function generateFunctionString(req: DataSetting) {
    const timeType = generateTimeType(req.timeFrame);
    const func = `TIME_SERIES_${timeType}`;
    const slice = req.slice.split(' ').join('').toLowerCase();

    let funcString = '';
    if (timeType === 'INTRADAY') {
        funcString = slice === 'year1month1' ? func : `${func}_EXTENDED`;

    } else if (timeType === 'DAILY') { 
        funcString = req.adjusted ? `${func}_ADJUSTED` : func;
    }

    // console.log('aV gFS funcString: ', funcString);

    return funcString;
}

export function generateRequestString (req: DataSetting) {

    // console.log('aV cR input request: ', req);

    
    const funcString = generateFunctionString(req);
    const symbol = req.symbol;
    const interval = req.timeFrame;
    const slice = req.slice.split(' ').join('').toLowerCase();
    const extended = slice !== 'year1month1' ? '_EXTENDED' : '';
    const adjusted = req.adjusted === 'Adjusted' ? true : false;
    const outputSize = req.outputSize.toLowerCase(); 
    const dataType = req.dataType; 

    // console.log('av cR funcString: ', funcString);
    // console.log('av cR symbol: ', symbol);
    // console.log('av cR interval: ', interval);
    // console.log('av cR extended: ', extended);
    // console.log('av cR slice: ', slice);
    // console.log('av cR adjusted: ', adjusted);
    // console.log('av cR : outputSize', outputSize);
    // console.log('av cR : dataType', dataType);

    // let funcString = '';
    let reqString = '';

    // const requestInfo = {funcString, symbol, interval, extended, slice, adjusted, outputSize, dataType};

    const timeType = generateTimeType(req.timeFrame);

    switch(timeType) {
        case 'INTRADAY':
            if (slice === 'year1month1') {
                // console.log('aV gRS intraday');
                reqString = 
                    AV_URL + 
                    '/query?' + 
                    'function=' + generateFunctionString(req) + 
                    '&symbol=' + symbol + 
                    '&interval=' + interval + 
                    '&adjusted=' + adjusted +
                    '&outputsize=' + outputSize +
                    '&datatype=' + dataType + 
                    '&apikey=' + Alphavantage_API_KEY;
            } else {
                // console.log('aV gRS intraday extended');
                reqString = 
                    AV_URL + 
                    '/query?' + 
                    'function=' + generateFunctionString(req) + 
                    '&symbol=' + symbol + 
                    '&interval=' + interval + 
                    '&slice=' + slice +
                    '&adjusted=' + adjusted + 
                    '&apikey=' + Alphavantage_API_KEY;
            }
          
            break;
        case 'DAILY':
            // console.log('aV gRS daily');
            reqString = 
                AV_URL + 
                '/query?' + 
                'function=' + generateFunctionString(req) + 
                '&symbol=' + symbol + 
                '&outputsize=' + outputSize + 
                '&datatype=' + dataType + 
                '&apikey=' + Alphavantage_API_KEY;
          
            break;
        case 'WEEKLY':
            // console.log('aV gRS weekly');
            reqString = 
                AV_URL + 
                '/query?' + 
                'function=' + 'TIME_SERIES_WEEKLY' + 
                '&symbol=' + symbol + 
                '&datatype=' + dataType + 
                '&apikey=' + Alphavantage_API_KEY;
          
          break;
        case 'MONTHLY':
            // console.log('aV gRS monthly');
            reqString = 
                AV_URL +
                '/query?' +
                'function=' + 'TIME_SERIES_MONTHLY' +
                '&symbol=' + symbol +
                '&datatype=' + dataType +
                '&apikey=' + Alphavantage_API_KEY;

          break;
        default: 'Did not match timeframe (wtf???)';
          
      }

    //   console.log('aV eRI request string: ', reqString);


    return reqString;

    

}

export function convertDates(data: OHLCData[]) {
    const newData:OHLCData[] = [];
    for (const datum of data) {
        const newDate = typeof datum.date === 'string' ? new Date(datum.date) : datum.date;
        newData.push({...datum, date: newDate});
    }
    
    return newData;
}
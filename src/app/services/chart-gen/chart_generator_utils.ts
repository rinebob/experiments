import * as d3 from 'd3';
import * as fc from 'd3fc';
import { max } from 'rxjs/operators';
import { AXIS_THICKNESS } from 'src/app/common/constants';

import { OHLCData } from 'src/app/common/interfaces';
import { ChartPaneConfig, PlotConfig, Param, SingleLineCoords, RawGridlinePxValues, TranslationCoord, ScaleLocation, PaneLayout, SeriesParam, PaneLayerConfig } from 'src/app/common/interfaces_chart';

export function generateExtents(data: OHLCData[], minTarget: string | number, maxTarget: string | number) {
    // console.log('cGSU gE input min/maxTargets/data[100]: ', minTarget, maxTarget);
    // console.table(data[100]);
    

    const xMin = Math.floor(d3.min(data, d => d['date']));
    const xMax = Math.ceil(d3.max(data, d => d['date']));
    // let yMin = d3.min(data, d => d['low']);
    // let yMax = d3.max(data, d => d['high']);
    let yMin = typeof minTarget === 'number' ? minTarget : d3.min(data, d => d[minTarget]);
    let yMax = typeof maxTarget === 'number' ? maxTarget :  d3.max(data, d => d[maxTarget]);
    
    // ===== DO NOT DELETE ========
    // ===== vertical expand/contract code  ========
    // const center = yMax - ((yMax - yMin) / 2);
    // const height = yMax - yMin;
    // const newHeight = height * this.verticalScaleFactor;
    // yMin = Math.ceil(center - newHeight / 2);
    // yMax = Math.ceil(center + newHeight / 2);
    // ===== DO NOT DELETE ========
    
    // console.log('cGU gE post adjust yMax, yMin: ', yMax, yMin);
    const extents = {xMax, xMin, yMax, yMin}

    return {...extents};

    // return extents;
}

export function generateXScale(xMin: number, xMax: number, layout: PaneLayout) {
    // console.log('cGSU gXS input x min/max/layout.paneOrigin ', xMin, xMax);
    // console.table(layout.paneOrigin);
    const xScale = d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([layout.paneOrigin.right, layout.paneOrigin.right + layout.chartIndWidth]);

    
    // console.log('cGSU gXS final xScale domain/range: ', xScale.domain(), xScale.range());
    return xScale;
}

export function generateLinearYScale(yMin: number, yMax: number, layout: PaneLayout) {
    // console.log('cGSU gLinYS input y min/max/layout ', yMin, yMax);
    // console.table(layout.paneOrigin);
    const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([layout.paneOrigin.down + layout.chartIndHeight, layout.paneOrigin.down]);

    // console.log('cGSU gLinYS final yScale domain/range: ', yScale.domain(), yScale.range());
    return yScale;

}

export function generateLogYScale(yMin: number, yMax: number, layout: PaneLayout) {
    // console.log('cGSU gLogYS input y min/max/layout ', yMin, yMax);
    // console.table(layout.paneOrigin);
    const yScale = d3
        .scaleLog()
        .domain([yMin, yMax])
        .range([layout.paneOrigin.down + layout.chartIndHeight, layout.paneOrigin.down]);

    // console.log('cGSU gLogYS final yScale domain/range: ', yScale.domain(), yScale.range());
    return yScale;
}

export function generateRawGridlinePxValues(xScale, yScale, layout: PaneLayout) {
    const xTicks = xScale.ticks();
    const yTicks = yScale.ticks();
    const xTicksPxValues = [0, layout.chartIndWidth];
    const yTicksPxValues = [layout.paneOrigin.down];
    
    for (const tick of xTicks) {
        xTicksPxValues.push(xScale(tick));
    }
    
    for (const tick of yTicks) {
        yTicksPxValues.push(yScale(tick));
    }

    const rawGridlinePxValues: RawGridlinePxValues = {
        horzLineYValues: yTicksPxValues,
        vertLineXValues: xTicksPxValues,
    }
    // console.log('cGU gRGPV output rawGridlinePxValues: ');
    // console.table(rawGridlinePxValues);

    return rawGridlinePxValues;
}

export function generateYAxis(yScale, layout: PaneLayout, title: string, paneNumber: number, location: ScaleLocation) {
    // console.log('cGSU gYA input seriesType/paneNumber/location/layout',seriesType, paneNumber, location);
    // console.log('cGSU gYA input yScale range/domain', yScale.range(), yScale.domain());
    // console.table(layout);

    let axis: d3.Axis;
    let origin: TranslationCoord;

    const yAxis = d3.create('svg:g')
        .attr('id', `${title}-yAxis-${paneNumber}`)
        .attr('stroke', 'white')
        .attr('stroke-width', '1.0');
    
    if (location === ScaleLocation.LEFT) {
        axis = d3.axisLeft(yScale);
        origin = layout.leftAxisOrigin;
        yAxis.attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`)
        .call(axis);
        

    } else {
        axis = d3.axisRight(yScale);
        origin = layout.rightAxisOrigin;
        yAxis.attr('transform', `translate(${layout.fullPaneWidth - AXIS_THICKNESS}, ${AXIS_THICKNESS})`)
        .call(axis);
        
    }

    // console.log('cGSU gYA yScale origin: ', origin);

    return yAxis;
}

export function generateDateXAxis(xScale, layout: PaneLayout, paneConfig: ChartPaneConfig, location: ScaleLocation) {
    // console.log('cGSU gDXA input xScale/origin/seriesType/paneNumber/location', xScale, seriesType, paneNumber, location);
    // console.log('cGSU gDXA input xScale domain/range: ', xScale.domain(), xScale.range());
    // console.table(layout);

    const axis = location === ScaleLocation.TOP ? d3.axisTop(xScale) : d3.axisBottom(xScale);
    const origin = location === ScaleLocation.TOP ? layout.topAxisOrigin : layout.bottomAxisOrigin;
    
    const dateXAxis = d3.create('svg:g')
        .attr('id', `${paneConfig.title}-xAxis-${location}-origin-${paneConfig.paneNumber}`)
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        .attr('stroke', 'white')
        .attr('stroke-width', '1.0')
        .call(axis);

    return dateXAxis;
}

export function generateFinanceTimeXAxis(xScale, origin: TranslationCoord) {
    // console.log('cGSU gFTA input xScale', xScale);
    const axis = {};
    return axis;
}

export function generateLineSeries(data: OHLCData[], xScale, yScale, plotConfig: PlotConfig, paneNumber: number, layerNumber: number, target: string) {
    // console.log('cGSU gLS input plotName/paneNumber/origin', plotConfig.plotName, paneNumber, layout.paneOrigin);
    // console.log('cGSU gLS input xScale range/domain', xScale.range(), xScale.domain());
    // console.log('cGSU gLS input yScale range/domain', yScale.range(), yScale.domain());
    // console.table(data[100]);
    // console.log('cGSU gLS input target', target);

    // console.log('cGU gLS target data:');
    // console.log('cGU gLS d[target]/yScale[target]: ', data[100][target], yScale(data[100][target]));
    
    // const lineSeriesFn = d3.line()
    //     .x(d => xScale(d['date']))
    //     .y(d => yScale(d[target]));

    const renderItem = d3.create('svg:g')
        .attr('id', `pane${paneNumber}-layer${layerNumber}-${target}-line`)
        .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);
        
    const plot = fc.seriesSvgLine()
        .xScale(xScale)
        .yScale(yScale)
        .crossValue(d => d.date)
        .mainValue(d => d[target])
        .decorate(selection => 
            selection.enter()
            .style('fill', 'none')
            .attr('stroke', plotConfig.color)
            .attr('stroke-width', plotConfig.thickness)
        );

    renderItem
        .datum(data)
        .call(plot);


    // console.log('cGSU gLS output render item: ', renderItem);
    return renderItem;
}

export function generateCandlestickSeries(data: OHLCData[], xScale, yScale, plotConfig: PlotConfig, paneNumber: number, layerNumber: number) {
    // console.log('cGSU gCS input plotName/paneNumber/layerNumber/origin', plotConfig.plotName, paneNumber, layerNumber, origin);
    // console.log('cGSU gCS input yScale range/domain', yScale.range(), yScale.domain());
    // console.table(data.slice(100,110));

    const renderItem = d3.create('svg:g')
      .attr('id', `pane${paneNumber}-layer${layerNumber}-${plotConfig.plotName}-cndl`)
      .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    const plot = fc.seriesSvgCandlestick()
        .xScale(xScale)
        .yScale(yScale)
        .crossValue(d => d.date)
        .openValue(d => d.open)
        .highValue(d => d.high)
        .lowValue(d => d.low)
        .closeValue(d => d.close);

    renderItem
        .datum(data)
        .call(plot);

    return renderItem;
}

export function generateOHLCBarSeries(data: OHLCData[], xScale, yScale, plotConfig: PlotConfig, paneNumber: number, layerNumber: number) {
    // console.log('cGSU gBS input plotName/paneNumber/layerNumber/origin', plotConfig.plotName, paneNumber, layerNumber, origin);
    // console.log('cGSU gBS input yScale range/domain', yScale.range(), yScale.domain());
    // console.table(data.slice(100,110));

    const renderItem = d3.create('svg:g')
      .attr('id', `pane${paneNumber}-layer${layerNumber}-${plotConfig.plotName}-ohlc`)
      .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    const plot = fc.seriesSvgOhlc()
        .xScale(xScale)
        .yScale(yScale)
        .crossValue(d => d.date)
        .openValue(d => d.open)
        .highValue(d => d.high)
        .lowValue(d => d.low)
        .closeValue(d => d.close);

    renderItem
        .datum(data)
        .call(plot);

    return renderItem;
}

export function generateBarSeries(data: OHLCData[], xScale, yScale, plotConfig: PlotConfig, paneNumber: number, layerNumber: number, target: string) {
    // console.log('cGSU gBS input plotName/paneNumber/layerNumber/target', plotConfig.plotName, paneNumber, layerNumber, target);
    // console.log('cGSU gBS input yScale range/domain', yScale.range(), yScale.domain());
    // console.table(data.slice(100,110));

    const renderItem = d3.create('svg:g')
      .attr('id', `pane${paneNumber}-layer${layerNumber}-${target}-bar`)
      .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    const plot = fc.seriesSvgBar()
        .xScale(xScale)
        .yScale(yScale)
        .mainValue(d => d[target])
        .crossValue(d => d.date)
        .decorate(sel => 
            sel.enter()
            .attr('stroke', d => d[target] >= 0 ? plotConfig.upColor : plotConfig.downColor)
            .attr('fill', d => d[target] >= 0 ? plotConfig.upColor : plotConfig.downColor)
            );

    renderItem
        .datum(data)
        .call(plot);

    return renderItem;
}

export function generateGridlines(xScale, yScale, layer: PaneLayerConfig, layout: PaneLayout) {
    // console.log('cGU gG generate gridlines');
    // console.log('cGU gG xScale domain/range: ', xScale.domain(), xScale.range());
    // console.log('cGU gG yScale domain/range: ', yScale.domain(), yScale.range());

    const renderItem = d3.create('svg:g')
      .attr('id', `layer${layer.layerNumber}-gridlines`)
      .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    const rawGridlinePxValues = generateRawGridlinePxValues(xScale, yScale, layout);
    // console.log('cGU gG gridlineCoords:');
    // console.table(rawGridlinePxValues);

    const lineCoordsArray = generateGridlineCoords(rawGridlinePxValues, layout);
    
    for (const coords of lineCoordsArray) {
        const label = '';
        const line: d3.line = generateGridline(coords, layout, label);

        renderItem.append(() => line.node());
    }

    // Remaining non-gridline lines - upper/lower and zero horizontal lines
    if (!!layer.upperLineLevel) {
        const coords: SingleLineCoords = {
            x1: 0,
            y1: yScale(layer.upperLineLevel),
            x2: layout.chartIndWidth,
            y2: yScale(layer.upperLineLevel),
        }
        const label = 'upper-line';
        const line: d3.line = generateGridline(coords, layout, label);

        line
            .attr('stroke-width', '2.0')
            .attr('stroke', 'white');

        renderItem.append(() => line.node());
    }

    if (!!layer.lowerLineLevel) {
        const coords: SingleLineCoords = {
            x1: 0,
            y1: yScale(layer.lowerLineLevel),
            x2: layout.chartIndWidth,
            y2: yScale(layer.lowerLineLevel),
        }
        const label = 'lower-ine';
        const line: d3.line = generateGridline(coords, layout, label);

        line
            .attr('stroke-width', '2.0')
            .attr('stroke', 'white');

        renderItem.append(() => line.node());
    }

    if (layer.hasZeroLine) {
        const coords: SingleLineCoords = {
            x1: 0,
            y1: yScale(0),
            x2: layout.chartIndWidth,
            y2: yScale(0),
        }
        const label = 'zero-ine';
        const line: d3.line = generateGridline(coords, layout, label);
        
        line
            .attr('stroke-width', '2.0')
            .attr('stroke', 'white');


        renderItem.append(() => line.node());
    }

    // console.log('cGU gG gridlines output renderItem: ', renderItem);

    return renderItem;
}

export function generateGridlineCoords(rawGridlinePxValues: RawGridlinePxValues, layout: PaneLayout) {

    const lineCoords: SingleLineCoords[] = [];
    
    const horzLevels = rawGridlinePxValues.horzLineYValues;
    const vertLevels = rawGridlinePxValues.vertLineXValues;

    for (const level of horzLevels) {
        const coords: SingleLineCoords = {
            x1: 0,
            y1: level,
            x2: layout.chartIndWidth,
            y2: level,
        }
        lineCoords.push(coords);
    }

    for (const level of vertLevels) {
        const coords: SingleLineCoords = {
            x1: level,
            y1: layout.chartIndHeight,
            x2: level,
            y2: 0,
        }
        lineCoords.push(coords);
    }

    // console.log('cGU gLC output lineCoords array:');
    // console.table(lineCoords);
    
    return lineCoords;
}

export function generateGridline(coords: SingleLineCoords, layout: PaneLayout, label: string) {
    // console.log('cGU gL input label/coords: ', label)
    // console.table(coords);
    
    // y1 = y2 means horizontal line
    // x1 = x2 means vertical line
    const lineIsHorizontal = coords.y1 === coords.y2;
    const lineIsVertical = coords.x1 === coords.x2;
    
    // console.log('cGU gL line is horz/vert: ', lineIsHorizontal, lineIsVertical);

    const x1 = lineIsHorizontal ? coords.x1 : coords.x1;
    const y1 = lineIsHorizontal ? coords.y1 : coords.y1 + layout.paneOrigin.down;
    const x2 = lineIsHorizontal ? coords.x2 : coords.x2;
    const y2 = lineIsHorizontal ? coords.y2 : coords.y2  + layout.paneOrigin.down;

    const line = d3.create('svg:line')
        .attr('id', `grid-${label}`)
        .attr('x1', x1)
        .attr('x2', x2)
        .attr('y1', y1)
        .attr('y2', y2)
        .attr('stroke', 'rgb(54, 69, 84)')
        .attr('stroke-width', '1.0');

    // console.log('cGU gL output line: ', line)

    return line;
}

export function generateSMA(data: OHLCData[], params: Param[]) {
    // console.log('cGSU gSMA input data[100]:');
    // console.table(data[100])

    const period = params.find(param => param.name === SeriesParam.PERIOD).value;
    // console.log('cGSU gSMA input period: ', period);

    const smaFn = fc.indicatorMovingAverage()
        .value(d => d.close)
        .period(period);

    const smaData = smaFn(data);

    // console.log('cGSU smaData:');
    // console.table(smaData.slice(100,102));

    data = mergeArrayData(data, smaData, `sma-${period}`);
    // console.log('cGSU merged smaData:');
    // console.table(data.slice(100,102));

    return data;
}

export function generateEMA(data: OHLCData[], params: Param[]) {
    // console.log('cGSU gEMA input params:');
    // console.table(params)
    // console.log('cGSU gEMA input data[100]:');
    // console.table(data[100])

    const period = params.find(param => param.name === SeriesParam.PERIOD).value;
    // console.log('cGSU gEMA input period: ', period);

    const emaFn = fc.indicatorExponentialMovingAverage()
        .value(d => d.close)
        .period(period);

    const emaData = emaFn(data);

    // console.log('cGSU emaData:');
    // console.table(emaData.slice(100,102));

    data = mergeArrayData(data, emaData, `ema-${period}`);
    // console.log('cGSU merged emaData:');
    // console.table(data.slice(100,102));

    return data;
}

export function generateRSI(data: OHLCData[], params: Param[]) {
    // console.log('cGSU gRSI input params/data[100]: ', params);
    // console.table(data[100])

    const period = params.find(param => param.name === SeriesParam.PERIOD).value;
    // console.log('cGSU gRSI input period: ', period);

    const rsiFn = fc.indicatorRelativeStrengthIndex()
        .value(d => d.close)
        .period(period);

    const rsiData = rsiFn(data);

    // console.log('cGSU rsiData:');
    // console.table(rsiData.slice(100,102));

    data = mergeArrayData(data, rsiData, `rsi-${period}`);
    // console.log('cGSU merged rsiData:');
    // console.table(data.slice(100,102));

    return data;
}

export function generateMACD(data: OHLCData[], params: Param[]) {
    // console.log('cGSU gMACD input params/data[100]: ', params);
    // console.table(data[100])
    
    const fast = params.find(param => param.name === SeriesParam.FAST).value;
    const slow = params.find(param => param.name === SeriesParam.SLOW).value;
    const signal = params.find(param => param.name === SeriesParam.SIGNAL).value;
    // console.log('cGSU gMACD input fast/slow/signal: ', fast, slow, signal);

    const macdFn = fc.indicatorMacd()
        .value(d => d.close)
        .fastPeriod(fast)
        .slowPeriod(slow)
        .signalPeriod(signal);

    const macdData = macdFn(data);
    // console.log('cGSU macdData:');
    // console.table(macdData.slice(100,102));

    data = mergeObjectData(data, macdData, `macd-${fast}-${slow}-${signal}`);

    return data;
}

export function generateStochastic(data: OHLCData[], params: Param[]) {
    // console.log('cGSU gStoch input params/data[100]: ', params);
    // console.table(data[100])

    const k = params.find(param => param.name === SeriesParam.K).value;
    const d = params.find(param => param.name === SeriesParam.D).value;
    // console.log('cGSU gStoch input k/d: ', k, d);

    const stochFn = fc.indicatorStochasticOscillator()
        .kPeriod(k)
        .dPeriod(d)
    
    const stochData = stochFn(data);
    // console.log('cGSU stochData:');
    // console.table(stochData.slice(100,110));

    data = mergeObjectData(data, stochData, `stoch-${k}-${d}`);

    return data;
}

export function generateBollingerBands(data: OHLCData[], params: Param[]) {
    // console.log('cGSU gBB input params/data[100]: ', params);
    // console.table(data[100])
    
    const period = params.find(param => param.name === SeriesParam.PERIOD).value;
    const multiplier = params.find(param => param.name === SeriesParam.MULTIPLIER).value;
    // console.log('cGSU gBB input period/multiplier: ', period, multiplier);

    const bbFn = fc.indicatorBollingerBands()
        .value(d => d.close)
        .period(period)
        .multiplier(multiplier);

    const bbData = bbFn(data);
    // console.log('cGSU bbData:');
    // console.table(bbData.slice(100,102));

    data = mergeObjectData(data, bbData, `bb-${period}-${multiplier}`);

    return data;
}

export function mergeArrayData(into, from, label) {
    // console.log('cGU mAD input label/into/from[100]: ', label);
    // console.table(into[100]);
    // console.table(from[100]);
    
    const output = into.map((d, i) => {
        const datum = {...d};

        datum[`${label}`] = from[i];
      
      return {...datum};
    });

    // console.log('cGU mAD output:');
    // console.table(output[100]);
    
    return output;
}

export function mergeObjectData(into, from, label: string) {
    // console.log('cGU mOD input into/from[100]:');
    // console.table(into[100]);
    // console.table(from[100]);
    
    
    const output = into.map((d, i) => {
      const datum = {...d};

      for (const [key, value] of Object.entries(from[i])) {
        // console.log('cGU mD key/value: ', key, value);
        datum[`${key}-${label}`] = value;
      }

      return {...datum};
    });

    // console.log('cGU mOD output:');
    // console.table(output[100]);
    
    return output;
}

export function returnDataWithSmoothD(into, smoothDSource) {
    // console.log('cGU rDWFK input into/fastKSource[100]: ', into[100], smoothDSource[100]);
    // console.log('cGU rDWFK input from[0].key/value: ', from[0].key, from[0].value);

    const output = into.map((d, i) => {
        const datum = {...d};

        // take the value from fastKSource.k and add it to into['fastK']
        datum['smoothD'] = smoothDSource[i].k;
    


    });
    // console.log('cGU rDWFK output data:');
    // console.table(output.slice(100, 110));

    return output;

}

export function getEnumKeyByEnumValue(myEnum, enumValue) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}
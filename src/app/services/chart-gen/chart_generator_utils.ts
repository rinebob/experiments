import * as d3 from 'd3';
import * as fc from 'd3fc';

import { AXIS_THICKNESS } from 'src/app/common/constants';
import { OHLCData } from 'src/app/common/interfaces';
import { ExtentsConfig, PlotConfig, Param, SingleLineCoords, RawGridlinePxValues, TranslationCoord, ScaleLocation, PaneLayout, SeriesParam, PaneLayerConfig } from 'src/app/common/interfaces_chart';


// export function generateExtents(data: OHLCData[], minTarget: string | number, maxTarget: string | number) {
export function generateExtents(data: OHLCData[], config: ExtentsConfig) {
    // console.log('cGSU gE input extentsConfig/data[10]: ', config);
    // console.table(data[10]);

    // switch case for x and y scale types
    // type = fixed just use input as final extent
    // else do a normal extents calc
    // ex price use regular extents
    // rsi stoch are fixed
    // macd has two targets to generate extents for...





    

    // const xMin = Math.floor(d3.min(data, d => d['date']));
    // const xMax = Math.ceil(d3.max(data, d => d['date']));
    const xMin = Math.floor(d3.min(data, d => d[config.xMinTarget]));
    const xMax = Math.ceil(d3.max(data, d => d[config.xMaxTarget]));
    // const xMin = Math.floor(d3.min(data, d => d['callPrice']));  
    // const xMax = Math.ceil(d3.max(data, d => d['callPrice']));
    // let yMin = d3.min(data, d => d['low']);
    // let yMax = d3.max(data, d => d['high']);
    
    
    // const xMin = Math.floor(d3.min(data, d => d[minTarget]));
    // const xMax = Math.ceil(d3.max(data, d => d[maxTarget]));
    
    let yMin = typeof config.yMinTarget === 'number' ? config.yMinTarget : d3.min(data, d => d[config.yMinTarget]);
    let yMax = typeof config.yMaxTarget === 'number' ? config.yMaxTarget :  d3.max(data, d => d[config.yMaxTarget]);
    
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

export function generateDateXScale(xMin: number, xMax: number, layout: PaneLayout) {
    // console.log('cGSU gDXSc input x min/max/layout.paneOrigin ', xMin, xMax);
    // console.table(layout.paneOrigin);
    const xScale = d3
        .scaleTime()
        .domain([xMin, xMax])
        .range([layout.paneOrigin.right, layout.paneOrigin.right + layout.chartIndWidth])
        // .nice()
        ;

    // console.log('cGU gXS xScale.ticks(100):');
    // console.table(xScale.ticks(100));

    const disXScale = fc
        .scaleDiscontinuous(d3.scaleTime())
        // .discontinuityProvider(fc.discontinuitySkipWeekends())
        .domain([xMin, xMax])
        .range([layout.paneOrigin.right, layout.paneOrigin.right + layout.chartIndWidth])
        // .nice()
        ;

    
    // console.log('cGSU gXS final xScale domain/range: ', xScale.domain(), xScale.range());
    // return xScale;
    return disXScale;
}

export function generateLinearXScale(xMin: number, xMax: number, layout: PaneLayout) {
    // console.log('cGSU gLXSc input x min/max/layout.paneOrigin ', xMin, xMax);
    // console.table(layout.paneOrigin);
    const xScale = d3
        .scaleLinear()
        .domain([xMin, xMax])
        .range([layout.paneOrigin.right, layout.paneOrigin.right + layout.chartIndWidth])
        // .nice()
        ;

    // console.log('cGU gXS xScale.ticks(100):');
    // console.table(xScale.ticks(100));

    
    // console.log('cGSU gXS final xScale domain/range: ', xScale.domain(), xScale.range());
    return xScale;
    
}

export function generateLinearYScale(yMin: number, yMax: number, layout: PaneLayout) {
    // console.log('cGSU gLinYS input y min/max/layout ', yMin, yMax);
    // console.table(layout.paneOrigin);
    const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([layout.paneOrigin.down + layout.chartIndHeight, layout.paneOrigin.down])
        .nice();

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

export function generateRawGridlinePxValues2(xScale, yScale, tickValues, layout: PaneLayout) {
    const xTicksPxValues = [0, layout.chartIndWidth];
    const yTicksPxValues = [layout.paneOrigin.down];
    
    for (const tick of tickValues.xTickValues) {
        xTicksPxValues.push(xScale(tick));
    }

    for (const tick of tickValues.yTickValues) {
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

export function generateDates(data: OHLCData[]) {
    const datesMillisArray: number[] = [];
    const datesArray: Date[] = [];
    const datesWithRawMillis = [];
    for (const datum of data) {
      const millis = Math.floor((new Date(datum.date).getTime()));
      const midnight = d3.timeDay(datum.date);
      const midnightMillis = midnight.getTime();
      datesMillisArray.push(midnightMillis);
      datesArray.push(datum.date as Date);
      datesWithRawMillis.push(
        {
          rawDate: datum.date,
          millis,
          midnightMillis
        }
      );

    }
    // console.log('cGS gD dates with raw millis:');
    // console.table(datesWithRawMillis);
    return {datesArray, datesMillisArray, datesWithRawMillis};
  }

export function generateYAxis(yScale, layout: PaneLayout, idLabel: string, paneNumber: number, location: ScaleLocation) {
    // console.log('cGSU gYA input seriesType/paneNumber/location/layout',seriesType, paneNumber, location);
    // console.log('cGSU gYA input yScale range/domain', yScale.range(), yScale.domain());
    // console.table(layout);

    let axis: d3.Axis;
    let origin: TranslationCoord;

    const yAxis = d3.create('svg:g')
        .attr('id', `${idLabel}-yAxis-${location}`)
        .attr('stroke', 'white');
        // .attr('stroke', 'black');
        // .attr('stroke-width', '1.0');
    
    if (location === ScaleLocation.LEFT) {
        axis = d3.axisLeft(yScale);
        yAxis.attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`)
        .call(axis);
        

    } else {
        axis = d3.axisRight(yScale);
        yAxis.attr('transform', `translate(${layout.fullPaneWidth - AXIS_THICKNESS}, ${AXIS_THICKNESS})`)
        .call(axis);
        
    }

    // console.log('cGSU gYA yScale origin: ', origin);

    return yAxis;
}

export function generateDateXAxis(xScale, layout: PaneLayout, layerConfig: PaneLayerConfig) {
    // console.log('cGSU gDXA input xScale/origin/seriesType/paneNumber/location', xScale, seriesType, paneNumber, location);
    // console.log('cGSU gDXA input xScale domain/range: ', xScale.domain(), xScale.range());
    // console.table(layout);

    const origin = layerConfig.xAxisConfig.location === ScaleLocation.TOP ? layout.topAxisOrigin : layout.bottomAxisOrigin;
    const axis = layerConfig.xAxisConfig.location === ScaleLocation.TOP ? d3.axisTop(xScale) : d3.axisBottom(xScale);

    // axis
    //     .ticks(50);
    
    const dateXAxis = d3.create('svg:g')
        .attr('id', `${layerConfig.idLabel}-xAxis-${layerConfig.xAxisConfig.location}`)
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        .attr('stroke', 'white')
        // .attr('stroke-width', '1.0')
        .call(axis);

    return dateXAxis;
}

export function generateLinearXAxis(xScale, layout: PaneLayout, layerConfig: PaneLayerConfig) {
    // console.log('cGSU gLXA called', );
    // console.log('cGSU gLXA input layout/layerConfig', xScale, layout, layerConfig);
    // console.log('cGSU gLXA input xScale domain/range: ', xScale.domain(), xScale.range());
    // console.table(layout);

    const origin = layerConfig.xAxisConfig.location === ScaleLocation.TOP ? layout.topAxisOrigin : layout.bottomAxisOrigin;
    const axis = layerConfig.xAxisConfig.location === ScaleLocation.TOP ? d3.axisTop(xScale) : d3.axisBottom(xScale);

    // axis
    //     .ticks(50);
    
    const linearXAxis = d3.create('svg:g')
        .attr('id', `${layerConfig.idLabel}-xAxis-${layerConfig.xAxisConfig.location}`)
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        .attr('stroke', 'white')
        // .attr('stroke', 'black')
        // .attr('stroke-width', '1.0')
        .call(axis);

    return linearXAxis;
}

export function generateFinanceTimeXAxis(xScale, origin: TranslationCoord) {
    // console.log('cGSU gFTA input xScale', xScale);
    const axis = {};
    return axis;
}

export function generateLineSeries(data: OHLCData[], xSc:d3.Scale, ySc:d3.Scale, plotConfig: PlotConfig,
     paneNumber: number, layerNumber: number, xTarget: string, yTarget: string) {

    // console.log('-------------- cGSU gLS -------------------');
    // console.log('cGSU gLS input xScale range/domain', xSc.range(), xSc.domain());
    // console.log('cGSU gLS input yScale range/domain', ySc.range(), ySc.domain());
    // console.table(data[10]);
    // console.log('cGSU gLS input xTarget/yTarget', xTarget, yTarget);

    // console.log('cGU gLS yTarget data:');
    // console.log('cGU gLS d[yTarget]/yScale[yTarget]: ', data[100][yTarget], yScale(data[100][yTarget]));
    
    const renderItem = d3.create('svg:g')
        .attr('id', `pane${paneNumber}-layer${layerNumber}-${yTarget}-line`)
        .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`)
        .on('click', (event, d) => {
            console.log('cGU gLS id: ', `pane-${paneNumber}-layer-${layerNumber}-${yTarget}-line`,' location: ', d3.pointer(event));
            console.log('cGU gLS data set: ', d);
        });

                
    const plot = fc.seriesSvgLine()
        .xScale(xSc)
        .yScale(ySc)
        // .crossValue(d => d.date)
        // .crossValue(d => d.index)
        .crossValue(d => d[xTarget])
        .mainValue(d => d[yTarget])
        .decorate(selection => 
            selection.enter()
            .style('fill', 'none')
            .attr('stroke', plotConfig.color)
            .attr('stroke-width', plotConfig.thickness)
        );

    
    const plot2 = fc.seriesSvgPoint()
    .xScale(xSc)
    .yScale(ySc)
    .crossValue(d => d[xTarget])
    .mainValue(d => d[yTarget])
    .size(10)
    .decorate(selection => 
        selection.enter()
        // .style('fill', 'none')
        .style('fill', 'white')
        // .style('fill', 'black')
        .attr('stroke', plotConfig.color)
        // .attr('stroke-width', plotConfig.thickness)
        .attr('stroke-width', '1.0')
        // .attr('r', (d, i, n) => {
            // console.log('cGU gLS n[i]: ', n[i]);
            // const c = d3.select(n[i]);
            // console.log('cGU gLS c: ', c);
        // })
        .on('mouseover', (event, d) => {
            console.log('cGU gLS pane/yTarget/datum: ', paneNumber, yTarget);
            // console.table(d);
        })
    );

    renderItem
        .datum(data)
        .call(plot)
        .call(plot2)
        ;


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

export function generateBarSeries(data: OHLCData[], xScale, yScale, plotConfig: PlotConfig, paneNumber: number, layerNumber: number, xTarget: string, yTarget: string) {
    // console.log('cGSU gBS input plotName/paneNumber/layerNumber/yTarget', plotConfig.plotName, paneNumber, layerNumber, yTarget);
    // console.log('cGSU gBS input yScale range/domain', yScale.range(), yScale.domain());
    // console.table(data.slice(100,110));

    const renderItem = d3.create('svg:g')
      .attr('id', `pane${paneNumber}-layer${layerNumber}-${yTarget}-bar`)
      .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    const plot = fc.seriesSvgBar()
        .xScale(xScale)
        .yScale(yScale)
        .crossValue(d => d[xTarget])
        .mainValue(d => d[yTarget])
        .decorate(sel => 
            sel.enter()
            .attr('stroke', d => d[yTarget] >= 0 ? plotConfig.upColor : plotConfig.downColor)
            .attr('fill', d => d[yTarget] >= 0 ? plotConfig.upColor : plotConfig.downColor)
            );

    renderItem
        .datum(data)
        .call(plot);

    return renderItem;
}

export function generateGridlines(xScale, yScale, xDates, layer: PaneLayerConfig, layout: PaneLayout) {
    // console.log('cGU gG generate gridlines');
    // console.log('cGU gG xScale domain/range: ', xScale.domain(), xScale.range());
    // console.log('cGU gG yScale domain/range: ', yScale.domain(), yScale.range());

    const renderItem = d3.create('svg:g')
      .attr('id', `layer${layer.layerNumber}-gridlines`)
      .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    const rawGridlinePxValues = generateRawGridlinePxValues(xScale, yScale, layout);
    // console.log('cGU gG raw gridlinePxValues:');
    // console.table(rawGridlinePxValues);

    const lineCoordsArray = generateGridlineCoords(rawGridlinePxValues, layout);
    // console.log('cGU gG raw gridlineCoords:');
    // console.table(lineCoordsArray);
    
    for (const coords of lineCoordsArray) {
        let line: d3.line = generateGridline(coords, layout);

        renderItem.append(() => line.node());
    }

    // console.log('cGU gG gridlines output renderItem: ', renderItem);

    return renderItem;
}

export function generateIndicatorLines(yScale, layer: PaneLayerConfig, layout: PaneLayout) {
    // console.log('cGU gG remaining lines: upper/lower/zero: ', layer.upperLineLevel, layer.lowerLineLevel, layer.hasZeroLine);

    const renderItem = d3.create('svg:g')
      .attr('id', `${layer.idLabel}-indicatorLines`)
      .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    if (!!layer.upperLineLevel) {
        const coords: SingleLineCoords = {
            x1: 0,
            y1: yScale(layer.upperLineLevel),
            x2: layout.chartIndWidth,
            y2: yScale(layer.upperLineLevel),
            label: 'upper',
        }
        const line: d3.line = generateGridline(coords, layout);

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
            label: 'lower',
        }
        const line: d3.line = generateGridline(coords, layout);

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
            label: 'zero-line'
        }
        const line: d3.line = generateGridline(coords, layout);
        
        line
            .attr('stroke-width', '2.0')
            .attr('stroke', 'white');

        renderItem.append(() => line.node());
    }

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
            label: `grid-h-${horzLevels.indexOf(level)}`,
        }
        lineCoords.push(coords);
    }

    for (const level of vertLevels) {
        const coords: SingleLineCoords = {
            x1: level,
            y1: layout.chartIndHeight,
            x2: level,
            y2: 0,
            label: `grid-v-${vertLevels.indexOf(level)}`,
        }
        lineCoords.push(coords);
    }

    // console.log('cGU gLC output lineCoords array:');
    // console.table(lineCoords);
    
    return lineCoords;
}

export function generateGridline(coords: SingleLineCoords, layout: PaneLayout) {
    // console.log('cGU gL input label/coords: ', label)
    // console.table(coords);
    
    // y1 = y2 means horizontal line
    // x1 = x2 means vertical line
    const lineIsHorizontal = coords.y1 === coords.y2;
    
    // console.log('cGU gL line is horz/vert: ', lineIsHorizontal, lineIsVertical);

    const x1 = lineIsHorizontal ? coords.x1 : coords.x1;
    const y1 = lineIsHorizontal ? coords.y1 : coords.y1 + layout.paneOrigin.down;
    const x2 = lineIsHorizontal ? coords.x2 : coords.x2;
    const y2 = lineIsHorizontal ? coords.y2 : coords.y2  + layout.paneOrigin.down;

    // if line is visible give it a color otherwise make it transparent or give it a different color
    // const strokeColor = coords.visible === true ? 'rgb(54, 69, 84)' : 'rgba(0, 0, 0, 0)';
    // const strokeColor = coords.visible === true ? 'rgb(54, 69, 84)' : 'rgb(154, 169, 184)';

    const line = d3.create('svg:line')
        .attr('id', coords.label)
        .attr('x1', x1)
        .attr('x2', x2)
        .attr('y1', y1)
        .attr('y2', y2)
        // .attr('stroke', strokeColor)
        // .attr('stroke', 'rgb(54, 69, 84)')
        .attr('stroke', 'lightgrey')
        // .attr('stroke-width', '1.0');
        .attr('stroke-width', '0.5');

    if (coords.index) {
        line
            .attr('data-index', coords.index);
    }

    // console.log('cGU gL output line: ', line)

    return line;
}

export function generatePanelCrosshairs(layouts: PaneLayout[]) {
    // console.log('cGU gPC input layouts: ', layouts);

    const strokeWidth = '0.5';

    const renderItem = d3.create('svg:g')
        .attr('id', `panel-crosshairs`)
        .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);

    const horzLine = d3.create('svg:line')
        .classed('panel-crosshairs panel-crosshairs-x', true)
        .attr('id', 'panel-crosshairs-x')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 0)
        .attr('stroke', 'white')
        .attr('stroke-width', strokeWidth);

    for (const layout of layouts) {
        // console.log('cGU gPC layout.paneNumber: ', layout.paneNumber);

        // const clip = d3.create('svg:clipPath')
        //     .attr('id', `pane-${layout.paneNumber}-crosshairs-clipPath`)
        //     .attr('x', layout.paneOrigin.right)
        //     .attr('y', layout.paneOrigin.down)
        //     .attr('height', layout.chartIndHeight)
        //     .attr('width', layout.chartIndWidth)
        //     ;

        const vertLine = d3.create('svg:line')
            .classed('panel-crosshairs panel-crosshairs-y', true)
            .attr('id', `panel-crosshairs-y-pane-${layout.paneNumber}`)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 0)
            .attr('stroke', 'white')
            .attr('stroke-width', strokeWidth);
        
            
            // clip.append(() => vertLine.node());
            // renderItem.append(() => clip.node());
            
        // console.log('cGU gPC vertLine: ', vertLine);
        renderItem.append(() => vertLine.node());
    }

    renderItem.append(() => horzLine.node());
    
    return renderItem;
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
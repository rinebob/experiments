import { AfterViewInit, Component, ElementRef, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionProjectionDataSet } from 'src/app/common/option_interfaces';
import {ChartPanelConfig, DomRectCoordinates, Extents } from '../../../../../common/interfaces_chart';
import { DEFAULT_MARGIN_CONFIG, DOM_RECT_COORDS_INITIALIZER } from '../../../../../common/constants';
import * as d3 from 'd3';
import { ChartGeneratorService } from 'src/app/services/chart-gen/chart-generator.service';
import * as utils from '../../../../../services/chart-gen/chart_generator_utils';

@Component({
  selector: 'exp-calc-charts',
  templateUrl: './calc-charts.component.html',
  styleUrls: ['./calc-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcChartsComponent implements AfterViewInit, OnInit {
  @ViewChild('panelRoot', {read: ElementRef}) panelRoot: ElementRef;

  @Input()
  set dataSet(set: OptionProjectionDataSet) {
    // console.log('cC @i dataSet[0]: ', set[0]);
    this.dataSetBS.next(set);
    this.refreshChart();

  }
  get dataSet() {
    return this.dataSetBS.value;
  }
  dataSetBS = new BehaviorSubject<OptionProjectionDataSet>([]);

  @Input()
  set renderConfig(config: ChartPanelConfig) {
    // console.log('cC @i config: ', config);
    this.renderConfigBS.next(config);
    // this.refreshChart();

  }
  get renderConfig() {
    return this.renderConfigBS.value;
  }
  renderConfigBS = new BehaviorSubject<ChartPanelConfig>({})

  containerDimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);

  constructor(private readonly chartGenSvc: ChartGeneratorService) { }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    this.containerDimsBS.next(this.generateDomRectCoordinates());
    this.renderConfig.containerDims = this.containerDimsBS.value;
    this.refreshChart();
    // this.renderPlaceholderSvg();
  }

  generateDomRectCoordinates() {
    const domRect:DomRectCoordinates = this.panelRoot.nativeElement.getBoundingClientRect();
    

    // console.log('cC gDRC panelContainer domRect:');
    // console.table(domRect);
    
    const coords: DomRectCoordinates = {
      x: domRect.x,
      y: domRect.y,
      height: Math.floor(domRect.height),
      width: Math.floor(domRect.width),
      top: domRect.top,
      bottom: domRect.bottom,
      right: domRect.right,
      left: domRect.left,
      margin: DEFAULT_MARGIN_CONFIG,
    };
  
    // console.log('cC gDRC final coords:');
    // console.table(coords);
    return coords;

  }

  // Pane 1 - Call price, put price
  // Pane 2 - Call delta, put delta
  // Pane 3 - Call theta, put theta
  // Scales:
  // x linear bottom
  // y linear and log right
  
  // Pane 4 - Gamma and vega with different y scales left/right
  // Scales:
  // x linear
  // y linear

  refreshChart() {
    // for now just use the first series in the data set
    const dataSeries = this.dataSet[0];
    const strike = dataSeries.strike;
    const data = dataSeries.series;

    const dims = this.containerDimsBS.value;

    const options = {showCrosshairs: true};


    // console.log('cC rC strike/dims/data: ', strike, dims);
    // console.table(data);
    // console.log('cC rC data[0][callPrice]', data[0]['callPrice']);

    
    let renderItem = d3.create('svg:g')
      .attr('id', 'id');
    
    const renderablePanel = this.chartGenSvc.generateRenderablePanel(data, this.renderConfig, options);

    // console.log('cC rC renderItem new: ', renderItem);
    // console.log('cC rC generated renderPanel: ', renderablePanel.renderPanel);

    if (!!renderablePanel) {
 
      renderItem.append(() => renderablePanel.renderPanel.node());

      d3.select('svg').remove();
      d3.select('#panelRoot')
        .attr('top', this.containerDimsBS.value.margin.top)
        .attr('left', this.containerDimsBS.value.margin.left)
        .attr('width', this.containerDimsBS.value.width)
        .attr('height', this.containerDimsBS.value.height)
        .append(() => renderablePanel.renderPanel.node())
        ;

    } else {
      // console.log('cC rC dude theres no rederable panel here!')
    }



    // ========== from Chart Gen Svc genereateRenderableLayer =====================
    // let renderItem = d3.create('svg:g')
    //   .attr('id', 'id');

    // let xScale: d3.Scale;
    // let yScale: d3.Scale;
    // let extents: Extents;

    // from the source config object
    
    // right now we're starting at the pane level 
    // using a hardcoded config object with one pane in a pane array
    // console.log('cC rC --------------- Begin pane -------------------');

    // pane 
    // console.log('cC rC renderConfig panes: ', this.renderConfig.panes);

    if (!!this.renderConfig.panes) {

      for (const pane of this.renderConfig.panes) {

        for (const layer of pane.layerConfigs) {
          // extents, x/y scale/axis here

          // need to tell utils what input to use for x axis extents

          // extents = utils.generateExtents(data, 'callPrice', 'callPrice');
          // console.log('cD rC extents: ', extents);



          // xScale = utils.generateXScale(extents.xMin, extents.xMax, layout);
          // const xAxis = this.generateXAxis(xScale, extents, layout, layerConfig);


          for (const series of layer.series) {


            for (const plot of series.plots) {

              // console.log('cC rC deep inside a plot here... ill get back to you...', plot);

              // generate plots here

            }
          }
        }
      }

  }
    
    // layer series plot

    // ----------- Layer extents ----------------
    // minTarget = series.minExtentsTarget ?? EXTENTS_LOW_TARGET_MAP.get(series.seriesName);
    // maxTarget = series.maxExtentsTarget ?? EXTENTS_HIGH_TARGET_MAP.get(series.seriesName);
    // extents = utils.generateExtents(this.dataBS.value, minTarget, maxTarget);




    // -------- Generate Layer X Scale and Axis -------

    // xScale = utils.generateXScale(extents.xMin, extents.xMax, layout);
    //   const xAxis = this.generateXAxis(xScale, extents, layout, layerConfig);
      
    //   renderItem.append(() => xAxis.node());


    // ------------- Generate Layer Y Scale and Axis -----------------------

    // yScale = this.generateYScale(extents.yMin, extents.yMax, layout, layerConfig.yAxisConfig.type);
    // const yAxis = this.generateYAxis(yScale, extents, layout, layerConfig.idLabel, paneConfig.paneNumber, layerConfig.yAxisConfig.location);
        
    // renderItem.append(() => yAxis.node());


    // -------- generate plots -----------------------------------

    // const renderablePlot = this.generateRenderablePlot(this.dataBS.value, xScale, yScale, plot, paneConfig.paneNumber, layerConfig.layerNumber, plot.target);
        
    //     renderItem.append(() => renderablePlot.node());

    // return renderItem;




  }

  renderPlaceholderSvg() {
    const dims = this.containerDimsBS.value;
    const pane = d3.create('svg')
      .attr('width', dims.width)
      .attr('height', dims.height)
      ;

    const renderItem = d3.create('svg:g')
    .attr('id', 'like its a g dude')
    ;

    const dweezil = d3.create('svg:rect')
      .attr('id', 'yo its me dweezil')
      .attr('height', dims.height)
      .attr('width', dims.width)
      // .attr('stroke', 'darkblue')
      .attr('fill', 'lightblue')
      // .attr('stroke-width', '3.5')
      // .attr('transform', `translate(${dims.x}, ${dims.y})`)
      ;

    renderItem.append(() => dweezil.node());  // renderItem is a g
    pane.append(() => renderItem.node()); // can also just append dweezil.node()

    d3.select('svg').remove();
    d3.select('#panelRoot')
      .attr('top', this.containerDimsBS.value.margin.top)
      .attr('left', this.containerDimsBS.value.margin.left)
      .attr('width', this.containerDimsBS.value.width)
      .attr('height', this.containerDimsBS.value.height)
      // .attr('height', 500)
      .append(() => pane.node()) 
  }

}

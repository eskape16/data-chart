var Plottable = require("plottable");
var getLinearRegressionData = require ('./calculations');

var getChartTemplate = function(dt, mode) {
  var plotsToDisplay = [];
  var linesToDisplay = [];
  var colors = [
    {"scatter":"#FF8A80","line":"#EF5350"},
    {"scatter":"#B9F6CA","line":"#66BB6A"},
    {"scatter":"#F4FF81","line":"#D4E157"}
  ];

  //create scale for the axes
  var xScale = new Plottable.Scales.Linear();
  var yScale = new Plottable.Scales.Linear();
  // a Scale takes data values (which determine the domain) and maps them to pixel values (the range)

  //create x and y axes
  var xAxis = new Plottable.Axes.Numeric(xScale, 'bottom');
  var yAxis = new Plottable.Axes.Numeric(yScale, 'left');
  //an Axis takes as params the scale and a string('bottom','top','left','right') for the orientation(positioning)
  var xLabel = new Plottable.Components.AxisLabel("X-Axis Label", "0");//? second param?
  var yLabel = new Plottable.Components.AxisLabel("Y-Axis Label", "270");
  //create the plot

  dt.forEach(function(data, idx){
    var plotScattered = new Plottable.Plots.Scatter();
    var colorObj = colors[idx];

    //set Accesors
    plotScattered.x(function(d){ return d.x; }, xScale);
    plotScattered.y(function(d){ return d.y; }, yScale);
    plotScattered.attr("fill", function(d) { return colorObj.scatter; });

    var dataset = new Plottable.Dataset(data);
    plotScattered.addDataset(dataset);

    plotsToDisplay.push(plotScattered);

    if(mode === "linear"){
      var linearData = getLinearRegressionData(data);
      var linearDataset = new Plottable.Dataset(linearData);
      var linearPlot = new Plottable.Plots.Line()
        .addDataset(linearDataset)
        .x(function(d) { return d.x; }, xScale)
        .y(function(d) { return d.y; }, yScale)
        .attr("stroke", function(d) { return colorObj.line; });

      linesToDisplay.push(linearPlot);
    }
  });

  //create table to put together
  var mergedPlots = new Plottable.Components.Group(plotsToDisplay.concat(linesToDisplay));

  var chart = new Plottable.Components.Table([
    [yLabel,yAxis, mergedPlots],
    [ null, null, xAxis],
    [null, null, xLabel]
  ]);

  return chart;
};


module.exports = getChartTemplate;

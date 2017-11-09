var getData = function() {

  $.ajax({
    url: '/datasets',
    success: function(data) {
      drawChart(data);
    },
    dataType: "JSON"
  });
};
//transform an array of objects to 2-D array
var transformDataset = function (arr) {
  var arrNew = arr.map(function(pair){
    return [pair.x, pair.y];
  });
  return arrNew;
}


//From a given dataset return its linear regression by 'x' using simple-statistics
//ss.linearRegression : returns object of slope and y-intercept keys from a 2-D array of numeric data
//ss.linearRegressionLine: Given the output of linearRegression: an object with m and b values indicating slope and intercept, respectively, generate a line function that translates x values into y values
var getLinearRegressionData = function(data) {

  var flatData = transformDataset(data);
  var linearRegrLine = ss.linearRegressionLine(ss.linearRegression(flatData));

  return data.map(function(pair){
    var x = pair.x;
    return {"x": pair.x,
           "y": linearRegrLine(pair.x)}
  });
}


var drawChart = function(dt) {

  var data = dt[0];

  //create scale for the axes
  var xScale = new Plottable.Scales.Linear();
  var yScale = new Plottable.Scales.Linear();
  // a Scale takes data values (which determine the domain) and maps them to pixel values (the range)

  //create x and y axes
  var xAxis = new Plottable.Axes.Numeric(xScale, 'bottom');
  var yAxis = new Plottable.Axes.Numeric(yScale, 'left');
  //an Axis takes as params the scale and a string('bottom','top','left','right') for the orientation(positioning)
  var xLabel = new Plottable.Components.AxisLabel("Productivity", "0");//? second param?
  var yLabel = new Plottable.Components.AxisLabel("Number of Songs", "270");
  //create the plot

  var plotScattered = new Plottable.Plots.Scatter();
  //set Accesors
  plotScattered.x(function(d){ return d.x; }, xScale);
  plotScattered.y(function(d){ return d.y; }, yScale);
  plotScattered.attr("fill", function(d) { return "yellow"; });

  var dataset = new Plottable.Dataset(data);
  plotScattered.addDataset(dataset);

  var linearData = getLinearRegressionData(data);
  var linearDataset = new Plottable.Dataset(linearData);
  var linearPlot = new Plottable.Plots.Line()
    .addDataset(linearDataset)
    .x(function(d) { return d.x; }, xScale)
    .y(function(d) { return d.y; }, yScale)
    .attr("stroke", function(d) { return "green"; });

  //create table to put together
  var mergedPlots = new Plottable.Components.Group([plotScattered, linearPlot]);

  var chart = new Plottable.Components.Table([
    [yLabel,yAxis, mergedPlots],
    [ null, null, xAxis],
    [null, null, xLabel]
  ]);

  chart.renderTo("#basic-chart");
};

$(document).ready(function() {
  getData();
});

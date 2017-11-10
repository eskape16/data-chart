var $ = require("jquery");
var ss = require("simple-statistics");
var getChartTemplate = require("./chart");
var rawData = [];

var getData = function() {
  $.ajax({
    url: '/datasets',
    success: function(data) {
      rawData = data;
      drawChart(data);
    },
    dataType: "JSON"
  });
};

var drawChart = function(dt, mode) {
  var chart = getChartTemplate(dt,mode);
  $("#basic-chart").empty();
  chart.renderTo("#basic-chart");
};

var toggleChartLines = function(ev){
  var btn = $(ev.target);
  var next, btnText;

  switch (btn.data("current")) {
    case "linear":
      next = "none";
      btnText = "Show Linear Regression";
    break;
    default:
      next = "linear";
      btnText = "Hide Linear Regression";
    break;
  }
  btn.text(btnText).data("current", next);
  drawChart(rawData, next);
}

$(document).ready(function() {
  $("#toggle-line").on("click", toggleChartLines);
  getData();
});

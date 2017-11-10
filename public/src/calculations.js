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

export default getLinearRegressionData;

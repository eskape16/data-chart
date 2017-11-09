const min = 0,
      max = 100,
      minItems = 300,
      maxItems = 500;

const getRandomNum = (min,max) => {
  return Math.random()*(max-min)+min;
}
//set number of items for the array
const getNumberOfItems = (minItems, maxItems) => {
  return Math.floor(getRandomNum(minItems,maxItems));
  //console.log("Range: "+min+"-"+max+" Number of items: "+num);
}

const createSingleDataset = () => {
  const data = [];
  const numOfItems = getNumberOfItems(minItems, maxItems);
  for (let i = 0; i <= numOfItems; i++) {
    const obj = {
      "x": getRandomNum(min,max),
      "y": getRandomNum(min,max)
    }
    data.push(obj);
  }
  //console.log(data);
  return data;
}

const createDatasets = (n) => {
  const data = [];
  for(let i = 0; i < n; i++) {
    data.push(createSingleDataset());
  }
  return data;
}

module.exports = createDatasets;

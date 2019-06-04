// Use the popper library to add poppers to various page elements
// https://popper.js.org/

// Or use premonish to guide people to the information we need next
// https://mathisonian.github.io/premonish/

// Current weight dropdown
// var weight = ["100", "125", "150", "175", "200", "250", "300"];

// function init2w() {
//   var selector = d3.select('#selDatasetWeight')
//   weight.forEach(w => {
//     selector
//       .append("option")
//       .text(w)
//       .property("value", w);
//   });
// };


// Daily calorie dropdown
// Start with 1000 calories and end with 3200 by 100s
// Use .well and #calorie

var calories = ["1000", "1250", "1500", "1750", "2000", "2500", "3000"];

function init3c(array) {
  var selector = d3.select('#selDatasetCalories')
  calories.forEach(c => {
    selector
      .append("option")
      .text(c)
      .property("value", c);
  });
};
init3c(calories);

var goal = document.getElementById('selDatasetCalories').value
document.getElementById('selDatasetCalories').addEventListener('change', function () {
  goal = this.value
  console.log(goal)
})

function buildBar(sample) {

  var goal = document.getElementById('selDatasetCalories').value

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartsURL = "/macros";
  d3.json(chartsURL).then(function (data) {

    var foodItem = data[sample]
    var nutriKey = [];
    var nutriValue = [];

    //get calorie data 
    for (let nutriData in foodItem) {
      if (nutriData == "Calories") {
        nutriValue.push(foodItem[nutriData])
        nutriKey.push(nutriData)
      }
    }


    //  @TODO: Build a Bar Chart
    var canvas = d3.select("#barDiv")
      .append("svg:svg")
      .attr("width", 300)//canvasWidth)
      .attr("height", 300);//canvasHeight);

    var itemCal = parseInt(nutriValue)

    var yLabel = [sample]

    var trace1 = {
      x: [itemCal],
      y: [sample],
      name: 'Menu Item Calories',
      orientation: 'h',
      marker: {
        color: 'rgba(55,128,191,0.6)',
        width: 1
      },
      type: 'bar'
    };

    var trace2 = {
      x: [goal - itemCal],
      y: [sample],
      name: 'Calories Left Today',
      orientation: 'h',
      type: 'bar',
      marker: {
        color: 'rgba(255,153,51,0.6)',
        width: 1
      }
    };

    var data = [trace1, trace2];
    console.log(data)

    var layout = {
      title: 'Calories for Selected Item',
      barmode: 'stack'
    };

    Plotly.newPlot('barDiv', data, layout);
  })
}

// Calorie reader
function buildPie(sample) {


  // @TODO: Use `d3.json` to fetch the sample data for the plots
  var chartsURL = "/macros";
  d3.json(chartsURL).then(function (data) {

    var foodItem = data[sample]
    var nutriKey = [];
    var nutriValue = [];

    //get macros data 
    for (let nutriData in foodItem) {
      if (nutriData != "Calories") {
        nutriValue.push(foodItem[nutriData])
        nutriKey.push(nutriData)
      }
    }

    //  @TODO: Build a Pie Chart
    var canvas = d3.select("#pie")
      .append("svg:svg")
      .attr("width", 300)//canvasWidth)
      .attr("height", 300);//canvasHeight);


    var pieData = [{
      values: nutriValue.slice(0, 4),
      labels: nutriKey.slice(0, 4),
      type: 'pie',
    }];

    var pielayout = {
      showlegend: true,
      title: 'Macros Breakdown for Selected Item',
    };


    Plotly.newPlot('pie', pieData, pielayout);

  })
}


var chartsURL = "/exercise";
function buildLollipop() {
  

  d3.json(chartsURL).then(function (data) {
    random_items = []
    values = Object.entries(data)
    console.log(values)
    counter = 0;
    for (i = 0; i < 10; i++) {
      var item = values[Math.floor(Math.random() * values.length)]
      console.log(item)
      random_items.push(item)
    }

    var trace1 = {
      x: [100, 125, 150, 175, 200, 250, 300],
      y: Object.values(random_items[1][1]),
      mode: 'markers',
      type: 'scatter'
    };

    var trace2 = {
      x: [100, 125, 150, 175, 200, 250, 300],
      y: Object.values(random_items[2][1]),
      mode: 'markers',
      type: 'scatter'
    };

    var trace3 = {
      x: [100, 125, 150, 175, 200, 250, 300],
      y: Object.values(random_items[3][1]),
      mode: 'markers',
      type: 'scatter'
    };

    var data = [trace1, trace2, trace3];

    Plotly.newPlot('lollipop', data);
});
}

  function init() {
    // grab a reference to the dropdown select element "#item"
    var selector = d3.select("#selDatasetItem");

    // use list of sample names to populate the select options
    d3.json("/macros").then((foodNames) => {
      var items = Object.keys(foodNames)
      items.forEach((food) => {
        // console.log(food)
        selector
          .append("option")
          .text(food)
          .property("value", food);
      });
      const firstSample = "8-Grain Roll";
      console.log(firstSample);
      buildPie(firstSample);
      buildBar(firstSample);
      buildLollipop()
    });
  };


  function optionChanged(newSample) {
    // console.log(newSample);
    buildPie(newSample);
    buildBar(newSample);
    buildLollipop()
  }


  init();
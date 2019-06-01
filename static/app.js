// Use the popper library to add poppers to various page elements
// https://popper.js.org/

// Or use premonish to guide people to the information we need next
// https://mathisonian.github.io/premonish/

// Food item dropdown
  // Pulls from full menu csv
  // Use .well and #item

// Current weight dropdown
  // Pulls from exercise csv
  // Use .well and #weight

// Daily calorie dropdown
  // Start with 1000 calories and end with 3200 by 100s
  // Use .well and #calorie

// Calorie reader
  // Pulls from full menu csv
  // Use #calories-viz

// Nutrition word cloud
  // Pulls from full menu csv
  // Use #words-viz section

// Nutrition aster plot
  // Pulls from full menu csv
  // Fat, carbs, fiber, protein
  // Number of calories in center
  // Use #aster-plot

// Lollipop chart
  // Pulls from full menu csv + exercise csv
  // 5 random activities pop up
  // Use #lollipop

// Retrieve data from the CSV file and execute everything below
// NOTE: THIS IS FROM A CLASS ASSIGNMENT AND NEEDS TO BE UPDATED FOR OUR DATA
// Also need to pull in second csv file
// d3.csv("hairData.csv", function(err, hairData) {
//   if (err) throw err;

//   // parse data
//   hairData.forEach(function(data) {
//     data.hair_length = +data.hair_length;
//     data.num_hits = +data.num_hits;
//     data.num_albums = +data.num_albums;
//   });

//   // xLinearScale function above csv import
//   var xLinearScale = xScale(hairData, chosenXAxis);

//   // Create y scale function
//   var yLinearScale = d3.scaleLinear()
//     .domain([0, d3.max(hairData, d => d.num_hits)])
//     .range([height, 0]);

//   // Create initial axis functions
//   var bottomAxis = d3.axisBottom(xLinearScale);
//   var leftAxis = d3.axisLeft(yLinearScale);

//   // append x axis
//   var xAxis = chartGroup.append("g")
//     .classed("x-axis", true)
//     .attr("transform", `translate(0, ${height})`)
//     .call(bottomAxis);

//   // append y axis
//   chartGroup.append("g")
//     .call(leftAxis);

//   // append initial circles
//   var circlesGroup = chartGroup.selectAll("circle")
//     .data(hairData)
//     .enter()
//     .append("circle")
//     .attr("cx", d => xLinearScale(d[chosenXAxis]))
//     .attr("cy", d => yLinearScale(d.num_hits))
//     .attr("r", 20)
//     .attr("fill", "pink")
//     .attr("opacity", ".5");

//   // Create group for  2 x- axis labels
//   var labelsGroup = chartGroup.append("g")
//     .attr("transform", `translate(${width / 2}, ${height + 20})`);

//   var hairLengthLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 20)
//     .attr("value", "hair_length") // value to grab for event listener
//     .classed("active", true)
//     .text("Hair Metal Ban Hair Length (inches)");

//   var albumsLabel = labelsGroup.append("text")
//     .attr("x", 0)
//     .attr("y", 40)
//     .attr("value", "num_albums") // value to grab for event listener
//     .classed("inactive", true)
//     .text("# of Albums Released");

//   // append y axis
//   chartGroup.append("text")
//     .attr("transform", "rotate(-90)")
//     .attr("y", 0 - margin.left)
//     .attr("x", 0 - (height / 2))
//     .attr("dy", "1em")
//     .classed("axis-text", true)
//     .text("Number of Billboard 500 Hits");

//   // updateToolTip function above csv import
//   var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//   // x axis labels event listener
//   labelsGroup.selectAll("text")
//     .on("click", function() {
//       // get value of selection
//       var value = d3.select(this).attr("value");
//       if (value !== chosenXAxis) {

//         // replaces chosenXAxis with value
//         chosenXAxis = value;

//         // console.log(chosenXAxis)

//         // functions here found above csv import
//         // updates x scale for new data
//         xLinearScale = xScale(hairData, chosenXAxis);

//         // updates x axis with transition
//         xAxis = renderAxes(xLinearScale, xAxis);

//         // updates circles with new x values
//         circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

//         // updates tooltips with new info
//         circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

//         // changes classes to change bold text
//         if (chosenXAxis === "num_albums") {
//           albumsLabel
//             .classed("active", true)
//             .classed("inactive", false);
//           hairLengthLabel
//             .classed("active", false)
//             .classed("inactive", true);
//         }
//         else {
//           albumsLabel
//             .classed("active", false)
//             .classed("inactive", true);
//           hairLengthLabel
//             .classed("active", true)
//             .classed("inactive", false);
//         }
//       }
//     });
// });













// function buildMetadata(sample) {

//     // @TODO: Complete the following function that builds the metadata panel
   
//     // Use `d3.json` to fetch the metadata for a sample
//     // Use d3 to select the panel with id of `#sample-metadata`
//     d3.json(`/metadata/${sample}`).then(function(data) {
   
//       var panel = d3.select('#sample-metadata');
   
//       // Use `.html("") to clear any existing metadata
//       panel.html("")
   
//       // Use `Object.entries` to add each key and value pair to the panel
//       // Hint: Inside the loop, you will need to use d3 to append new
//       // tags for each key-value in the metadata.
//       Object.entries(data).forEach(([key,value]) => {
//         // Add new line
//         var line = panel.append("p");
//         line.text(`${key}: ${value}`);
//       });
   
   
//       // BONUS: Build the Gauge Chart
//       buildGauge(data.WFREQ);
//     })
//   }
   
//   function buildCharts(sample) {
   
//     // @TODO: Use `d3.json` to fetch the sample data for the plots
//     d3.json(`/samples/${sample}`).then(function(data){
     
//       // @TODO: Build a Bubble Chart using the sample data
//       var bubbleData = [{
//         x: data["otu_ids"],
//         y: data["sample_values"],
//         text: data["otu_labels"],
//         type: "scatter",
//         mode: "markers",
//         marker: {
//           color: data["otu_ids"],
//           size: data["sample_values"],
//         },
//       }];
   
//       // Create chart layout
//       var bubbleLayout = {
//         title: `<b>Biodiversity of sample ${sample}</b>`,
//         xaxis: {
//           title: "OTU ID",
//         },
//         yaxis: {
//           title: "Value",
//           range: [0, Math.max(data["sample_values"])]
//         }
//       };
   
//       // Insert into div id="bubble"
//       var bubble = document.getElementById("bubble");
//       Plotly.newPlot(bubble, bubbleData, bubbleLayout);
   
//       // @TODO: Build a Pie Chart
//       // HINT: You will need to use slice() to grab the top 10 sample_values,
//       // otu_ids, and labels (10 each).
   
//       // Empty array
//       var dataArray = [];
   
//       // Loop through data to fill array
//       for (var i=0; i<data.otu_ids.length; i++) {
//         dataArray.push({
//           "sample_values": data.sample_values[i],
//           "otu_ids": data.otu_ids[i],
//           "otu_labels": data.otu_labels[i]
//         })
//       }
   
//       // Sort array by sample values
//       var dataArraySorted = dataArray.sort((a, b) =>
//         // Convert items in array to numbers and sort in numeric order
//         parseFloat(b.sample_values) - parseFloat(a.sample_values)
//       );
//       // Prep data for plot; use .map to call each function for every item in array
//       var pieData = [{
//         labels: dataArraySorted.map(d => d["otu_ids"]).slice(0, 10),
//         values: dataArraySorted.map(d => d["sample_values"]).slice(0,10),
//         text: dataArraySorted.map(d => d["otu_labels"]).slice(0, 10),
//         type: "pie",
//         name: dataArraySorted.map(d => d["otu_ids"]).slice(0, 10),
//         "textinfo": "percent",
//       }];
   
//       // Prep layout for each plot
//       var pieLayout = {
//         title: `<b>Top 10 OTU of Sample ${sample}</b>`,
//       };
//       // Insert into html div id="pie"
//       var pie = document.getElementById("pie");
//         // Use pie, pieData, and pieLayout variables to create Plotly pie chart
//         Plotly.newPlot(pie, pieData, pieLayout);
//     });
//   }
   
//   // Population dropdown menu
//   function init() {
//     // Grab a reference to the dropdown select element "selDataset"
//     var selector = d3.select("#selDataset");
   
//     // Use the list of sample names to populate the select options
//     d3.json("/names").then((sampleNames) => {
//       sampleNames.forEach((sample) => {
//         selector
//           .append("option")
//           .text(sample)
//           .property("value", sample);
//       });
   
//       // Use the first sample from the list to build the initial plots
//       const firstSample = sampleNames[0];
//       buildCharts(firstSample);
//       buildMetadata(firstSample);
//     });
//   }
   
//    // Create function to update menu when different item is selected
//   function optionChanged(newSample) {
//     // Fetch new data each time a new sample is selected
//     buildCharts(newSample);
//     buildMetadata(newSample);
//   }
   
//    // Initialize the dashboard
//    init(); 

function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
   
    // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
    d3.json(`/metadata/${sample}`).then(function(data) {
   
      var panel = d3.select('#sample-metadata');
   
      // Use `.html("") to clear any existing metadata
      panel.html("")
   
      // Use `Object.entries` to add each key and value pair to the panel
      // Hint: Inside the loop, you will need to use d3 to append new
      // tags for each key-value in the metadata.
      Object.entries(data).forEach(([key,value]) => {
        // Add new line
        var line = panel.append("p");
        line.text(`${key}: ${value}`);
      });
   
   
      // BONUS: Build the Gauge Chart
      buildGauge(data.WFREQ);
    })
  }
   
  function buildCharts(sample) {
   
    // @TODO: Use `d3.json` to fetch the sample data for the plots
    d3.json(`/samples/${sample}`).then(function(data){
     
      // @TODO: Build a Bubble Chart using the sample data
      var bubbleData = [{
        x: data["otu_ids"],
        y: data["sample_values"],
        text: data["otu_labels"],
        type: "scatter",
        mode: "markers",
        marker: {
          color: data["otu_ids"],
          size: data["sample_values"],
        },
      }];
   
      // Create chart layout
      var bubbleLayout = {
        title: `<b>Biodiversity of sample ${sample}</b>`,
        xaxis: {
          title: "OTU ID",
        },
        yaxis: {
          title: "Value",
          range: [0, Math.max(data["sample_values"])]
        }
      };
   
      // Insert into div id="bubble"
      var bubble = document.getElementById("bubble");
      Plotly.newPlot(bubble, bubbleData, bubbleLayout);
   
      // @TODO: Build a Pie Chart
      // HINT: You will need to use slice() to grab the top 10 sample_values,
      // otu_ids, and labels (10 each).
   
      // Empty array
      var dataArray = [];
   
      // Loop through data to fill array
      for (var i=0; i<data.otu_ids.length; i++) {
        dataArray.push({
          "sample_values": data.sample_values[i],
          "otu_ids": data.otu_ids[i],
          "otu_labels": data.otu_labels[i]
        })
      }
   
      // Sort array by sample values
      var dataArraySorted = dataArray.sort((a, b) =>
        // Convert items in array to numbers and sort in numeric order
        parseFloat(b.sample_values) - parseFloat(a.sample_values)
      );
      // Prep data for plot; use .map to call each function for every item in array
      var pieData = [{
        labels: dataArraySorted.map(d => d["otu_ids"]).slice(0, 10),
        values: dataArraySorted.map(d => d["sample_values"]).slice(0,10),
        text: dataArraySorted.map(d => d["otu_labels"]).slice(0, 10),
        type: "pie",
        name: dataArraySorted.map(d => d["otu_ids"]).slice(0, 10),
        "textinfo": "percent",
      }];
   
      // Prep layout for each plot
      var pieLayout = {
        title: `<b>Top 10 OTU of Sample ${sample}</b>`,
      };
      // Insert into html div id="pie"
      var pie = document.getElementById("pie");
        // Use pie, pieData, and pieLayout variables to create Plotly pie chart
        Plotly.newPlot(pie, pieData, pieLayout);
    });
  }
   
  // Population dropdown menu
  function init() {
    // Grab a reference to the dropdown select element "selDataset"
    var selector = d3.select("#selDataset");
   
    // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
   
      // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
   
   // Create function to update menu when different item is selected
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
   
   // Initialize the dashboard
   init(); 

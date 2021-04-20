console.log("app.js loaded!");

// The code in these files is based on Dom's description in office hours.

function InitDashboard() {
  console.log("InitDashboard()");

  // Update the dropdown
  var selector = d3.select("#selDataset");

  d3.json("data/samples.json").then((importedData) => {
    console.log(importedData);
      
    var sampleNames = importedData.names;

    sampleNames.forEach(sampleId => {
      selector.append("option")
        .text(sampleId)
        .property("value", sampleId);

    });
  });

}
InitDashboard();



  // Update the bargraph
  // Update the bubblechart
  // Update the demographic information

// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as importedData


 
  // Trace1 for the otu_ids data
  // var trace1 = {
  //   x: data.map(row => row.otu_ids),
  //   y: data.map(row => row.otu_labels),
  //   text: data.map(row => row.otu_labels),
  //   // name: "Greek",
  //   type: "bar",
  //   orientation: "h"
  // };

  // // data
  // var chartData = [trace1];

  // // Apply the group bar mode to the layout
  // var layout = {
  //   title: "",
  //   margin: {
  //     l: 100,
  //     r: 100,
  //     t: 100,
  //     b: 100
  //   }
  // };

  // // Render the plot to the div tag with id "plot"
  // Plotly.newPlot("bar", chartData, layout);

  
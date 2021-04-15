// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as importedData
d3.json("data/samples.json").then((importedData) => {
  console.log(importedData);
  var data = importedData;

    // // Grab values from the response json object to build the plots
    var sampleFilter = data.names.samples
    // var otu_ids = data.samples.otu_ids;
    // var sample_values = data.samples.sample_values;
    // var otu_labels = data.samples.otu_labels;
 
    // // Print the names of the columns
    console.log(data.samples);
    // // Print the data for each day
    // // console.log(otu_ids);
    // // var dates = data.dataset.data.map(row => row[0]);
    // // // console.log(dates);
    // var otus = data.names.map(row => row[4]);
    // console.log(otus);
    // for (var i = 0; i < samples.length; i++) {
    // console.log(samples[i]);
    // console.log("PAIR " + i + ": " + obj[i].cid);
    // }

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
});
  
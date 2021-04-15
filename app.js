// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("data/samples.json").then((importedData) => {
  // console.log(importedData);
  var data = importedData;

  // Sort the data array using the otu_ids value
  data.sort(function(a, b) {
    return parseFloat(b.otu_ids) - parseFloat(a.otu_ids);
  });

  // Slice the first 10 objects for plotting
  data = data.slice(0, 10);

  // Reverse the array due to Plotly's defaults
  data = data.reverse();

  // Trace1 for the otu_ids data
  var trace1 = {
    x: data.map(row => row.otu_ids),
    y: data.map(row => row.sample_labels),
    text: data.map(row => row.otu_labels),
    name: "Greek",
    type: "bar",
    orientation: "h"
  };

  // data
  var chartData = [trace1];

  // Apply the group bar mode to the layout
  var layout = {
    title: "",
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };

  // Render the plot to the div tag with id "plot"
  Plotly.reStyle("bar", chartData, layout);
});
  
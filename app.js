console.log("app.js loaded!");

// The code in these files is based on Dom's description in office hours.

function DrawBargraph(sampleId) {
  console.log(`DrawBargraph(${sampleId})`);

  d3.json("data/samples.json").then(data => {
    // console.log(data);

    var samples = data.samples;
    var resultArray = samples.filter(s => s.id == sampleId);
    // console.log(resultArray);
    var result = resultArray[0];
    // console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // console.log(sample_values);

    yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

    var barData = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      type: "bar",
      text: otu_labels.slice(0, 10).reverse(),
      orientation: "h"
    }

    var barArray = [barData];

    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {t: 30, 1: 150}
    }

    Plotly.newPlot("bar", barArray, barLayout)
  });
}

function DrawBubblechart(sampleId) {
  console.log(`DrawBubblechart(${sampleId})`);
}

function optionChanged(newSampleId) {
  console.log(`User selected ${newSampleId}`);

  DrawBargraph(newSampleId);
  DrawBubblechart(newSampleId);
  ShowMetadata(newSampleId);
}

function ShowMetadata(sampleId) {
  console.log(`ShowMetadata(${sampleId})`);
}
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

    var id = sampleNames[0];

      // Draw the graphs and the metadata

    DrawBargraph(id);
    DrawBubblechart(id);
    ShowMetadata(id);
  });

}
InitDashboard();



 

  
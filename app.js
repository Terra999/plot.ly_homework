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

    var bubbleData = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        color: otu_ids,
        colorscale: 'Jet',
        size: sample_values,
      }
 
    };

    var bubbleArray = [bubbleData];

    var bubbleLayout = {
      title: 'Bubble Diversity by OTU IDs',
      xaxis: {
        title: 'OTU ID',
      },
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    Plotly.newPlot("bubble", bubbleArray, bubbleLayout)
  });
}

function optionChanged(newSampleId) {
  console.log(`User selected ${newSampleId}`);

  DrawBargraph(newSampleId);
  DrawBubblechart(newSampleId);
  ShowMetadata(newSampleId);
}

function ShowMetadata(sampleId) {
  console.log(`ShowMetadata(${sampleId})`);

  // Update the Demographic Info field
  var selector = d3.select("#sample-metadata");

  selector.html("");

  d3.json("data/samples.json").then(data => {
    console.log(data);

    var metadata = data.metadata;
    var resultArray = metadata.filter(m => m.id == sampleId);
    // console.log(resultArray);
    var result = resultArray[0];
    var wfreq = result.wfreq;

    showGauge(wfreq);


    console.log(result);

    // Code help from TA Farshad
    Object.entries(result).forEach(([key, value]) => {
      var item = `${key.toUpperCase()}: ${value}`;
      selector.append("h6").text(item);
    });
  });

}   
function InitDashboard() {
  // console.log("InitDashboard()");

  // Update the dropdown
  var selector = d3.select("#selDataset");

  d3.json("data/samples.json").then((importedData) => {
    // console.log(importedData);
      
    var sampleNames = importedData.names;

    sampleNames.forEach(sampleId => {
      selector.append("option")
        .text(sampleId)
        .property("value", sampleId);

    });

    var id = sampleNames[0];
      console.log(id);

      // Draw the graphs and the metadata

    DrawBargraph(id);
    DrawBubblechart(id);
    ShowMetadata(id);
  });

}
InitDashboard();

// Create the gauge for washing frequency
function showGauge(washingFreq) {
  // console.log("showGauge");
  var data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: washingFreq,
      title: {text: "Belly Button Washing Frequency", font: {size: 24}},
      delta: {reference: 400, increasing: {color: "RebeccaPurple"}},
      gauge: {
        axis: {range: [null, 9], tickwidth: 1, tickcolor: "darkblue"},
        bar: {color: "darkblue"},
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          {range: [0, 1], color: "rgba(255, 248, 220, .5)"},
          {range: [1, 2], color: "rgba(255, 228, 196, .5)"},
          {range: [2, 3], color: "rgba(222, 184, 135, .5)"},
          {range: [3, 4], color: "rgba(188, 143, 143, .5)"},
          {range: [4, 5], color: "rgba(244, 164, 96, .5)"},
          {range: [5, 6], color: "rgba(218, 165, 32, .5)"},
          {range: [6, 7], color: "rgba(184, 134, 11, .5)" },
          {range: [7, 8], color: "rgba(205, 133, 63, .5)" },
          {range: [8, 9], color: "rgba(210, 105, 30, .5)" },
        ],
        threshold: {
          line: {color: "red", width: 4},
          thickness: 0.75,
          value: 490
        }
      }
    }
  ];

  var layout = {
    width: 400,
    height: 300,
    margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "darkblue", family: "Arial" }
  };

  Plotly.newPlot('gauge', data, layout);
}



 

  
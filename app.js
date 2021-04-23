console.log("app.js loaded!");

// The code for the DrawBargraph and InitDashboard functions are based on Dom's description in office hours.


// Function to create the horizontal bar graph.
function DrawBargraph(sampleId) {
  console.log(`DrawBargraph(${sampleId})`);

  // Read data from the json file
  d3.json("data/samples.json").then(data => {
    // console.log(data);

    // Filter based on sample id values
    var samples = data.samples;
    var resultArray = samples.filter(s => s.id == sampleId);
    // console.log(resultArray);
    var result = resultArray[0];
    // console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // console.log(sample_values);

    // Show only the top 10 OTU's in descending order
    yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

    // Define the bar graph components
    var barData = {
      x: sample_values.slice(0, 10).reverse(),
      y: yticks,
      type: "bar",
      text: otu_labels.slice(0, 10).reverse(),
      orientation: "h"
    }

    // Use this data for the bar graph
    var barArray = [barData];

    // Use this layout information for the bar graph
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: {t: 30, 1: 150}
    }

    // This code tells Plotly to make a new bar graph using the data and layout
    // information above
    Plotly.newPlot("bar", barArray, barLayout)
  });
}

// Function to create the bubble graph.
function DrawBubblechart(sampleId) {
  console.log(`DrawBubblechart(${sampleId})`);

  // Read the json file
  d3.json("data/samples.json").then(data => {
    // console.log(data);

    // Filter based on sample id values
    var samples = data.samples;
    var resultArray = samples.filter(s => s.id == sampleId);
    // console.log(resultArray);
    var result = resultArray[0];
    // console.log(result);

    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    // console.log(sample_values);

    // Define the Bubble graph components
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

    // Use this data for the Bubble graph
    var bubbleArray = [bubbleData];

    // Use this layout information for the Bubble graph
    var bubbleLayout = {
      title: 'Bubble Diversity by OTU IDs',
      xaxis: {
        title: 'OTU ID',
      },
      showlegend: false,
      height: 600,
      width: 1200
    };
    
    // This code tells Plotly to make a new bubble graph using the data and layout
    // information above
    Plotly.newPlot("bubble", bubbleArray, bubbleLayout)
  });
}

// This function re-draws all the graphs when a new Id is selected in the drop-down
function optionChanged(newSampleId) {
  console.log(`User selected ${newSampleId}`);

  DrawBargraph(newSampleId);
  DrawBubblechart(newSampleId);
  ShowMetadata(newSampleId);
}

// Function to display the demographic information.
function ShowMetadata(sampleId) {
  console.log(`ShowMetadata(${sampleId})`);

  // Update the Demographic Info field
  var selector = d3.select("#sample-metadata");

  // Write data to the page
  selector.html("");

  // Read json information
  d3.json("data/samples.json").then(data => {
    console.log(data);

    // Filter by metadata: id
    var metadata = data.metadata;
    var resultArray = metadata.filter(m => m.id == sampleId);
    // console.log(resultArray);
    var result = resultArray[0];
    var wfreq = result.wfreq;

    showGauge(wfreq);
    console.log(result);

    // Code help from TA Farshad to populate table with metadata/demographic information
    Object.entries(result).forEach(([key, value]) => {
      var item = `${key}: ${value}`;
      selector.append("h6").text(item);
    });
  });
}   

// Function for the drop-down selector
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

  // Use this data for the gauge
  var data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: washingFreq,
      title: {text: "Belly Button Washing Frequency <br> Scrubs per Week", font: {size: 20}},
      delta: {reference: 400, increasing: {color: "RebeccaPurple"}},
      gauge: {
        axis: {range: [null, 9], tickwidth: 1, tickcolor: "darkblue"},
        bar: {color: "darkblue"},
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          {range: [0, 1], color: "rgba(102, 204, 255, .5)"},
          {range: [1, 2], color: "rgba(0, 204, 255, .5)"},
          {range: [2, 3], color: "rgba(0, 153, 153, .5)"},
          {range: [3, 4], color: "rgba(0, 204, 153, .5)"},
          {range: [4, 5], color: "rgba(0, 204, 102, .5)"},
          {range: [5, 6], color: "rgba(51, 204, 51, .5)"},
          {range: [6, 7], color: "rgba(0, 153, 0, .5)" },
          {range: [7, 8], color: "rgba(102, 153, 0, .5)" },
          {range: [8, 9], color: "rgba(102, 102, 51, .5)" },
        ],
        threshold: {
          line: {color: "red", width: 4},
          thickness: 0.75,
          value: 490
        }
      }
    }
  ];

  // Use this layout for the gauge
  var layout = {
    width: 400,
    height: 300,
    margin: { t: 40, r: 25, l: 25, b: 25 },
    paper_bgcolor: "white",
    font: { color: "black", family: "Arial" }
  };

  // This code tells Plotly to make a gauge using the data and layout information above
  Plotly.newPlot('gauge', data, layout);
}



 

  
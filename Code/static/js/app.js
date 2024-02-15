// Define the URL
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch data and update dropdown and charts
function updateCharts(url) {
    // Fetch JSON data from the URL
    d3.json(url).then(function(data) {
        // Extract sample names from the fetched data
        let sampleNames = data.names;

        // Update the dropdown menu options
        let dropdownMenu = d3.select("#selDataset");
        dropdownMenu.selectAll("option").remove(); 

        sampleNames.forEach(function(sample) {
            dropdownMenu.append("option")
                .attr("value", sample)
                .text(sample);
        });

        // Get the first sample name
        let firstSample = sampleNames[0];

        // Call functions to build charts with the first sample
        buildBarChart(firstSample, data);
        buildBubbleChart(firstSample, data);
        buildMetaData(firstSample, data);
    });
}

// Function to build the bar chart
function buildBarChart(selectedSample, jsonData) {
// Retrieve the sample data based on the selected sample
    let sampleData = jsonData.samples.find(item => item.id === selectedSample);

    // Sort data for top 10 OTUs
     let sortedData = sampleData.sample_values.slice(0, 10).reverse();
     let otuIds = sampleData.otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse();
     let otuLabels = sampleData.otu_labels.slice(0, 10).reverse();
     
     // Log sorted data, OTU IDs, and OTU labels
     console.log("Sorted data:", sortedData);
     console.log("OTU IDs:", otuIds);
     console.log("OTU labels:", otuLabels);

     // Create the horizontal bar chart
     let trace1 = {
         x: sortedData,
         y: otuIds,
         text: otuLabels,
         type: "bar",
         orientation: "h"
     };

     // Create Layout for Bar Chart
     let layout = {
         title: "Top 10 OTUs",
         xaxis: { title: "Sample Values" },
         yaxis: { title: "OTU IDs" },
     };

     let data = [trace1];
    
     // Plot Data with Plotly
     Plotly.newPlot("bar", data, layout);
 }

 // Function to build the bubble chart
 function buildBubbleChart(selectedSample, jsonData) {
     // Retrieve the sample data based on the selected sample
     let sampleData = jsonData.samples.find(item => item.id === selectedSample);

     // Define the trace for the bubble chart
     let trace2 = {
         x: sampleData.otu_ids,
         y: sampleData.sample_values,
         text: sampleData.otu_labels,
         mode: 'markers',
         marker: {
             size: sampleData.sample_values,
             color: sampleData.otu_ids,
             colorscale: 'Earth'
         }
     };

     let data = [trace2];

     // Define the layout for the bubble chart
     let layout = {
         title: 'Bubble Chart for OTU IDs',
         xaxis: { title: 'OTU IDs' },
         yaxis: { title: 'Sample Values' }
     };

     // Plot the bubble chart using Plotly
     Plotly.newPlot('bubble', data, layout);
 }

 // Function to build and display sample metadata
 function buildMetaData(selectedSample, jsonData) {
    // Retrieve the metadata for the selected sample
     let metadata = jsonData.metadata.find(item => item.id === parseInt(selectedSample));

     // Select the container for the metadata display
     let metadataContainer = d3.select("#sample-metadata");

     // Clear existing contents
     metadataContainer.html("");

     // Iterate through each key-value pair in the metadata object
     Object.entries(metadata).forEach(([key, value]) => {
         // Append the key-value pairs to the metadata container
         metadataContainer.append("p").text(`${key}: ${value}`);
     });
 }

// Function to handle dropdown change event
function optionChanged(newSample) {
    // Update the charts and metadata based on the newly selected sample
    d3.json(url).then(function(data) {
        buildBarChart(newSample, data);
        buildBubbleChart(newSample, data);
        buildMetaData(newSample, data); 
    });
}

// Call the function to initially update the dropdown and charts
updateCharts(url);

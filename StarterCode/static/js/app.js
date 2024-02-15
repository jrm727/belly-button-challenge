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
         yaxis: { title: "OTU IDs" }
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

// // Function to build and display sample metadata
// function buildMetaData(sample, data) {
//     // Retrieve the metadata for the selected sample
//     let metadata = data.metadata.find(item => item.id === parseInt(sample));

//     // Select the container for the metadata display
//     let metadataContainer = d3.select("#sample-metadata");

//     // Clear existing contents
//     metadataContainer.html("");

//     // Iterate through each key-value pair in the metadata object
//     Object.entries(metadata).forEach(([key, value]) => {
//         // Append the key-value pairs to the metadata container
//         metadataContainer.append("p").text(`${key}: ${value}`);
//     });
// }

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





       

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

//     * Use `sample_values` as the values for the bar chart.

//     * Use `otu_ids` as the labels for the bar chart.

//     * Use `otu_labels` as the hovertext for the chart.

//       ![bar Chart](https://static.bc-edx.com/data/dl-1-2/m14/lms/img/hw01.jpg)

// 3. Create a bubble chart that displays each sample.

//     * Use `otu_ids` for the x values.

//     * Use `sample_values` for the y values.

//     * Use `sample_values` for the marker size.

//     * Use `otu_ids` for the marker colors.

//     * Use `otu_labels` for the text values.

//     ![Bubble Chart](https://static.bc-edx.com/data/dl-1-2/m14/lms/img/bubble_chart.jpg)

// 4. Display the sample metadata, i.e., an individual's demographic information.

// 5. Display each key-value pair from the metadata JSON object somewhere on the page.

//     ![hw](https://static.bc-edx.com/data/dl-1-2/m14/lms/img/hw03.jpg)

// 6. Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:

//     ![hw](https://static.bc-edx.com/data/dl-1-2/m14/lms/img/hw02.jpg)

// 7. Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

// ### Advanced Challenge Assignment (Optional with no extra points earning)

// The following task is advanced and therefore optional.

// * Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

// * You will need to modify the example gauge code to account for values ranging from 0 through 9.

// * Update the chart whenever a new sample is selected.

//   ![Weekly Washing Frequency Gauge](https://static.bc-edx.com/data/dl-1-2/m14/lms/img/gauge.jpg)

// ### Hints

// * Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

// * Refer to the [Plotly.js documentation](https://plot.ly/javascript/) when building the plots.
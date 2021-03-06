// creating a function of Data plotting
function getPlot(id) {
    // getting data from the json file
    d3.json("samples.json").then((data)=> {
        console.log(data)
    
    // using a map function to get Washing Freq and set a variable to hold wfreq
        var wfreq = data.metadata.map(d => d.wfreq)

        console.log(`Washing Freq: ${wfreq}`)
        //filter sample values by id
        var samples = data.samples.filter(s => s.id.toString()=== id)[0];
        console.log(samples);

    // getting the top 10
    var samplevalues = samples.sample_values.slice(0, 10).reverse();
    //get only top 10 otu ids for the plot otu 
    var OTU_top = (samples.otu_ids.slice(0, 10)).reverse();
    // getting the otu id variable to the desired form for the plot
    var OTU_id = OTU_top.map (d => "OTU " + d)

    console.log(`OTU IDS: ${OTU_id}`)
    // get the top 10 labels for the plot
    var labels = samples.otu_labels.slice(0, 10);

        console.log(`Sample Values: ${samplevalues}`)
        console.log(`Id Values:${OTU_top}`)
    // create trace variable for the plot
    var trace = {
        x: samplevalues,
        y: OTU_id,
        text: labels,
        marker: {
            color: 'rgb(142,124,195)'},
        type: "bar",
        orientation: "h",
    };
    // create data array
    var data =[trace];

    //create layout variable to set plots layout
    var layout = {
        title: "Top 10 OTU",
        yaxis: {
            tickmode: "linear",
        },
        margin:{
            l: 100,
            r: 100,
            t: 100,
            b: 30
        }
    };
    // create the bar plot
    Plotly.newPlot("bar", data, layout);

    console.log(`ID: ${samples.otu_ids}`)

    // create the bubble chart
    var trace1 = {
        x: samples.otu_ids,
        y: samples.sample_values,
        mode: "markers",
        marker: {
            size: samples.sample_values,
            color: samples.otu_ids
        },
        text: samples.otu_labels
    };

    var layout_b = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1000

    };
    // create data array for the bubble chart
    var data1 = [trace1];
    // create the bubble plot
    Plotly.newPlot("bubble",data1, layout_b);
    // create a trace for the guage
    var data_g = [
        {
        domain: { x: [0, 1], y: [0, 1] },
        value: parseFloat(wfreq),
        title: { text: `Weekly Washing Frequency ` },
        type: "indicator",
        delta: { reference: null, increasing: { color: "purple"}},
        mode: "gauge+number+pointer",
        gauge: { axis: { range: [null, 9] },
                 steps: [
                  { range: [0, 2], color: "yellow" },
                  { range: [2, 4], color: "skyblue" },
                  { range: [4, 6], color: "lightyellow" },
                  { range: [6, 8], color: "lime" },
                  { range: [8, 9], color: "green" }
                ]}
            
        }
      ];
      // create a layout for the gauage
      var layout_g = {
          width: 700,
          height: 600,
          margin: {t: 20, b: 40, l:100, r:100 }
      };
      //plot the gauage
      Plotly.newPlot("gauge",data_g, layout_g);
      value:("")
    });
     
 }
        // create the function to get the necessary data
        function getInfo(id) {
        // read the json file to get data
    d3.json("samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata;

        console.log(metadata)   
        // filter metadata info by id
        var result = metadata.filter(meta => meta.id.toString() === id)[0];

        //using d3 to select demographic panel to put data
        var demographicInfo = d3.select("#sample-metadata");

        // empty the demographic info panel each time before getting new id info
        demographicInfo.html("");
        // grab the necessary demographic data for the id and append the info to the panel
        Object.entries(result).forEach((key) => {   
            demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n"); 
        });
    });

}
// create a function for the change event
function optionChanged(id) {
    getPlot(id);
    getInfo(id);
}
// create the function for the initial data rendering
function init() {
    // select dropdown menu 
    var dropdown = d3.select("#selDataset");

     // read the data 
     d3.json("samples.json").then((data)=> {
        console.log(data)
    // get the id data to the dropdwown menu
    data.names.forEach(function(name) {
        dropdown.append("option").text(name).property("value");
    });

    // call the functions to display the data and the plots to the page
    getPlot(data.names[0]);
    getInfo(data.names[0]);
});
}

init();





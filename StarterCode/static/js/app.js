// creating a function of Data plotting
function getPlot(id) {
    // getting data from the json file
    d3.json("samples.json").then((data)=> {
        console.log(data)
    });
    // using a map function to get Washing Freq and set a variable to hold wfreq
        var wfreq = data.metadata.map(d => d.wfreq)

        console.log(`Washing Freq: ${wfreq}`)
        //filter sample values by id
        var samples = data.samples.filter(s => s.id.toString()=== id)[0];
        console.log(samples);

    // getting the top 10
    var sampleValues = samples.sample_values.slice(0, 10).reverse();
    //get only top 10 otu ids for the plot otu 
    var OTU_top = (sample.otu_ids.slice(0, 10)).reverse();
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

}



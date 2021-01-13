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
    var sampleValues = samples.sample_values.slice(0, 10)
    //get only top 10 otu ids for the plot otu 
    var OTU_top = (sample.otu_ids.slice(0, 10))
    // getting the otu id variable to the desired form for the plot
    var OTU_id = OTU_top.map (d => "OTU " + d)

      
}



d3.json('./static/Resources/samples.json').then(({names}) => {
  names.forEach(name => {
    d3.select('select').append('option').text(name);
  });

  optionChanged();
});

const optionChanged = () => {
  let choice = d3.select('select').node().value;

  d3.json('./static/Resources/samples.json').then(({metadata, samples}) =>{

    let meta = metadata.filter(obj => obj.id == choice)[0];
    let samp = samples.filter(obj => obj.id == choice)[0];

    
    d3.select('.panel-body').html('');
    
    Object.entries(meta).forEach(([key,value])=>{
      d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}: ${value}`)
    });
    
    let { otu_ids, sample_values, otu_labels } = samp;


    var data = [
      {
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),
        text: otu_labels.slice(0,10).reverse(),
        type: 'bar',
        orientation: 'h'
      }
    ];
    
    Plotly.newPlot('bar', data);

    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);

  });
};
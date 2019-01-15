var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import Data
d3.csv("static/data/data.csv")
  .then(function(data) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function(data) {
      data.age = +data.age;
      data.obesity = +data.obesity;
    });

    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([30, d3.max(data, d => d.age) + 1])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([20, d3.max(data, d => d.obesity) + 1])
      .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var gdots =  chartGroup.selectAll("g.dot")
                .data(data)
                .enter().append('g');

    var circlesGroup = gdots.append("circle")
    .attr("class", "dot")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "10")
    .attr("fill", "#68a8a4")
    .attr("opacity", "1")


     gdots.append("text")
     .text(function(d){return d.abbr;})
     .attr("dx", d => xLinearScale(d.age)-10)
     .attr("dy", d => yLinearScale(d.obesity)+(10/2.5))
     .attr("font-size", "12px")
     .attr("fill", "white");;


    // Step 6: Initialize tool tip
    // ==============================
    //var toolTip = d3.tip()
      //.attr("class", "tooltip")
      //.offset([80, -60])
      //.html(function(d) {
      //  return (`${d.rockband}<br>Hair length: ${d.hair_length}<br>Hits: ${d.num_hits}`);
      });

    // Step 7: Create tooltip in the chart
    // ==============================
    //chartGroup.call(toolTip);

    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
  //  circlesGroup.on("click", function(data) {
    //  toolTip.show(data, this);
  //  })
      // onmouseout event
  //    .on("mouseout", function(data, index) {
    //    toolTip.hide(data);
    //  });

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text(`Obese (%)`);

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text(`Age (Median)`);
  //});

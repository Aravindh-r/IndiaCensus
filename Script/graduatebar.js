let margin = {top: 20, right: 20, bottom: 300, left: 80},
   width = 2500 - margin.left - margin.right,
   height = 1500 - margin.top - margin.bottom;

   let x = d3.scale.ordinal()
   .rangeRoundBands([0, width], .1);

   let y = d3.scale.linear()
   .rangeRound([height, 0]);

   let color = d3.scale.ordinal()
   .range(["#6C3483 ", "#134A62 ", "#7b6888 ", "#6b486b ", "#a05d56 ", "#d0743c ", "#ff8c00 "]);

   let xAxis = d3.svg.axis()
   .scale(x)
   .orient("bottom");

   let yAxis = d3.svg.axis()
   .scale(y)
   .orient("left")
   .tickFormat(d3.format(".2s"));

   let svg = d3.select("body").append("svg")
   .attr("width", width + margin.left + margin.right)
   .attr("height", height + margin.top + margin.bottom)
   .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


   d3.json("../output/graduatevalue.json",  function( data) {
    color.domain(d3.keys(data[0]).filter(function(key) { return key !== "AreaName"; }));
    data.forEach(function(d) {
      let y0 = 0;
      d.Population = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.Population[d.Population.length - 1].y1;
    });

    data.forEach(function(d) {
      let y0 = 0;
      d.theft = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
      d.total = d.theft[d.theft.length - 1].y1;
    });

    data.sort(function(a, b) { return b.total - a.total; });

    x.domain(data.map(function(d) { return d.AreaName; }));
    y.domain([0, d3.max(data, function(d) { return d.total; })+20000]);

    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("dx", "-.8em")
    .attr("dy", "-.55em")
    .attr("transform", "rotate(-60)" );

    svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(0," + height + ")")
    .attr("transform", "rotate(0)")
    .call(yAxis);
 

    let AreaName = svg.selectAll(".AreaName")
    .data(data)
    .enter().append("g")
    .attr("class", "g")
    .attr("transform", function(d) { return "translate(" + x(d.AreaName) + ",0)"; });

    AreaName.selectAll("rect")
    .data(function(d) { return d.theft; })
    .enter().append("rect")
    .attr("width", x.rangeBand())
    .attr("y", function(d) { return y(d.y1); })
    .attr("height", function(d) { return y(d.y0) - y(d.y1); })
    .style("fill", function(d) { return color(d.name); });

    let legend = svg.selectAll(".legend")
    .data(color.domain().slice().reverse())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

    legend.append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function(d) { return d; });

  });
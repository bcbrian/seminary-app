angular.module('d3')
  .directive('d3Bars', [
    'd3Service',
    '$window',
    function(
      d3Service,
      $window
    ) {
    return {
      restrict: 'EA',
      scope: {data:'=graphData'},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
        var margin = parseInt(attrs.margin) || 20,
            barHeight = parseInt(attrs.barHeight) || 20,
            barPadding = parseInt(attrs.barPadding) || 5;

          var svg = d3.select(element[0])
            .append('svg')
            .style('width', '100%')
            .style('position', 'relative')
            .style('left', '-15px');

          // Browser onresize event
          window.onresize = function() {
            scope.$apply();
          };

          // hard-code data
          // scope.data = [
          //   {name: "Greg", score: 98},
          //   {name: "Ari", score: 96},
          //   {name: 'Q', score: 75},
          //   {name: "Loser", score: 48}
          // ];

          // Watch for resize event
          scope.$watch(function() {
            return angular.element($window)[0].innerWidth;
          }, function() {
            scope.render(scope.data);
          });

          scope.render = function(data) {
            // remove all previous items before render
            svg.selectAll('*').remove();

            // If we don't pass any data, return out of the element
            if (!data) return;

            // setup variables
            var width = d3.select(element[0]).node().offsetWidth - margin,
                // calculate the height
                height = scope.data.length * (barHeight + barPadding),
                // Use the category20() scale function for multicolor support
                color = d3.scale.category20(),
                // our xScale
                xScale = d3.scale.linear()
                  .domain([0, d3.max(data, function(d) {
                    return d.score;
                  })])
                  .range([0, width]);

            // set the height based on the calculations above
            svg.attr('height', height);

            //create the rectangles for the bar chart
            svg.selectAll('rect')
              .data(data).enter()
                .append('rect')
                .attr('height', barHeight)
                .attr('width', 140)
                .attr('x', 0)
                .attr('y', function(d,i) {
                  return i * (barHeight + barPadding);
                })
                .attr('fill', function(d) {return d.color;})
                .transition()
                  .duration(1000)
                  .attr('width', function(d) {
                    return xScale(d.score);
                  });

                  //Add the SVG Text Element to the svgContainer
      var text = svg.selectAll("text")
                              .data(data)
                              .enter()
                              .append("text");

      //Add SVG Text Element Attributes
      var textLabels = text
                       .attr("x", function(d) { return 10; })
                      .attr("y", function(d,i) {
                        return i * (barHeight + barPadding)+15;
                      })
                       .text( function (d) { return d.score+" "+d.name+" "; })
                       .attr("font-family", "sans-serif")
                       .attr("font-size", "18px")
                       .attr("fill", "black");
          }
        });
      }
    };
  }]);

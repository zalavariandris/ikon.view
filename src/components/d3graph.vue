<template>
  <div class="d3graph">
  </div>
</template>

<script>
  import * as d3 from "d3";
  export default {
    name: 'ArtistView',
    props: ['graph'],

    mounted: function() {
      const width = 500;
      const height = 500;
      // create svg
      this.svg = d3.select(this.$el)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height);

      // handle zoom with viewport
      this.viewport = this.svg.append("g").attr("class", "viewport");
      this.zoom = d3.zoom().on("zoom",  ()=>{
         this.viewport.attr("transform", d3.event.transform)
      });

      this.svg.call(this.zoom);

      // create layers for nodes, links, labels
      this.viewport.append('g').attr('class', 'links');
      this.viewport.append('g').attr('class', 'nodes');
      this.viewport.append('g').attr('class', 'labels');

      // simulation
        this.simulation = d3.forceSimulation(this.graph.nodes)
        .force("charge", d3.forceManyBody().strength((d)=>d.size*-500))
        .force("link", d3.forceLink(this.graph.edges).id((d)=>d.id).distance(50).strength(1))
        .force("center", d3.forceCenter(this.$el.offsetWidth / 2, this.$el.offsetHeight / 2))
        .force("x", d3.forceX(this.$el.offsetWidth  / 2).strength(1))
        .force("y", d3.forceY(this.$el.offsetHeight / 2).strength(1))
        .force('collision', d3.forceCollide().radius(function(d) {
          return d.size;
        }))
        .velocityDecay(0.90)
        .on("tick", ()=>{
          let node = this.viewport.select('.nodes')
          .selectAll('circle')
          .attr('cx', (d)=>d.x)
          .attr('cy', (d)=>d.y);

          let link = this.viewport.select('.links')
          .selectAll('line')
          .attr('x1', (d)=>d.source.x)
          .attr('y1', (d)=>d.source.y)
          .attr('x2', (d)=>d.target.x)
          .attr('y2', (d)=>d.target.y);

          let labels = this.viewport.select('.labels')
          .selectAll('text')
          .attr('x', (d)=>d.x)
          .attr('y', (d)=>d.y);

          this.zoomFit(0.95, 100);
        })
        .stop();
      this.simulation.restart();

      // update
      this.updateNodes();
      // this.updateLinks();
      this.updateLabels();
    },

    watch: {
      graph: function(){
        console.log('d3graph', this.graph);
        this.updateNodes();
        // this.updateLinks();
        this.updateLabels();
        this.updateSimulation();
      }
    },

    methods: {
      updateNodes: function(){
        // data join
        let node = this.viewport
        .select('.nodes')
        .selectAll('circle')
        .data(this.graph.nodes, (d)=>d.id);
            
        //enter + update
        node.enter()
        .append('circle')
        .merge(node)
        .attr('r',    (d)=> d.size || 10)
        .attr('fill', (d)=> d.color || 'darkseagreen')
        .attr('stroke', (d)=>'white')
        .attr('stroke-width', (d)=>2)

        node.exit().remove();
      },

      updateLinks: function(){
        let link = this.viewport.select('.links')
        .selectAll('line')
        .data(this.graph.edges, (d)=>d.source.id+'-'+d.target.id);

        // enter + update
        link.enter()
        .append('line')
        .attr('visibility', 'hidden')
        .attr('stroke', 'lightgrey')
        .attr('stroke-width', 1)
        // .attr('opacity', 0.1)
        .merge(link)
        .attr('x1', (d)=>d.source.x)
        .attr('y2', (d)=>d.source.y)
        .attr('x2', (d)=>d.target.x)
        .attr('y2', (d)=>d.target.y);

        link.exit().remove();
      },

      updateLabels: function(){
        let label = this.viewport.select('.labels')
        .selectAll('text')
        .data(this.graph.nodes, (d)=>d.id);

        //enter + update
        label.enter()
        .append('text')
        .text((d)=>d.label)
        .attr('style', "user-select: none; pointer-events: none;")
        .attr('fill', 'black')
        .merge(label)
        .attr('x', (d)=>d.x)
        .attr('y', (d)=>d.y);

        label.exit().remove();

      },

      updateSimulation: function(){
        this.simulation.stop()
        this.simulation.nodes(this.graph.nodes)
        this.simulation.force("link", d3.forceLink(this.graph.edges).id((d)=>d.id).distance(100).strength(1))
        this.simulation.alpha(1).restart();
      },

      zoomFit: function(paddingPercent, transitionDuration) {
        let root = this.viewport;
        var bounds = root.node().getBBox();
        var parent = root.node().parentElement;
        var fullWidth = parent.clientWidth,
            fullHeight = parent.clientHeight;
        var width = bounds.width,
            height = bounds.height;
        var midX = bounds.x + width / 2,
            midY = bounds.y + height / 2;
        if (width == 0 || height == 0) return; // nothing to fit
        var scale = (paddingPercent || 0.75) / Math.max(width / fullWidth, height / fullHeight);
        var translate = [fullWidth / 2 - scale * midX, fullHeight / 2 - scale * midY];


        this.viewport.attr("translate", translate)
        this.viewport.attr('scale', scale)
      }
    }
  }
</script>
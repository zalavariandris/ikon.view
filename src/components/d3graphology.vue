<template>
  <div class="d3graphology">
  </div>
</template>

<script>
  import * as d3 from "d3";
  window.d3 = d3;
  export default {
    name: 'd3graphology',
    props: ['graph'],

    mounted: function() {
      console.log('mounted');
      window.d3graphology = this;
      const width = 500;
      const height = 300;
      // create svg
      this.svg = d3.select(this.$el)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height);

      // create viewport
      this.viewport = this.svg.append("g").attr("class", "viewport");
      // // handle zoom with mouse
      // this.zoom = d3.zoom().on("zoom",  ()=>{
      //    this.viewport.attr("transform", d3.event.transform)
      // })
      // this.svg.call(this.zoom);
      // this.svg.

      // create layers for nodes, links, labels
      this.initLinks();
      this.initNodes();
      this.initLabels();

      // simulation
      this.initSimulation();

      // update
      this.updateNodes();
      this.updateLinks();
      this.updateLabels();

      window.d3graphology = this;
    },

    watch: {
      graph: function(){
        this.updateSimulation();
        this.updateNodes();
        this.updateLinks();
        this.updateLabels();
        
      }
    },

    methods: {
      initSimulation: function(){
        console.log('init simulation')
        this.simgraph = {
          nodes: this.graph.nodes().map( (n)=>{
            return {id: n};
          }),

          edges: this.graph.edges().map( (e)=>{
            return {
              source: this.graph.source(e),
              target: this.graph.target(e)
            }
          })
        };

        this.simulation = d3.forceSimulation(this.simgraph.nodes)
        .force("charge", d3.forceManyBody().strength((d)=>this.graph.getNodeAttribute(d.id, 'size')*-800))
        .force("link", d3.forceLink(this.simgraph.edges).id((d)=>d.id).distance(50).strength(1))
        .force("center", d3.forceCenter(this.$el.offsetWidth / 2, this.$el.offsetHeight / 2))
        .force("x", d3.forceX(this.$el.offsetWidth  / 2).strength(1))
        .force("y", d3.forceY(this.$el.offsetHeight / 2).strength(1))
        .force('collision', d3.forceCollide().radius((d)=> {
          return this.graph.getNodeAttribute(d.id, 'size');
        }))
        .velocityDecay(0.90)
        .on("tick", ()=>{
          // move circles with simulation
          let node = this.viewport.select('.nodes')
          .selectAll('circle')
          .attr('cx', (d)=>d.x)
          .attr('cy', (d)=>d.y);

          // move lines with simulation
          let link = this.viewport.select('.links')
          .selectAll('line')
          .attr('x1', (d)=>d.source.x)
          .attr('y1', (d)=>d.source.y)
          .attr('x2', (d)=>d.target.x)
          .attr('y2', (d)=>d.target.y);

          // move text with simulation
          let labels = this.viewport.select('.labels')
          .selectAll('text')
          .attr('x', (d)=>d.x)
          .attr('y', (d)=>d.y);

          // zoom to fit content
          this.fit();
        });
        this.simulation.stop();
        this.simulation.restart();
      },

      updateSimulation: function(){
        console.log('update simulation');
        this.simgraph = {
          nodes: this.graph.nodes().map( (n)=>{
            return {id: n};
          }),

          edges: this.graph.edges().map( (e)=>{
            return {
              source: this.graph.source(e),
              target: this.graph.target(e)
            }
          })
        };
        this.simulation.stop()
        this.simulation.nodes(this.simgraph.nodes)
        this.simulation.force("link", d3.forceLink(this.simgraph.edges).id((d)=>d.id).distance(100).strength(1))
        this.simulation.alpha(1).restart();
      },

      initNodes: function(){
        this.viewport.append('g').attr('class', 'nodes');
      },

      updateNodes: function(){
        console.log('update nodes');
        // data join
        let node = this.viewport
        .select('.nodes')
        .selectAll('circle')
        .data(this.simgraph.nodes, (d)=>d);
            
        //enter + update
        node.enter()
        .append('circle')
        .merge(node)
        .attr('r',    (d)=> this.graph.getNodeAttribute(d.id, 'size') || 40)
        .attr('fill', (d)=> this.graph.getNodeAttribute(d.id, 'color') || 'darkseagreen')
        .attr('stroke', (d)=>'white')
        .attr('stroke-width', (d)=>5)

        node.exit().remove();
      },

      initLinks: function(){
        this.viewport.append('g').attr('class', 'links');
      },
              
      updateLinks: function(){
        let link = this.viewport.select('.links')
        .selectAll('line')
        .data(this.simgraph.edges, (d)=>d.source+d.target );

        // enter + update
        link.enter()
        .append('line')
        .attr('visibility', 'visible')
        .attr('stroke', 'rgb(240, 240, 240)')
        .attr('stroke-width', '10')
        .merge(link)
        .attr('x1', (d)=>d.source.x)
        .attr('y2', (d)=>d.source.y)
        .attr('x2', (d)=>d.target.x)
        .attr('y2', (d)=>d.target.y);

        link.exit().remove();
      },


      initLabels: function(){
        this.viewport.append('g').attr('class', 'labels');
      },

      updateLabels: function(){
        let label = this.viewport.select('.labels')
        .selectAll('text')
        .data(this.simgraph.nodes, (d)=>d.id);

        //enter + update
        label.enter()
        .append('text')
        .text((d)=>this.graph.getNodeAttribute(d.id, 'label').length<21 ? this.graph.getNodeAttribute(d.id, 'label') : this.graph.getNodeAttribute(d.id, 'label').substring(0, 21)+'...')
        .attr("text-anchor", "middle")
        .attr('alignment-baseline', 'middle')
        .attr('style', 'user-select: none; pointer-events: none;')
        // .attr('style', 'text-shadow: 1px 1px 0px white;')
        .attr('font-size', (d)=>this.graph.getNodeAttribute(d.id, 'size')*0.5)
        // .attr('visibility', (d)=>this.graph.getNodeAttribute(d.id, 'size')>30 ? 'visible' : 'hidden')
        .attr('fill', 'black')
        .merge(label)
        .attr('x', (d)=>d.x)
        .attr('y', (d)=>d.y);

        label.exit().remove();

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
      },

      fit: function(){
        let bounds = this.viewport.node().getBBox()
        let fullWidth = this.svg.node().clientWidth;
        let fullHeight = this.svg.node().clientHeight;

        let width = bounds.width;
        let height = bounds.height;
        let midX = bounds.x+width/2
        let midY = bounds.y+height/2

        if(width==0 || height ==0) return; //nothing to fit
        let scale = 1 / Math.max(width/fullWidth, height/fullHeight);
        let translate = [fullWidth/2-scale*midX, fullHeight/2-scale*midY];

        this.viewport.attr('transform', 
          `translate(${translate[0]},${translate[1]}) scale(${scale})`);
      },
    }
  }
</script>
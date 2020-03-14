<template>
  <div class="d3graphology">
  </div>
</template>

<script>
  import * as d3 from "d3";
  import subGraph from 'graphology-utils/subgraph';
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
        console.log('chaged');
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
            return {id: n, r: this.graph.getNodeAttribute(n, 'size')};
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
        .velocityDecay(0.660)
        .on("tick", ()=>{
          // update svg elements

          this.viewport
          .select('.nodes')
          .selectAll('.node')
          .attr('cx', (d)=>d.x)
          .attr('cy', (d)=>d.y);

          this.viewport
          .select('.links')
          .selectAll('.link')
          .attr('d', function(d){
            // Total difference in x and y from source to target
            let diffX = d.target.x - d.source.x;
            let diffY = d.target.y - d.source.y;

            // Length of path from center of source node to center of target node
            let pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));

            // x and y distances from center to outside edge of target node
            let keepDistance = 10;
            let targetOffsetX = (diffX * (d.target.r+keepDistance)) / (pathLength);
            let targetOffsetY = (diffY * (d.target.r+keepDistance)) / (pathLength);
            let sourceOffsetX = (diffX * (d.source.r+keepDistance)) / (pathLength);
            let sourceOffsetY = (diffY * (d.source.r+keepDistance)) / (pathLength);

            return "M" + (d.source.x+sourceOffsetX) + "," + (d.source.y+sourceOffsetY) + 
                   "L" + (d.target.x-targetOffsetX) + "," + (d.target.y-targetOffsetY);
          });

          this.viewport.select('.labels')
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
            return {id: n, r: this.graph.getNodeAttribute(n, 'size')};
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
        // data join
        var node = this.viewport
        .select('.nodes')
        .selectAll('.node')
        .data(this.simgraph.nodes, (d)=>d)

        let showDetails = (r, i)=>{
          this.viewport.classed('nodes-highlighted', true)

          let subnodes = this.graph.neighbors(r.id).concat([r.id]);
          let H = subGraph(this.graph, subnodes);
          
          this.viewport.selectAll('.node')
          .classed('highlighted', false)
          .filter( (n)=>H.hasNode(n.id))
          .classed('highlighted', true)

          this.viewport.select('.links')
          .selectAll('.link')
          .classed('highlighted', false)
          .filter( (e)=>H.hasEdge(e.source.id, e.target.id) )
          .classed('highlighted', true)
        }

        let hideDetails = (d, i)=>{
          this.viewport.classed('nodes-highlighted', false)

          d3.selectAll('.node')
          .classed('highlighted', false);

          d3.selectAll('.link')
          .classed('highlighted', false);
        }

        //enter + update
        node.enter()
          .append('circle')
          .attr('class', 'node')
          .classed('exhibition', (d)=>d.id[0]=='e' )
          .classed('artist', (d)=>d.id[0]=='a' )
          .attr('r',    (d)=> this.graph.getNodeAttribute(d.id, 'size') || 40)
          .on("mouseover", showDetails)
          .on("mouseout", hideDetails)
          .merge(node)
          .attr('cx', (d)=>d.x)
          .attr('cy', (d)=>d.y);

        node.exit().remove();
      },

      initLinks: function(){
        this.viewport.append('g').attr('class', 'links');
      },
              
      updateLinks: function(){
        let link = this.viewport.select('.links')
        .selectAll('.link')
        .data(this.simgraph.edges, (d)=>d.source+d.target );

        // enter + update
        link.enter()
        .append('path')
        .attr('class', 'link')
        .merge(link)
        .attr('d', function(d){
          // Total difference in x and y from source to target
          let diffX = d.target.x - d.source.x;
          let diffY = d.target.y - d.source.y;

          // Length of path from center of source node to center of target node
          let pathLength = Math.sqrt((diffX * diffX) + (diffY * diffY));

          // x and y distances from center to outside edge of target node
          let keepDistance = 10;
          let targetOffsetX = (diffX * (d.target.r+keepDistance)) / (pathLength);
          let targetOffsetY = (diffY * (d.target.r+keepDistance)) / (pathLength);
          let sourceOffsetX = (diffX * (d.source.r+keepDistance)) / (pathLength);
          let sourceOffsetY = (diffY * (d.source.r+keepDistance)) / (pathLength);

          return "M" + (d.source.x+sourceOffsetX) + "," + (d.source.y+sourceOffsetY) + 
                 "L" + (d.target.x-targetOffsetX) + "," + (d.target.y-targetOffsetY);
        });

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
        .text((d)=>{
          const hasLabel = this.graph.getNodeAttribute(d.id, 'label');
          if(!hasLabel)
            return;
          const label =  this.graph.getNodeAttribute(d.id, 'label');
          const isShort = label.length<21;
          if(isShort)
            return label
          else
            return label.substring(0, 18)+'\u2026'
        })
        .attr("text-anchor", "middle")
        .attr('alignment-baseline', 'middle')
        .attr('style', 'user-select: none; pointer-events: none;')
        // .attr('visibility', (d)=>this.graph.getNodeAttribute(d.id, 'size')>30 ? 'visible' : 'hidden')
        .merge(label)
        .attr('font-size', (d)=>this.graph.getNodeAttribute(d.id, 'size')*0.5)
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

<style>
  .node{
    fill: darkgrey;
    transition: fill 0.1s;
    transition: opacity 0.1s;
  }
  .node.artist{
    fill: hsl(220, 26%, 68%);
  }

  .node.exhibition{
    fill: hsl(45, 100%, 69%);
  }

  .node.highlighted{
    
  }

  .viewport.nodes-highlighted .node.artist:not(.highlighted){
    fill: hsl(220, 26%, 90%);
  }

  .viewport.nodes-highlighted .node.exhibition:not(.highlighted){
    fill: hsl(48, 78%, 90%);
  }

  .link{
    stroke: hsl(60, 18%, 87%);
    stroke-width: 10px;
    transition: stroke-width, stroke 0.7s;
  }

  .link.highlighted{
    stroke: hsl(60, 18%, 50%);
    stroke-width: 15px;
  }
  
  .viewport.nodes-highlighted .link:not(.highlighted){
    stroke: hsl(60, 18%, 90%);
    stroke-width: 6px;
  }

  text{
    fill: black;
    /*text-shadow: 1px 1px 0px white;*/
  }
</style>
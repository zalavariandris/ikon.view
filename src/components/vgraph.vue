<template>
  <div class="vgraph">
    <div 
      v-if="hoveredNode"
      ref="tooltip" 
      class="tooltip"
      :style="{left: toScreen(hoveredNode.x || 0, hoveredNode.y)[0]+'px',top: toScreen(hoveredNode.x, hoveredNode.y)[1]+'px'}">
      {{hoveredNode.label}}
    </div>

    <svg width=500 height=300 viewBox="0, 0, 500, 300">
      <g class="viewport"
         ref="viewport"
         :transform="cameraTransformCSS">
        <g ref="graph"
          :class="{graph: true, highlighted: someHighlighted}">

          <g class="links">
            <path
              v-for="edge in rendergraph.edges"
              :key="edge.source.id+edge.target.id"
              :class="{highlighted: edge.highlighted}"
              :d="getPath(edge)">
            </path>
          </g>

          <g class="nodes">
            <circle v-for="node in rendergraph.nodes"
              :key="node.id"
              :class="[node.class, {highlighted: node.highlighted}]"
              :transform="`translate(${node.x}, ${node.y})`"
              :r="node.r"
              @mouseover="onNodeMouseover(node)"
              @mouseleave="onNodeMouseleave(node)">
            </circle>
          </g>

          <g class="annotations">
            <text v-for="node in rendergraph.nodes"
              :key="node.id"
              :class="[node.class, {highlighted: node.highlighted}]"
              :transform="`translate(${node.x}, ${node.y})`"
              :style="`font-size: ${Math.sqrt(node.r)*3}`"
            >{{node.label}}</text>
          </g>

        </g>
      </g>
    </svg>
  </div>
</template>

<script>
  import * as d3 from "d3";
  import * as Matrix from  'transformation-matrix'
  window.Matrix = Matrix;

  export default{
    name: 'vgraph',
    props: ['graph'],

    data:function(){
      return {
        width: 500,
        height: 300,
        hoveredNode: null,
        rendergraph: {nodes: [], edges: []},
        cameraTransform: Matrix.identity(),
      }
    },

    created: function(){
      window.vgraph = this;
      this.initSimulation();
    },

    mounted: function(){
      
    },

    computed: {
      someHighlighted: function(){
        return this.rendergraph.nodes.some( (d)=>d.highlighted );
      },

      cameraTransformCSS: function(){
        return Matrix.toCSS(this.cameraTransform);
      }
    },

    methods: {
      toScreen: function(x, y){
        return Matrix.applyToPoint(this.cameraTransform, [x, y])
      },

      initSimulation: function(){
        this.rendergraph = {
          nodes: this.graph.nodes().map( (n)=>{
            return {
              id: n,
              x: 0,
              y: 0,
              highlighted: false,
              r: this.graph.getNodeAttribute(n, 'size') || 10,
              label: this.graph.getNodeAttribute(n, 'label'),
              class: this.graph.getNodeAttribute(n, 'class')
            };
          }),

          edges: this.graph.edges().map( (e)=>{
            return {
              source: this.graph.source(e),
              target: this.graph.target(e),
              highlighted: false
            }
          })
        };

        this.simulation = d3.forceSimulation(this.rendergraph.nodes)
        .force("charge", d3.forceManyBody().strength((d)=>d.r*-150))
        .force("link", d3.forceLink(this.rendergraph.edges).id((d)=>d.id).distance(50).strength(1))
        .force("center", d3.forceCenter(this.width / 2, this.height / 2))
        .force("x", d3.forceX(this.width  / 2).strength(1))
        .force("y", d3.forceY(this.height / 2).strength(1))
        .force('collision', d3.forceCollide().radius((d)=> {
          return d.r;
        }))
        .velocityDecay(0.660)
        .on("tick", this.tick);
      },

      getPath: function(d){
          // Total difference in x and y from source to target
          let diff = {
            x: d.target.x - d.source.x,
            y: d.target.y - d.source.y
          };

          // Length of path from center of source node to center of target node
          let pathLength = Math.sqrt(diff.x**2 + diff.y**2);

          if(pathLength<Number.EPSILON)
            return "";

          // x and y distances from center to outside edge of target node
          let keepDistance = 3;
          let targetOffset = {
            x: diff.x / pathLength * (d.target.r+keepDistance),
            y: diff.y / pathLength * (d.target.r+keepDistance)
          };
          let sourceOffset = {
            x: diff.x / pathLength * (d.source.r+keepDistance),
            y: diff.y / pathLength * (d.source.r+keepDistance)
          };

          return "M" + (d.source.x+sourceOffset.x) + "," + (d.source.y+sourceOffset.y) + 
                 "L" + (d.target.x-targetOffset.x) + "," + (d.target.y-targetOffset.y);

      },

      updateSimulation(){
        // this.rendergraph = {
        //   nodes: this.graph.nodes().map( (n)=>{
        //     return {
        //       id: n, 
        //       r: this.graph.getNodeAttribute(n, 'size')/10,
        //       label: "Label"};
        //   }),

        //   edges: this.graph.edges().map( (e)=>{
        //     return {
        //       source: this.graph.source(e),
        //       target: this.graph.target(e)
        //     }
        //   })
        // };
        // this.simulation.stop()
        // this.simulation.nodes(this.rendergraph.nodes)
        // this.simulation.force("link", d3.forceLink(this.rendergraph.edges).id((d)=>d.id).distance(100).strength(1))
        // this.simulation.alpha(1).restart();
      },

      fit: function(){
        let bounds = this.$refs.viewport.querySelector('.nodes').getBBox();

        if(bounds.width==0 || bounds.height ==0)
          return;

        let scale = 1 / Math.max(bounds.width/this.width, bounds.height/this.height);

        let center = {
          x: bounds.x + bounds.width / 2,
          y: bounds.y + bounds.height / 2,
        };

        let matrix = Matrix.compose(
          Matrix.scale(scale),
          Matrix.translate(-center.x,-center.y),
          Matrix.translate(this.width/2/scale, this.height/2/scale)
        );

        this.cameraTransform = matrix;
      },

      onNodeMouseover: function(d){
        this.hoveredNode = d;
        const neighbors = [d.id, ...this.graph.neighbors(d.id)];
        for(let node of this.rendergraph.nodes){
          node.highlighted = neighbors.indexOf(node.id)>=0 ? true : false;
        }
        for(let edge of this.rendergraph.edges){
          if(neighbors.indexOf(edge.source.id)>=0 && neighbors.indexOf(edge.target.id)>=0){
            edge.highlighted = true;
          }else{
            edge.highlighted = false;
          }
        }
      },

      onNodeMouseleave: function(){
        this.hoveredNode = null;
        for(let node of this.rendergraph.nodes){
          node.highlighted=false;
        }

        for(let edge of this.rendergraph.edges){
          edge.highlighted=false;
        }

        // this.$refs.tooltip.style.opacity=0.0;
      }
    },

    watch: {
      graph: function(){
        this.updateSimulation();
      },

      'rendergraph': {
        handler: function(){
          this.fit();
        },
        deep: true
      }
    }
  }
</script>

<style>
  .vgraph{
    position: relative;
  }

  .vgraph .tooltip{
    position: absolute;
    /*visibility: hidden;*/

    background-color: white;
    padding: 0.2em;
    margin: 1em 0.1em;
    box-shadow: 1px 1px 3px rgba(0,0,0, 10%);

    transition: left 0.3s, top 0.3s, opacity 0.3s;

    pointer-events: none;

    white-space: pre-wrap;
  }

  /* default graph style*/
  .graph circle{
    fill: darkgrey;
    transition: fill 0.5s, opacity 0.5s;
  }

  .graph circle.artist{
    fill: hsl(220, 26%, 68%);
  }
  .graph circle.exhibition{
    fill: hsl(45, 100%, 69%);
  }

  .graph circle.highlighted{

  }

  .graph path{
    stroke: hsl(60, 18%, 87%);
    stroke-width: 3px;
    transition: stroke-width 0.5s, stroke 0.5s, opacity 0.5s;
  }

  .graph path.highlighted{
    stroke: hsl(60, 18%, 50%);
    stroke-width: 3px;
  }

  .graph text{
    font-size: 14px;
    text-anchor: middle;
    dominant-baseline: central;
    pointer-events: none;
    transition: opacity 0.5s;
  }

  .graph.highlighted circle:not(.highlighted){
    opacity: 0.3;
  }

  .graph.highlighted path:not(.highlighted){
    opacity: 0.3;
  }

  .graph.highlighted text:not(.highlighted){
    opacity: 0.3;
  }
</style>

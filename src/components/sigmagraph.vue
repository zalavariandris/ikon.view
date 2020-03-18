<template>
  <div class="sigmagraph" style="height: 300px">
  </div>
</template>
<script>
  import graphology from 'graphology';
  import circular from 'graphology-layout/circular';
  import FA2Layout from 'graphology-layout-forceatlas2/worker';
  import forceAtlas2 from 'graphology-layout-forceatlas2';
  import randomLayout from 'graphology-layout/random';
  import circular from 'graphology-layout/circular';
  import * as sigma from 'sigma';
  export default {
    name: 'sigmagraph',
    props: ['graph'],
    mounted: function(){
      const scale = (d) => Math.max(2, Math.log2(d) * 1.7);

      console.time('Convert graph');
      this._graph = new graphology.Graph(graphology.UndirectedGraph)

      for(let n of this.graph.nodes){
        this._graph.addNode(n.id, {
          label: n.label,
          size: n.size*0.3
        })
      }

      for(let e of this.graph.edges){
        this._graph.addEdge(e.source, e.target, {
          weight: e.weight,
          color: 'rgba(0,0,0, 0.1)'
        });
      }
      console.timeEnd('Convert graph');

      let positions = circular(this._graph, {scale: 10});
      circular.assign(this._graph);

      this._renderer = new sigma.WebGLRenderer(this._graph, this.$el);

      this._layout = new FA2Layout(this._graph, {settings: {barnesHutOptimize: true,
        barnesHutTheta: 0.5,
        // edgeWeightInfluence: 1.0,
        // adjustSizes: true,
        // gravity: 1
        linLogMode: true,
        outboundAttractionDistribution: true
      }});
      this._layout.start();

    },

    created: function(){
      console.log('created');
    },

    beforeDestroy: function(){
      this._layout.stop();
      console.log('beforeDestroy');
    }
  }
</script>
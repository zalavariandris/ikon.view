<template>
  <div>
    <!-- <h2>Statistics</h2> -->
    <figure>
      <!-- <h3>Timeline</h3> -->
      <careertrajectory :plot="plot" :legend="legend"></careertrajectory>
    </figure>
    <figure>
      <vgraph v-if="graph" :graph="graph"></vgraph>
      <!-- <h3>Ego network</h3> -->
<!--       <figure v-if="graph">
        <d3graphology :graph="graph"></d3graphology>
        <figcaption class='stats'>
          nodes: {{graph.nodes().length}}
          edges: {{graph.edges().length}}
        </figcaption>
      </figure> -->
    </figure>
  </div>
</template>

<script>
  import vgraph from '../components/vgraph.vue'
  import careertrajectory from '../components/careertrajectory.vue';
  import moment from 'moment'

  export default {
    components:{
      careertrajectory, 
      vgraph
    },

    props: ['exhibitions', 'graph'],

    computed: {    
      exhibiting: function(){
        return this.exhibitions.filter( (e)=>e.relation=='exhibiting' );
      },

      plot: function(){
        let plot = this.exhibiting.map( (d)=>{
          return {
            x: moment(d.opening),
            y: d.exhibition_count,
            label: d.gallery,
            tooltip: d.title+'\n'+d.gallery+'\n'+moment(d.opening).format('D/M/Y'),
            color: d.artistsCount==1 ? 'pink' : 'lightsteelblue'
          }
        });

        plot.sort( (a, b)=>a.x-b.x );
        return plot;
      },

      legend: function(){
        return {
          solo: 'pink',
          group: 'lightsteelblue'
        }
      }
    }
  }
</script>

<style>
.stats{
  font-size: 70%;
  font-style: italic;
  opacity: 0.5;
}

figure{
  margin: 3em 0;
}
figure svg{
  width: 100%;
}

section{
  margin-bottom: 3em;
}
</style>
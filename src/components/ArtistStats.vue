<template>
  <div>
    <!-- <h2>Statistics</h2> -->
    <section>
      <!-- <h3>Timeline</h3> -->
      <careertrajectory :plot="plot" :legend="legend"></careertrajectory>
    </section>
    <section>
      <!-- <h3>Ego network</h3> -->
      <figure v-if="graph">
        <d3graphology :graph="graph"></d3graphology>
        <figcaption class='stats'>
          nodes: {{graph.nodes().length}}
          edges: {{graph.edges().length}}
        </figcaption>
      </figure>
    </section>
  </div>
</template>

<script>
  import d3graphology from '../components/d3graphology.vue';
  import careertrajectory from '../components/careertrajectory.vue';
  import moment from 'moment'

  export default {
    components:{
      careertrajectory, 
      d3graphology
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
  margin: 0;
}

section{
  margin-bottom: 3em;
}
</style>
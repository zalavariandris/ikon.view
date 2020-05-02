<template>
  <div>
    <figure>
      <careertrajectory :exhibitions="exhibiting"></careertrajectory>
    </figure>
    <figure>
      <vgraph v-if="graph" :graph="graph"></vgraph>
    </figure>
  </div>
</template>

<script>
  import vgraph from '../components/vgraph.vue'
  import careertrajectory from '../components/careertrajectory.vue';
  import moment from 'moment'
  import {groupBy} from '../utils'
  window.moment = moment;
  window.groupBy = groupBy;

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

      // plot: function(){

      //   let plot = this.exhibiting.map( (d)=>{
      //     return {
      //       x: moment(d.opening),
      //       y: d.gallery_exhibition_count,
      //       label: d.gallery,
      //       tooltip: d.title+'\n'+d.gallery+'\n'+moment(d.opening).format('D/M/Y'),
      //       color: d.artistsCount==1 ? 'pink' : 'lightsteelblue'
      //     }
      //   });

      //   plot.sort( (a, b)=>a.x-b.x );
      //   return plot;
      // },


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
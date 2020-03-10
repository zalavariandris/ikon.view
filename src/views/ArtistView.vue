<template>
  <div>
    <header>
      <h1>Artist</h1>
      <h2>{{artist.name}}</h2>
      <section style="float: right; text-align: right;">
        <label for='showNetwork'>show network</label>
        <input id='showNetwork' type='checkbox' v-model="showNetwork">
        

        <d3graphology v-if="showNetwork" :graph="bipartedGraphology"></d3graphology>
        <div class='stats'>
          <span>nodes: {{bipartedGraphology.nodes().length}}
          edges: {{bipartedGraphology.edges().length}}</span>
        </div>
      </section>
    </header>
    <main>
      <section>
        <h3>Exhibitions</h3>
        <ol>
          <li v-for='e in exhibitions'
              v-bind:key="e.id"
              v-bind:class="{notExhibition: !e.isExhibition}">
            <router-link :to="{name: 'exhibition', params: {id: e.id}}">
              <p>{{e.title}} <small>({{e.openingDate}})</small></p>
            </router-link>
          </li>
        </ol>
      </section>

      <section>
        <h3>Curating</h3>
        <ol>
          <li v-for='e in curating' 
              v-bind:key="e.id"
              v-bind:class="{notExhibition: !e.isExhibition}">
            <router-link :to="{name: 'exhibition', params: {id: e.id}}">
              <p>{{e.title}} <small>({{e.openingDate}})</small></p>
            </router-link>
          </li>
        </ol>
      </section>

      <section>
        <h3>Opening</h3>
        <ol>
          <li v-for='e in openingspeech' 
              v-bind:key="e.id"
              v-bind:class="{notExhibition: !e.isExhibition}">
            <router-link :to="{name: 'exhibition', params: {id: e.id}}">
              <p>{{e.title}} <small>({{e.openingDate}})</small></p>
            </router-link>
          </li>
        </ol>
      </section>
    </main>
  </div>
</template>

<script>
  import store from '../store';
  import graphology from 'graphology';
  import subGraph from 'graphology-utils/subgraph';
  import d3graphology from '../components/d3graphology.vue';

  export default {
    name: 'ArtistView',
    components: {
      d3graphology
    },
    store,
    data: function(){
      return{
        showNetwork: true
      }
    },
    computed: {
      artist: function(){
        return this.$store.getters.getArtistById(this.$route.params.id)
      },
      
      exhibitions: function(){
        return this.$store.getters.getExhibitionsByArtistId(this.$route.params.id);
      },

      curating: function(){
        return this.$store.getters.getExhibitionsByCuratorId(this.$route.params.id);
      },

      openingspeech: function(){
        return this.$store.getters.getExhibitionsByOpeningspeechId(this.$route.params.id);
      },

      bipartedGraphology: function(){
        // create graph
        let G = new graphology.Graph();
        let a = this.artist;
        G.addNode("a"+a.id, {
          label: a.name, 
          color: 'hsl(155, 73%, 64%)'
        })
        for(let e of this.exhibitions){
          G.addNode("e"+e.id, {label: e.title, color: 'lightgrey' });
          G.addEdge("a"+a.id, "e"+e.id, {weight: 1/this.exhibitions.length})

          for(let friend of this.$store.getters.getArtistsByExhibitionId(e.id)){
            if(!G.hasNode("a"+friend.id)){
              G.addNode("a"+friend.id, {
                label: friend.name, 
                color: 'hsl(155, 73%, 64%)'
              });
            }
            if(!G.hasEdge("e"+e.id, 'a'+friend.id)){
              G.addEdge("e"+e.id, 'a'+friend.id, {weight: 1});
            }else{
              let w = G.setEdgeAttribute("e"+e.id, 'a'+friend.id);
              G.setEdgeAttribute("e"+e.id, 'a'+friend.id, 'weight', w+1);
            }
          }
        }
        
        // calculate degree centrality
        for(let n of G.nodes()){
          G.setNodeAttribute(n, 'degree',  G.degree(n));
        }

        let sumDegree = 0;
        for(let n of G.nodes()){
          sumDegree+=G.getNodeAttribute(n, 'degree');
        }

        for(let n of G.nodes()){
          let degree = G.degree(n)//G.getNodeAttribute(n, 'degree');
          G.setNodeAttribute(n, 'degreeCentrality', degree/sumDegree);
        }

        // set node visual attributes
        for(let n of G.nodes()){
          let centrality = G.getNodeAttribute(n, 'degreeCentrality');
          G.setNodeAttribute(n, 'size', n[0]=='a' ? centrality**0.6*1000 : sumDegree/G.nodes().length*30);
          G.setNodeAttribute(n, 'color', n[0]=='a' ? 'hsl(155, 73%, 64%)' : 'lightgrey')
        }

        // drop leaf nodes
        let subnodes = G.nodes().filter( (n)=>G.degree(n)>1 )
        G = subGraph(G, subnodes);

        //
        return G;
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
</style>
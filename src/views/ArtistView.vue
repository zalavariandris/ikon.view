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
            nodes: {{bipartedGraphology.nodes().length}}
            edges: {{bipartedGraphology.edges().length}}
        </div>
      </section>
    </header>
    <main>
      <section v-if="cv.length>0">
        <h3>Exhibitions</h3>
        <ul>
          <li v-for="group in cv">
            {{group[0]}}
            <ul>
              <li class="exhibition"
                  v-for='e in group[1]'
                  v-bind:key="e.id"
                  v-bind:class="{notExhibition: !e.isExhibition, solo: e.artistsCount<3}">
                <router-link :to="{name: 'exhibition', params: {id: e.id}}">
                  {{e.title}}
                  <small v-if="e.artistsCount==1">solo </small>
                  <br/>
                </router-link>
                <router-link :to="{name: 'gallery', params: {id: e.gallery_id}}">
                <small>{{e.gallery}}</small>
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section v-if="curatingcv.length>0">
        <h3>Curating</h3>
        <ul>
          <li v-for="group in curatingcv">
            {{group[0]}}
            <ul>
              <li v-for='e in group[1]' 
                  v-bind:key="e.id"
                  v-bind:class="{notExhibition: !e.isExhibition}">
                <router-link :to="{name: 'exhibition', params: {id: e.id}}">
                  {{e.title}}
                </router-link>
                <router-link :to="{name: 'gallery', params: {id: e.gallery_id}}">
                  {{e.gallery}}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>

      <section v-if="openingspeechcv.length>0">
        <h3>Opening</h3>
        <ul>
          <li v-for="group in openingspeechcv">
            {{group[0]}}
            <ul>
              <li v-for='e in group[1]' 
                  v-bind:key="e.id"
                  v-bind:class="{notExhibition: !e.isExhibition}">
                <router-link :to="{name: 'exhibition', params: {id: e.id}}">
                  {{e.title}}
                </router-link>
                <router-link :to="{name: 'gallery', params: {id: e.gallery_id}}">
                  {{e.gallery}}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
  import store from '../store';
  import graphology from 'graphology';
  import subGraph from 'graphology-utils/subgraph';
  import d3graphology from '../components/d3graphology.vue';
  import {groupBy} from '../utils'
  export default {
    name: 'ArtistView',
    components: {
      d3graphology
    },
    store,
    data: function(){
      return{
        showNetwork: false
      }
    },

    computed: {
      artist: function(){
        return this.$store.getters.getArtistById(this.$route.params.id)
      },
      
      exhibitions: function(){
        return this.$store.getters.getExhibitionsByArtistIdWithArtistCount(this.$route.params.id)
      },

      cv: function(){
        return groupBy(this.exhibitions, (d)=>new Date(d['openingDate']).getFullYear())
      },

      curating: function(){
        return this.$store.getters.getExhibitionsByCuratorId(this.$route.params.id);
      },

      curatingcv: function(){
        return groupBy(this.curating, (d)=>new Date(d['openingDate']).getFullYear())
      },

      openingspeech: function(){
        return this.$store.getters.getExhibitionsByOpeningspeechId(this.$route.params.id);
      },

      openingspeechcv: function(){
        return groupBy(this.openingspeech, (d)=>new Date(d['openingDate']).getFullYear())
      },

      bipartedGraphology: function(){
        // create graph
        let G = new graphology.Graph();
        let a = this.artist;
        G.addNode("a"+a.id, {
          label: a.name, 
          color: 'hsl(155, 73%, 64%)'
        })
        for(let e of this.exhibitions.filter( (e)=>e.isExhibition )){
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
          let minsize = sumDegree/G.nodes().length*30
          G.setNodeAttribute(n, 'size', n[0]=='a' ? centrality**0.6*1000+minsize/2 : minsize);
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
.solo{
  font-weight: bold;
}

ul{
  list-style: none;
  padding-left: 1em;
  margin-bottom: 2em;
}

ul ul{
  padding: 0;
  /*line-height: 1em;*/
}
ul ul li{
  margin-top: 0.5em;
}
ul p{
  margin: 0;
}
</style>
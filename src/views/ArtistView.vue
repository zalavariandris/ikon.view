<template>
  <div>
    <header>
      <h1>Artist</h1>
      <h2>{{artist.name}}</h2>
    </header>

    <main>
      <figure style="float: right; text-align: right;">
        <figcaption>
            <label for='showNetwork'>network</label>
            <input id='showNetwork' type='checkbox' v-model="showNetwork"><br/>
        </figcaption>
        <d3graphology v-if="showNetwork" :graph="bipartedGraphology"></d3graphology>
        <figcaption class='stats'>
            nodes: {{bipartedGraphology.nodes().length}}
            edges: {{bipartedGraphology.edges().length}}
        </figcaption>
      </figure>

      <section v-if="cv.length">
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
        showNetwork: true
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
        const groups = groupBy(this.exhibitions, (d)=>new Date(d['openingDate']).getFullYear())
        return [...groups.entries()].sort( (a, b)=>b-a );
      },

      curating: function(){
        return this.$store.getters.getExhibitionsByCuratorId(this.$route.params.id);
      },

      curatingcv: function(){
        const groups = groupBy(this.curating, (d)=>new Date(d['openingDate']).getFullYear())
        return [...groups.entries()].sort( (a, b)=>b-a );
      },

      openingspeech: function(){
        return this.$store.getters.getExhibitionsByOpeningspeechId(this.$route.params.id);
      },

      openingspeechcv: function(){
        const groups = groupBy(this.openingspeech, (d)=>new Date(d['openingDate']).getFullYear())
        return [...groups.entries()].sort( (a, b)=>b-a );
      },

      bipartedGraphology: function(){
        // const getArtistLinks = (a)=>{
        //   let opening = this.$store.getters.getExhibitionsByOpeningspeechId(a.slice(1))
        //   .map( (e)=> new Object({u: a, v:'e'+e.id, relation: 'opening'}));
          
        //   let curating = this.$store.getters.getExhibitionsByCuratorId(a.slice(1))
        //   .map( (e)=> new Object({u: a, v:'e'+e.id, relation: 'curating'}));
          
        //   let exhibiting = this.$store.getters.getExhibitionsByArtistIdWithArtistCount(a.slice(1))
        //   .map( (e) => new Object({u: a, v: 'e'+e.id, relation: 'exhibiting'}));

        //   return [].concat( opening, curating, exhibiting );
        // }

        // const getExhibitionLinks = (e)=>{
        //   let curators = this.$store.getters.getCuratorsByExhibitionId(e.slice(1))
        //   .map( (a)=>new Object({u: e, v: 'a'+a.id, relation: 'curating'}) );
          
        //   let artists = this.$store.getters.getArtistsByExhibitionId(e)
        //   .map( (a)=>new Object({u: e, v: 'a'+a.id, relation: 'exhibiting'}) );
          
        //   let openingspeech = this.$store.getters.getOpeningspeechByExhibitionId(e.id)
        //   .map( (a)=>new Object({u: e, v: 'a'+a.id, relation: 'opening'}) );

        //   return [].concat( artists, curators, openingspeech );
        // }
        // create graph
        let G = new graphology.Graph();


        let root = [this.artist]

        let a = this.artist;
        G.addNode("a"+a.id, {
          label: a.name, 
          color: 'hsl(155, 73%, 64%)'
        })


        // for(let edge of getArtistLinks('a'+a.id)){
        //   G.addNode(edge.v)
        //   G.addEdge(edge.u, edge.v, {weight: 1, relation: edge.relation})
        // }

        // add exhibitingAt
        for( let e of this.exhibitions ){
          G.addNode('e'+e.id, {label: e.title, color: 'lightgrey' });
          G.addEdge('a'+ a.id, 'e'+e.id, {'weight': 1});

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
          G.setNodeAttribute(n, 'color', n[0]=='a' ? 'hsl(155, 73%, 64%)' : 'lightslategray')
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
  margin-top: 0;
  /*line-height: 1em;*/
}
ul ul li{
  /*margin-top: 0.5em;*/
  display: inline;
}
ul p{
  margin: 0;
}

figure{
  margin: 0;
}
</style>
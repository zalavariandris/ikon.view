<template>
  <div>
    <header>
      <h1>Artist</h1>
      <h2>{{artist.name}}</h2>
      <section style="float: right; text-align: right;">
        <input id='showNetwork' type='checkbox' v-model="showNetwork">
        <label for='showNetwork'>show network</label>
        <d3graph v-if="showNetwork" :graph="bipartedGraph"></d3graph>
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
  import * as jsnx from 'jsnetworkx';
  import d3graph from '../components/d3graph.vue';
  import chroma from 'chroma-js';
  export default {
    name: 'ArtistView',
    components: {
      d3graph
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
        return this.$store.getters.getExhibitionsByArtistId(this.$route.params.id);
      },

      curating: function(){
        return this.$store.getters.getExhibitionsByCuratorId(this.$route.params.id);
      },

      openingspeech: function(){
        return this.$store.getters.getExhibitionsByOpeningspeechId(this.$route.params.id);
      },

      bipartedGraph: function(){
        this.artists
        this.exhibtions

        // let all_artists = this.$store.getters.getArtistsByExhibitionIds(exhibitions.map( (e)=>e.id));
        // let all_exhibitions = this.$store.getters.getExhibitionsByArtistIds(all_artists.map( (f)=>f.id))

        let G = new jsnx.Graph();
        window.G = G;
        let a = this.artist;
        G.addNode("a"+a.id, {label: a.name})
        for(let e of this.exhibitions){
          G.addNode("e"+e.id, {label: e.title});
          G.addEdge("a"+a.id, "e"+e.id, {weight: 1/this.exhibitions.length})

          for(let friend of this.$store.getters.getArtistsByExhibitionId(e.id)){
            G.addNode("a"+friend.id, {label: friend.name});
            if(!G.hasEdge("e"+e.id, 'a'+friend.id)){
              G.addEdge("e"+e.id, 'a'+friend.id, {weight: 1});
            }else{
              G.adj.get("e"+e.id).get('a'+friend.id).weight+=1;
            }
          }
        }

        // filter nodes by degree
        for(let n of G.nodes()){
          G.node.get(n).degree = G.degree(n)
        }
        let sumDegree = 0;
        for(let n of G.nodes(true)){
          sumDegree+=n[1]['degree']
        }
        for(let n of G.nodes(true)){
          G.node.get(n[0])['degreeCentrality'] = n[1]['degree']/sumDegree;
        }

        let subnodes = G.nodes().filter( (n)=>G.degree(n)>1 )
        G = G.subgraph(subnodes);

        return {
          nodes: G.nodes(true).map( (n)=>{
            return {
              id: n[0],
              label: n[1]['label'],
              size: n[0][0]=='a' ? n[1]['degreeCentrality']**0.8*2000 : 40,
              color: n[0][0]=="a" ? 'hsl(155, 73%, 64%)' : 'lightgrey',
              x: Math.random()*1000,
              y: Math.random()*1000
            };
          }),

          edges: G.edges(true).map( (e)=>{
            return {
              source: e[0],
              target: e[1],
              weight: e[2]['weight'],
              color: chroma.random().hex()
            };
          })
        }
      },

      egoNetwork: function(){
        const self = this;
        // root node
        let artist = this.$store.getters.getArtistById(this.$route.params.id);
        // get all friends
        let exhibitions = this.$store.getters.getExhibitionsByArtistId(this.$route.params.id);
        let all_artists = this.$store.getters.getArtistsByExhibitionIds(exhibitions.map( (e)=>e.id));
        
        // get all exhibitions
        let all_exhibitions = this.$store.getters.getExhibitionsByArtistIds(all_artists.map( (f)=>f.id))
        // console.log('friends:', friends);
        // console.log('exhibitions:', exhibitions)

        let G = new jsnx.Graph(6);
        for(let a of all_artists){
          G.addNode(a.id, {
            label: a.name
          });
        }

        // connect all artists through their exhibitions
        for(let e of exhibitions){
          let friends = this.$store.getters.getArtistsByExhibitionId(e.id);
          for(let i=0; i<friends.length;i++){
            for(let j=i; j<friends.length;j++){
              let A = friends[i]
              let B = friends[j]
              G.addEdge(A.id, B.id, {weight: 1/friends.length});
            }
          }
        }

        // add degree
        for(let n of G.nodes()){
          G.addNode(n, {size: G.degree(n, 'weight')});
        }

        window.G = G;

        return {
          nodes: G.nodes(true).map( (n)=>{
            return {
              id: n[0],
              label: n[1]['label'],
              size: n[1]['size'],
              x: Math.random()*1000,
              y: Math.random()*1000
            };
          }),

          edges: G.edges(true).map( (e)=>{
            return {
              source: e[0],
              target: e[1],
              weight: e[2]['weight'],
              color: chroma.random().hex()
            };
          })
        }
      }
    }
  }
</script>
<template>
  <div>
    <header>
      <h1>Artist</h1>
      <h2>{{artist.name}}</h2>
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

    <section class="egoNetwork">
      <header>
        <h3>Ego network</h3>
        <input id="showEgonetwork" type="checkbox" v-model="showEgonetwork">
        <label for="showEgonetwork">show ego network</label>
      </header>
      <d3graph v-if="showEgonetwork" :graph="egoNetwork" ></d3graph>
    </section>
  </div>
</template>

<script>
  import store from '../store'
  import * as jsnx from 'jsnetworkx'
  import d3graph from '../components/d3graph.vue'
  export default {
    name: 'ArtistView',
    components: {
      d3graph
    },
    store,
    data: function(){
      return{
        showEgonetwork: false
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
              size: Math.log1p(n[1]['size']*n[1]['size'])*30,
              x: Math.random()*1000,
              y: Math.random()*1000
            };
          }),

          edges: G.edges().map( (e)=>{
            return {
              source: e[0],
              target: e[1]
            };
          })
        }
      }
    }
  }
</script>
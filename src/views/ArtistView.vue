<template>
  <div v-if="artist" class="ArtistView">
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
        <d3graphology v-if="showNetwork" :graph="graph"></d3graphology>
        <figcaption v-if="showNetwork" class='stats'>
            nodes: {{graph.nodes().length}}
            edges: {{graph.edges().length}}
        </figcaption>
      </figure>

      <section v-for="section in cv">
        <h3>{{section[0]}}</h3>
        <ul class=group>
          <li v-for="group in groupBy(section[1], (e)=>new Date(e.opening).getFullYear())">
            {{group[0]}}
            <ul>
              <li class="exhibition"
                  v-for='e in group[1]'
                  v-bind:key="e.id"
                   v-bind:class="{solo: section[0]=='Exhibitions' && e.artistsCount==1}">
                <router-link :to="{name: 'exhibition', params: {id: e.id}}">
                  {{e.title}}
                  <small v-if="section[0]=='Exhibitions' && e.artistsCount==1">(solo)</small>
                </router-link>
                -
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

    methods:{
      groupBy
    },

    computed: {
      cv: function(){
        return [
          ['Exhibitions', this.exhibiting],
          ['Host', this.hosting],
          ['Curating', this.curating]
        ].sort( (a, b)=>b[1].length-a[1].length )
      },

      artist: function(){
        return this.$store.getters.getArtistById(this.$route.params.id);
      },
      
      exhibitions: function(){
        return this.$store.getters.getExhibitionsByArtistId(this.$route.params.id);
      },

      exhibiting: function(){
        return this.exhibitions.filter( (e)=>e.relation=='exhibiting' );
      },

      curating: function(){
        return this.exhibitions.filter( (e)=>e.relation=='curating' );
      },

      hosting: function(){
        return this.exhibitions.filter( (e)=>e.relation=='opening' );
      },

      graph: function(){
        if(!this.$store.state.database)
          return new graphology.Graph();

        const sql = `
        SELECT DISTINCT A.artist_id AS a, A.exhibition_id AS b, B.artist_id AS c, C.exhibition_id AS d
        FROM relations A
        JOIN relations B ON B.exhibition_id==A.exhibition_id
        JOIN relations C ON C.artist_id==B.artist_id
        WHERE A.artist_id==${this.$route.params.id}
        AND a!=c`

        const result = this.$store.state.database.exec(sql);
        if(!result[0])
          return new graphology.Graph()

        const paths = result[0].values

        let G = new graphology.Graph()
        window.G = G;
        for(let path of paths){
          if(!G.hasNode('a'+path[0]))
            G.addNode('a'+path[0], {color:'red'})
          if(!G.hasNode('e'+path[1]))
            G.addNode('e'+path[1], {color:'yellow'})
          if(!G.hasNode('a'+path[2]))
            G.addNode('a'+path[2], {color:'lightblue'})
          
          if(!G.hasEdge('a'+path[0], 'e'+path[1]))
            G.addEdge('a'+path[0], 'e'+path[1])
          if(!G.hasEdge('e'+path[1], 'a'+path[2]))
            G.addEdge('e'+path[1], 'a'+path[2])
        }

        for(let path of paths){
          if(G.hasNode(path[3]))
            if(!G.hasEdge('a'+path[2], 'e'+path[3]))
              G.addEdge('a'+path[2], 'e'+path[3])
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
          let degreeCentrality = G.getNodeAttribute(n, 'degree');
          let defaultSize = 10;
          G.setNodeAttribute(n, 'size', n[0]=='a' ? Math.log1p(degreeCentrality**3)*20 : 100);
        }
                
        G = subGraph(G, G.nodes().filter( (n)=> G.degree(n)>1) );

        // populate artists names
        let artists = this.$store.getters.getArtistsByIds(
          G.nodes()
          .filter( (n)=>n[0]=='a' )
          .map((n)=>parseInt(n.slice(1)))
        );
        for(let a of artists){
          G.setNodeAttribute('a'+a.id, 'label', a.name)
        }


        // populate exhibition titles
        let exhibitions = this.$store.getters.getExhibitionsByIds(
          G.nodes()
          .filter( (n)=>n[0]=='e' )
          .map((n)=>parseInt(n.slice(1)))
        );

        for(let e of exhibitions){
          G.setNodeAttribute('e'+e.id, 'label', e.title);
          G.setNodeAttribute('e'+e.id, 'isExhibition', e.isExhibition);
        }

        // drop leaf nodes
        G = subGraph(G, G.nodes().filter( (n)=> G.degree(n)>1) );
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

li.solo>a:nth-child(1){
  font-weight: bold;
}

figure{
  margin: 0;
}

li>a:nth-child(2){

}
</style>
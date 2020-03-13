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
        <d3graphology v-if="showNetwork" :graph="bipartedGraphology"></d3graphology>
        <figcaption v-if="showNetwork" class='stats'>
            nodes: {{bipartedGraphology.nodes().length}}
            edges: {{bipartedGraphology.edges().length}}
        </figcaption>
      </figure>

      <section v-if="cv.length">
        <h3>Exhibitions</h3>
        <ul class=group>
          <li v-for="group in cv">
            <span class="label">{{group[0]}}</span>
            <ul>
              <li class="exhibition"
                  v-for='e in group[1]'
                  v-bind:key="e.id"
                  v-bind:class="{notExhibition: !e.isExhibition, solo: e.artistsCount<3}">
                <router-link :to="{name: 'exhibition', params: {id: e.id}}">
                  {{e.title}}
                  <small v-if="e.artistsCount==1">(solo)</small>
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

      <section v-if="curatingcv.length>0">
        <h3>Curating</h3>
        <ul class=group>
          <li v-for="group in curatingcv">
            <span class="label">{{group[0]}}</span>
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
        <ul class=group>
          <li v-for="group in openingspeechcv">
            <span class="label">{{group[0]}}</span>
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
        if(!this.$store.state.database)
          return new graphology.Graph();

        const sql = `
        SELECT DISTINCT A.artist_id AS a, A.exhibition_id AS b, B.artist_id AS c, C.exhibition_id AS d
        FROM exhibitingOn A
        JOIN exhibitingOn B ON B.exhibition_id==A.exhibition_id
        JOIN exhibitingOn C ON C.artist_id==B.artist_id
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
        console.log(exhibitions)
        for(let e of exhibitions){
          console.log(e);
          G.setNodeAttribute('e'+e.id, 'label', e.title);
          G.setNodeAttribute('e'+e.id, 'isExhibition', e.isExhibition);
        }
        return G;
      }

      // bipartedGraphology: function(){
      //   // create graph
      //   let G = new graphology.MultiGraph();
      //   let root = [this.artist]
      //   let a = this.artist;
      //   G.addNode("a"+a.id, {
      //     label: a.name, 
      //     color: 'hsl(155, 73%, 64%)'
      //   })

      //   // build network from sql
      //   for(let edge of this.$store.getters.getRelations(a.id, null)){
      //     if(!G.hasNode('e'+edge.exhibition_id)) // eg. exhibiting and curating eg.
      //       G.addNode('e'+edge.exhibition_id)
      //     G.addEdge('a'+edge.artist_id, 'e'+edge.exhibition_id, {
      //       relation: edge.relation
      //     });

      //     for(let edge of this.$store.getters.getRelations(null, edge.exhibition_id)){
      //       if(!G.hasNode('a'+edge.artist_id))
      //         G.addNode('a'+edge.artist_id);

      //       G.addEdge('a'+edge.artist_id, 'e'+edge.exhibition_id,{
      //         relation: edge.relation
      //       });
      //     }
      //   }

      //   // populate artists names
      //   let artists = this.$store.getters.getArtistsByIds(
      //     G.nodes()
      //     .filter( (n)=>n[0]=='a' )
      //     .map((n)=>parseInt(n.slice(1)))
      //   );
      //   for(let a of artists){
      //     G.setNodeAttribute('a'+a.id, 'label', a.name)
      //   }


      //   // populate exhibition titles
      //   let titles = new Map(this.exhibitions.map( (e)=>[e.id, e.title] ));
      //   for(let e of this.exhibitions){
      //     G.setNodeAttribute('e'+e.id, 'label', e.title);
      //     G.setNodeAttribute('e'+e.id, 'isExhibition', e.isExhibition);
      //   }

      //   // filter out none xhibitionss
      //   // G = subGraph(G, G.nodes().filter( (n)=> n[0]=='a' || G.getNodeAttribute(n, 'isExhibition') ));

      //   // calculate degree centrality
      //   for(let n of G.nodes()){
      //     G.setNodeAttribute(n, 'degree',  G.degree(n));
      //   }

      //   let sumDegree = 0;
      //   for(let n of G.nodes()){
      //     sumDegree+=G.getNodeAttribute(n, 'degree');
      //   }

      //   for(let n of G.nodes()){
      //     let degree = G.degree(n)//G.getNodeAttribute(n, 'degree');
      //     G.setNodeAttribute(n, 'degreeCentrality', degree/sumDegree);
      //   }

      //   // set node visual attributes
      //   for(let n of G.nodes()){
      //     let degreeCentrality = G.getNodeAttribute(n, 'degree');
      //     let defaultSize = 10;
      //     G.setNodeAttribute(n, 'size', n[0]=='a' ? Math.log1p(degreeCentrality**3)*20 : 100);
      //     G.setNodeAttribute(n, 'color', n[0]=='a' ? 'hsl(155, 73%, 64%)' : 'lightslategray')
      //   }

      //   // drop leaf nodes
      //   // G = subGraph(G, G.nodes().filter( (n)=> G.degree(n)>1) );
      //   //
      //   return G;
      // }
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
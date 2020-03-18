<template>
  <div class="CV">
    <!-- <h2>CV</h2> -->
    <section v-for="category in categories">
      <h3>{{category[0]}}</h3>
      <ul class=group>
        <li v-for="(group in groupBy(category[1], (e)=>new Date(e.opening).getFullYear())">
          {{group[0]}}
          <ul>
            <li class="exhibition"
            v-for='e in group[1]'
            v-bind:key="e.id"
            v-bind:class="{solo: category[0]=='Exhibitions' && e.artistsCount==1}">
            <router-link :to="{name: 'exhibition', params: {id: e.id}}">
              {{e.title}}
              <small v-if="category[0]=='Exhibitions' && e.artistsCount==1">(solo)</small>
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
</div>
</template>
<script>
  import store from '../store';

  import {groupBy} from '../utils'
  export default{
    name: 'ArtistBio',
    store,
    methods:{
      groupBy
    },

    created: function(){
      window.bio = this;
    },

    computed: {    
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

      categories: function(){
        return [
        ['Exhibitions', this.exhibiting],
        ['Host', this.hosting],
        ['Curating', this.curating]
        ].sort( (a, b)=>b[1].length-a[1].length )
      }
    }
  }
</script>

<style>
li.solo>a:nth-child(1){
  font-weight: bold;
}

li>a:nth-child(2){

}
</style>
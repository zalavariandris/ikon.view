<template>
  <div class="CV">
    <!-- <h2>CV</h2> -->
    <section
      v-for="category in categories"
      :key="category[0]">
      <h3>{{category[0]}}</h3>
      <ul class=group>
        <li 
          v-for="group in groupBy(category[1], (e)=>moment(e.opening).year())"
          v-bind:key="group[0]">
          {{group[0]}}
          <ul>
            <li class="exhibition"
            v-for='e in group[1]'
            :key="e.id"
            :class="{solo: category[0]=='Exhibitions' && e.artistsCount==1}">
            <router-link :to="{name: 'exhibition', params: {id: e.ikonid}}">
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
  import moment from 'moment'

  export default{
    name: 'ArtistBio',
    store,
    methods:{
      groupBy,
      moment
    },
    props: ['exhibitions'],

    computed: {    
      exhibiting: function(){
        console.log(this.exhibitions);
        return this.exhibitions.filter( (e)=>e.relation=='exhibiting' );
      },

      curating: function(){
        if(this.exhibitions)
          return this.exhibitions.filter( (e)=>e.relation=='curating' );
        else
          return []
      },

      hosting: function(){
        if(this.exhibitions)
          return this.exhibitions.filter( (e)=>e.relation=='opening' );
        else
          return []
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
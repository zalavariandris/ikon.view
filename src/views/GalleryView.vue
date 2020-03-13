<template>
  <div v-if="gallery" class="GalleryView">
    <header>
      <h1>Gallery</h1>
      <h2>{{gallery.name}}</h2>
    </header>
    <section>
        <h3>Exhibitions</h3>
        <ul class="group">
          <li v-for="group in groupBy(exhibitions, (e)=>new Date(e.opening).getFullYear())">
            {{group[0]}}
            <ul>
              <li v-for='e in group[1]' 
                  v-bind:key="e.id">
                <router-link :to="{name: 'exhibition', params: {id: e.id}}">
                  {{e.title}}
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
    </section>
  </div>
</template>

<script>
  import store from '../store'
  import {groupBy} from '../utils'
  export default {
    name: 'GalleryView',
    store,
    methods: {
      groupBy
    },
    computed: {
      gallery: function(){
        return this.$store.getters.getGalleryById(this.$route.params.id);
      },
      
      exhibitions: function(){
        return this.$store.getters.getExhibitionsByGalleryId(this.$route.params.id);
      }
    }
  }
</script>
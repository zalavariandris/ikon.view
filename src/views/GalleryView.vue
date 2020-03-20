<template>
  <div v-if="gallery" class="GalleryView">
    <header>
      <!-- <h1>Gallery</h1> -->
      <h2>{{gallery.name}}</h2>
    </header>
    <section>
        <h3>Exhibitions</h3>
        <ul class="group">
          <li
          v-for="group in groupBy(exhibitions, (e)=>moment(e.opening).year())"
          :key="group[0]">
            {{group[0]}}
            <ul>
              <li v-for='e in group[1]' 
                  :key="e.id">
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
  import moment from 'moment'
  export default {
    name: 'GalleryView',
    store,
    methods: {
      groupBy,
      moment
    },
    created: function(){
      this.$store.dispatch('gallery/fetchGallery', this.$route.params.id)
      this.$store.dispatch('gallery/fetchExhibitions',this.$route.params.id);

      this.$watch('$route.params.id', ()=>{
        this.$store.dispatch('gallery/fetchGallery', this.$route.params.id)
        this.$store.dispatch('gallery/fetchExhibitions',this.$route.params.id);
      });
    },

    computed: {
      gallery: function(){
        return this.$store.state.gallery.currentGallery;
      },
      
      exhibitions: function(){
        return this.$store.state.gallery.exhibitions;
      }
    }
  }
</script>
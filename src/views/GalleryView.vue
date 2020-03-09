<template>
  <div>
    <header>
      <h1>Gallery</h1>
      <h2>{{gallery.name}}</h2>
    </header>
    <section>
      <h3>Exhibitions</h3>
      <ul>
        <li v-for='e in exhibitions' 
            v-bind:key="e.id"
            v-bind:class="{notExhibition: !e.isExhibition}"
        >
          <router-link :to="{name: 'exhibition', params: {id: e.id}}">
              <p>{{e.title}} <small>({{e.openingDate}})</small></p>
            </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    name: 'GalleryView',
    store,
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
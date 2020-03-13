<template>
  <div v-if="gallery" class="GalleryView">
    <header>
      <h1>Gallery</h1>
      <h2>{{gallery.name}}</h2>
    </header>
    <section>
        <ul>
          <li v-for="group in groupedByDate">
            {{group[0]}}
            <ul>
              <li v-for='e in group[1]' 
                  v-bind:key="e.id"
                  v-bind:class="{notExhibition: !e.isExhibition}"
              >
                <router-link :to="{name: 'exhibition', params: {id: e.id}}">
                    <p>{{e.title}} <small>({{e.openingDate}})</small></p>
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
    computed: {
      gallery: function(){
        return this.$store.getters.getGalleryById(this.$route.params.id);
      },
      
      exhibitions: function(){
        return this.$store.getters.getExhibitionsByGalleryId(this.$route.params.id);
      },

      groupedByDate: function(){
        const groups = groupBy(this.exhibitions, (d)=>new Date(d['openingDate']).getFullYear())
        return [...groups.entries()].sort( (a, b)=>b-a );
      }
    }
  }
</script>
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
                <router-link :to="{name: 'exhibition', params: {id: e.ikonid}}">
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
  import axios from 'axios'
  export default {
    name: 'GalleryView',
    store,
    data: function(){
      return {
        gallery: null,
        exhibitions: []
      }
    },
    methods: {
      groupBy,
      moment,
      fetch: function(){
        axios.get('http://localhost:3000/api/gallery/'
          +this.$route.params.id)
        .then(response => {
          console.log(response)
          this.gallery = response.data;
        });

        axios.get('http://localhost:3000/api/gallery/'
          +this.$route.params.id
          +'/exhibitions')
        .then(response => {
          console.log(response)
          this.exhibitions = response.data;
        });
      }
    },
    created: function(){
      this.fetch();
    },

    watch: {
      $route: function(){
        this.fetch();
      }
    }
  }
</script>
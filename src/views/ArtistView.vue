<template>
  <div v-if="artist" class="ArtistView">
    <header>
      <h1>Artist</h1>
      <h2>{{artist.name}}</h2>
      <nav>
        <ul>
          <li>
            <router-link :to="{name: 'artist.bio', params: {id: artist.id}}">
              bio
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'artist.stats', params: {id: artist.id}}">
              stats
            </router-link>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import store from '../store';
  import ArtistStats from './ArtistStats.vue'
  import ArtistBio from './ArtistBio.vue'

  export default {
    name: 'ArtistView',
    components: {
      ArtistStats,
      ArtistBio
    },
    store,
    computed: {
      artist: function(){
        return this.$store.getters.getArtistById(this.$route.params.id);
      }
    }
  }
</script>
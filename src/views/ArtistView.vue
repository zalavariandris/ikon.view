<template>
  <div v-if="artist" class="ArtistView">
    <header>
      <!-- <h1>Artist</h1> -->
      <h2>{{artist.name}}</h2>
      <nav>
        <ul>
          <li>
            <router-link :to="{name: 'artist', params: {id: artist.id}}">
              bio
            </router-link>
          </li>
          <li>
            <router-link :to="{name: 'artist', params: {id: artist.id, page:'stats'}}">
              stats
            </router-link>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <template v-if="$route.params.page=='stats'">
        <ArtistStats :exhibitions="exhibitions"></ArtistStats>
      </template>
      <template v-else>
        <ArtistBio :exhibitions="exhibitions"></ArtistBio>
      </template>
    </main>
  </div>
</template>

<script>
  import store from '../store';
  import ArtistStats from '../components/ArtistStats.vue'
  import ArtistBio from '../components/ArtistBio.vue'

  export default {
    name: 'ArtistView',
    store,
    components:{
      ArtistStats,
      ArtistBio
    },
    created: function(){
      this.$store.dispatch('artist/fetchArtist', this.$route.params.id);
      this.$store.dispatch('artist/fetchExhibitions', this.$route.params.id);
    },

    watch:{
      $route: function(){
        this.$store.dispatch('artist/fetchArtist', this.$route.params.id);
        this.$store.dispatch('artist/fetchExhibitions', this.$route.params.id);
      }
    },

    computed: {
      artist: function(){
        return this.$store.state.artist.currentArtist;
      },
      exhibitions: function(){
        return this.$store.state.artist.exhibitions;
      }
    }

  }
</script>
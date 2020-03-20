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

  export default {
    name: 'ArtistView',
    store,
    created: function(){
      this.$store.dispatch('artist/fetchArtist', this.$route.params.id);
      this.$store.dispatch('artist/fetchExhibitions', this.$route.params.id);
      this.$watch( '$route.params.id', ()=>{
        this.$store.dispatch('artist/fetchArtist', this.$route.params.id);
        this.$store.dispatch('artist/fetchExhibitions', this.$route.params.id);
      });
    },
    computed: {
      artist: function(){
        return this.$store.state.artist.currentArtist;
      }
    }
  }
</script>
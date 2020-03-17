<template>
  <div id="app">
    <header>
        <h1>
          <router-link to="/">
          Welcome to cleaning<br/> IKON
          </router-link>
        </h1>
      <nav>
        <ul>
          <li>
            <router-link to="/artists">artists</router-link>
          </li>
          <li>
            <router-link to="/exhibitions">exhibitions</router-link>
          </li>
          <li>
            <router-link to="/galleries">galleries</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <div id="status" v-if="loadingStatus=='loading'">
        <label for="db">loading data...</label>
        <progress id="db" v-bind:value="loadingProgress*100" max="100">{{loadingProgress*100}}%</progress>
      </div>
      <router-view v-if="
      ready"></router-view>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'


/* COMPNENTS */
// import HelloWorld from './components/HelloWorld.vue'
import ExhibitionListView from './views/ExhibitionListView.vue'
import ArtistListView from './views/ArtistListView.vue'


/* ROUTING */
import router from './router'

/* Store */
import store from './store'


/* MAIN APP */
export default {
  name: 'App',
  store,
  router,
  components: {
    ExhibitionListView,
    ArtistListView
  },

  mounted: function(){
    this.$store.dispatch('fetchDatabase');
  },

  computed: {
    ready: function(){
      return this.$store.state.database ? true : false;
    },
    loadingStatus: function(){
      return this.$store.state.loadingStatus;
    },
    loadingProgress: function(){
      return this.$store.state.loadingProgress;
    }
  }
}
</script>

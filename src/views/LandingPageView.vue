<template>
  <div class="LandingPageView">
    <ul>
      <li>
        <router-link to="/artists">
          Artists
        </router-link>
        <small v-if="artistsCount">
          ({{artistsCount}})
        </small>
      </li>
      <li>
        <router-link to="/exhibitions">
          Exhibitions
        </router-link>
        <small v-if="exhibitionsCount">
          ({{exhibitionsCount}})
        </small>
      </li>
      <li>
        <router-link to="/galleries">
          Galleries
        </router-link>
        <small v-if="galleriesCount">
          ({{galleriesCount}})
        </small>
      </li>
    </ul>
  </div>
</template>

<script>
  import store from '../store';
  export default {
    name: 'LandingPageView',
    store,
    computed: {
      artistsCount: function(){
        return this.$store.getters.artistsCount;
      },
      exhibitionsCount: function(){
        return this.$store.getters.exhibitionsCount;
      },
      galleriesCount: function(){
        return this.$store.getters.galleriesCount;
      }
    }
  }
</script>

<style>
body.home{
  text-align: left;
}
body.home nav{
  display: none;
}
.LandingPageView{
  height: 100%;
  display: flex;
  flex-direction: row;
  /*align-items: center;*/
  justify-content: space-between;
}
.LandingPageView ul{
  margin: 5% 0;
  height: 60%;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  justify-content: center;
  /*text-align: center;*/
  padding: 0;
}
.LandingPageView li{
  /*flex-basis: 100%;*/
  font-size: 150%;
  padding: 0;
  margin: 0.7em 0em;
}
.LandingPageView li small{
  display: block;
  font-size: 10px;
}
</style>
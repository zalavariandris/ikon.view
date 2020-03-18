<template>
  <div class="HomeView">
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
    name: 'HomeView',
    store,
    computeF: {
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
.HomeView{
  height: 100%;
  display: flex;
  flex-direction: row;
  /*align-items: center;*/
  justify-content: space-between;
}
.HomeView ul{
  margin: 5% 0;
  height: 60%;
  display: flex;
  flex-direction: column;
  /*align-items: center;*/
  justify-content: center;
  /*text-align: center;*/
  padding: 0;
}
.HomeView li{
  /*flex-basis: 100%;*/
  font-size: 150%;
  padding: 0;
  margin: 0.7em 0em;
}
.HomeView li small{
  display: block;
  font-size: 10px;
}
</style>
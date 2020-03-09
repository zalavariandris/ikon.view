<template>
  <div class="ExhibitionListView">
    <h2>Exhibitions <small>({{count}})</small></h2>
    <input v-model="search" placeholder="filter">
    <vpaginate 
      v-model="page"
      :count="Math.ceil(resultsCount/limit)">
    </vpaginate>
    <table>
      <thead>
        <td width="50%">title</td>
        <td width="60px">opening</td>
        <td width="60px">closing</td>
        <td width="20%">gallery</td>
      </thead>
      <tbody>
        <tr 
        v-for='e in exhibitions' 
        v-bind:key="e.id"
        v-bind:class="{notExhibition: !e.isExhibition}"
        >
          <td>
            <router-link v-bind:to="{
              name: 'exhibition', 
              params: {id: e.id}}">
              {{e.title}}
            </router-link>
          </td>
          <td>
            <small>{{e.openingDate}}</small>
          </td>
          <td>
            <small>{{e.closingDate}}</small>
          <td>
            <router-link :to="{
              name: 'gallery', 
              params: {id: e.gallery_id}}">
              {{e.gallery}}
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import store from '../store'
  import vpaginate from '../components/vpaginate'
  export default {
    name: 'ExhibitionListView',
    components: {
      vpaginate
    },
    store,
    data: function(){
      return {
        search: "",
        limit: 15,
        page: 1
      };
    },
    
    computed:{
      exhibitions: function(){
        return this.$store.getters.getExhibitionsLikeTitle(this.search, this.limit, this.page);
      },

      resultsCount: function(){
        return this.$store.getters.getExhibitionsLikeTitleCount(this.search);
      },

      count: function(){
        return this.$store.getters.exhibitionsCount;
      }
    },

    watch:{
      search: function(){
        this.page = 0;
      }
    }
  }
</script>
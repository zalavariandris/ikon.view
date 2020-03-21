<template>
  <div class="ArtistListView">
    <h2>Artists</h2>
    <vpaginate 
      v-model="page"
      :count="Math.ceil(count/limit)">
    </vpaginate>
    <table>
      <thead>
        <td><input v-model="keyword" placeholder="search name"></td>
        <td>N° exhibitions</td>
      </thead>
      <tbody>
        <tr v-for='a in artists' v-bind:key="a.id">
          <td>
            <router-link :to="{name: 'artist', params: {id: a.id}}">
              {{a.name}}
            </router-link>
          </td>
          <td>{{a.no_exhibitions}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import store from '../store'
  import vpaginate from '../components/vpaginate'
  import axios from 'axios'
  export default {
    name: 'ArtistListView',
    store,
    components:{
      vpaginate
    },

    data: function(){
      return {
        keyword: "",
        limit: 15,
        page: 1,
        artists: [],
        count: -1
      };
    },

    mounted: function(){
      window.axios = axios;
      this.search();
      this.$watch(()=>[this.keyword, this.limit, this.page], ()=>{
        this.search()
      })
    },

    watch: {
      keyword: function(){
        this.page=1;
      }
    },

    methods:{
      search: function(){
        axios.get('http://localhost:3000/api/artists', {
          params: {
            name: this.keyword,
            limit: this.limit,
            offset: (this.page-1)*this.limit
          }
        })
        .then(response => {
          this.artists = response.data.data;
          this.count = response.data.count;
        });
      }
    }
  }
</script>
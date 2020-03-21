<template>
  <div class="GalleryListView">
    <h2>Galleries</h2>
    <vpaginate 
      v-model="page"
      :count="Math.ceil(count/limit)">
    </vpaginate>
    <table>
      <thead>
        <td><input v-model="keyword" placeholder="search name"></td>
      </thead>
      <tbody>
        <tr v-for='g in galleries' v-bind:key="g.ikonid">
          <td>
            <router-link :to="{name: 'gallery', params: {id: g.ikonid}}">
              {{g.name}}
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
  import axios from 'axios'
  export default {
    name: 'GalleryListView',
    store,
    components:{
      vpaginate
    },

    data: function(){
      return {
        keyword: "",
        limit: 15,
        page: 1,
        galleries: [],
        count: -1
      };
    },

    created: function(){
      this.search();
      this.$watch(()=>[this.keyword, this.limit, this.page], ()=>{
        this.search()
      })
    },

    methods: {
      search: function(){
        axios.get('http://localhost:3000/api/galleries', {
          params: {
            name: this.keyword,
            limit: this.limit,
            offset: (this.page-1)*this.limit
          }
        })
        .then(response => {
          this.galleries = response.data.data;
          this.count = response.data.count;
        });
      }
    },

    watch: {
      keyword: function(){
        this.page = 1;
      }
    }
  }
</script>
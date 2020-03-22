<template>
  <div class="ExhibitionListView">
    <h2>Exhibitions</h2>
    
    <vpaginate
      v-model="page"
      :count="Math.ceil(count/limit)">
    </vpaginate>
    <table>
      <thead>
        <td><input v-model="keyword" placeholder="search title"></td>
        <td>gallery</td>
        <td>opening</td>
        <td>closing</td>
      </thead>
      <tbody>
        <tr 
        v-for='e in exhibitions' 
        v-bind:key="e.ikonid">
          <td>
            <router-link v-bind:to="{
              name: 'exhibition', 
              params: {id: e.ikonid}}">
              {{e.title}}
            </router-link>
          </td>
          <td>
            <router-link :to="{
              name: 'gallery', 
              params: {id: e.gallery_id}}">
              {{e.gallery_name}}
            </router-link>
          </td>
          <td>
            <small>{{moment(e.opening).format('D/M/Y')}}</small>
          </td>
          <td>
            <small>{{moment(e.closing).format('D/M/Y')}}</small><br/>
            <small>{{moment(e.closing).diff(moment(e.opening), 'days')}} days</small>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import store from '@/store'
  import vpaginate from '@/components/vpaginate'
  import moment from 'moment'
  import axios from 'axios'
  import config from '@/config.js'

  export default {
    name: 'ExhibitionListView',
    store,
    components: {
      vpaginate
    },
    data: function(){
      return {
        keyword: "",
        limit: 15,
        page: 1,
        exhibitions: [],
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

    methods:{
      moment,
      search: function(){
        axios.get(config.servicePath+'/exhibitions', {
          params: {
            title: this.keyword,
            limit: this.limit,
            offset: (this.page-1)*this.limit
          }
        })
        .then(response => {
          this.exhibitions = response.data.data;
          this.count = response.data.count;
        });
      }
    },

    watch:{
      keyword: function(){
        this.page=1;
      }
    }
  }
</script>
<template>
  <div class="ExhibitionListView">
    <h2>Exhibitions</h2>
    
    <vpaginate
      v-model="page"
      :count="Math.ceil(count/limit)">
    </vpaginate>
    <table>
      <thead>
        <td width="50%"><input v-model="search" placeholder="search title"></td>
        <td width="20%">gallery</td>
        <td width="60px">opening</td>
        <td width="60px">closing</td>
      </thead>
      <tbody>
        <tr 
        v-for='e in exhibitions' 
        v-bind:key="e.id">
          <td>
            <router-link v-bind:to="{
              name: 'exhibition', 
              params: {id: e.id}}">
              {{e.title}}
            </router-link>
          </td>
          <td>
            <router-link :to="{
              name: 'gallery', 
              params: {id: e.gallery_id}}">
              {{e.gallery}}
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
  import store from '../store'
  import vpaginate from '../components/vpaginate'
  import moment from 'moment'
  export default {
    name: 'ExhibitionListView',
    store,
    components: {
      vpaginate
    },
    methods:{
      moment
    },

    data: function(){
      return {
        search: "",
        limit: 15,
        page: 1
      };
    },

    created: function(){
      this.$store.dispatch('searchExhibitions', {
        title: this.search,
        limit: this.limit,
        page: this.page
      });

      this.$watch(()=>[this.search, this.limit, this.page], ()=>{
        this.$store.dispatch('searchExhibitions', {
          title: this.search,
          limit: this.limit,
          page: this.page
        });
      })
    },
    
    computed:{
      exhibitions: function(){
        return this.$store.state.search.exhibitions.data;
      },

      count: function(){
        return this.$store.state.search.exhibitions.count;
      }
    },

    watch:{
      search: function(){
        this.page = 1;
      }
    }
  }
</script>
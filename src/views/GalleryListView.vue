<template>
  <div class="GalleryListView">
    <h2>Galleries</h2>
    <vpaginate 
      v-model="page"
      :count="Math.ceil(count/limit)">
    </vpaginate>
    <table>
      <thead>
        <td><input v-model="search" placeholder="search name"></td>
      </thead>
      <tbody>
        <tr v-for='g in galleries' v-bind:key="g.id">
          <td>
            <router-link :to="{name: 'gallery', params: {id: g.id}}">
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
  export default {
    name: 'GalleryListView',
    store,
    components:{
      vpaginate
    },

    data: function(){
      return {
        search: "",
        limit: 15,
        page: 1
      };
    },

    created: function(){
      this.$store.dispatch('searchGalleries', {
        name: this.search,
        limit: this.limit,
        page: this.page
      });

      this.$watch(()=>[this.search, this.limit, this.page], ()=>{
        this.$store.dispatch('searchGalleries', {
          name: this.search,
          limit: this.limit,
          page: this.page
        });
      });
    },
    
    computed:{
      galleries: function(){
        return this.$store.state.search.galleries.data;
      },

      count: function(){
        return this.$store.state.search.galleries.count;
      },

      total: function(){
        return this.$store.state.search.galleries.total;
      }
    },

    watch:{
      search: function(){
        this.page = 1;
      }
    }
  }
</script>
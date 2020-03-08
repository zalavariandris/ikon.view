<template>
  <div class="GalleryListView">
    <h2>Galleries <small>{{count}}</small></h2>
    <input v-model="search" placeholder="filter">
    <vpaginate 
      v-model="page"
      :count="Math.ceil(resultsCount/limit)">
    </vpaginate>
    <table>
      <thead>
        <td>name</td>
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
    
    computed:{
      galleries: function(){
        if(this.$store.state.database == undefined)
          return []

        // query database
        let sql = `
        SELECT ikonid, name
        FROM galleries
        WHERE name LIKE '%${this.search}%'
        LIMIT ${this.limit} OFFSET ${this.page-1}*${this.limit};
        `;

        let results = this.$store.state.database.exec(sql);

        if(!results[0])
          return [];

        return results[0]['values'].map((row)=>{
          return {
            'id': row[0],
            'name': row[1]
          }
        });
      },
      count: function(){
        if(!this.$store.state.database)
          return NaN

        let sql = `
        SELECT COUNT(ikonid)
        FROM galleries
        WHERE name LIKE '%${this.search}%'
        `;

        let results = this.$store.state.database.exec(sql);

        if(!results[0])
          return [];

        return results[0].values[0][0]
      },
      resultsCount: function(){
        if(!this.$store.state.database)
          return NaN

        let sql = `
        SELECT COUNT(ikonid)
        FROM galleries
        WHERE name LIKE '%${this.search}%'
        `;

        let results = this.$store.state.database.exec(sql);

        if(!results[0])
          return [];

        return results[0].values[0][0]
      }
    },

    watch:{
      search: function(){
        this.page = 0;
      }
    }


  }
</script>
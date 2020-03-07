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
        <td>title</td>
        <td>date</td>
        <td>
        gallery</td>
      </thead>
      <tbody>
        <tr v-for='e in exhibitions' v-bind:key="e.id">
          <td>
            <router-link :to="{name: 'exhibition', params: {id: e.id}}">
              {{e.title}}
            </router-link>
          </td>
          <td>{{e.date}}</td>
          <td>
            <router-link :to="{name: 'gallery', params: {id: e.gallery_id}}">
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
  import vpaginate from './vpaginate'
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
        if(this.$store.state.database == undefined)
          return []

        // query database
        let sql = `
        SELECT e.ikonid, e.title, e.date, g.ikonid, g.name
        FROM exhibitions e
        JOIN galleries g ON g.ikonid=e.gallery_id
        WHERE title LIKE '%${this.search}%'
        ORDER BY date DESC
        LIMIT ${this.limit} OFFSET ${this.page-1}*${this.limit};
        `;

        let results = this.$store.state.database.exec(sql);

        if(!results[0])
          return [];

        return results[0]['values'].map((row)=>{
          return {
            'id': row[0],
            'title': row[1],
            'date': row[2],
            'gallery_id': row[3],
            'gallery': row[4]
          }
        });
      },

      count: function(){
        if(!this.$store.state.database)
          return NaN

        let sql = `
        SELECT COUNT(ikonid)
        FROM exhibitions
        `

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
        FROM exhibitions
        WHERE title LIKE '%${this.search}%'
        `

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
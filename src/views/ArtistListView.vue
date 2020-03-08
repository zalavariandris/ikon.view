<template>
  <div class="ArtistListView">
    <h2>Artists
    <small>{{count}}</small>
    </h2>

    <input v-model="search" placeholder="filter">
    <vpaginate 
      v-model="page"
      :count="Math.ceil(resultsCount/limit)">
    </vpaginate>
    <table>
      <thead>
        <td>name</td>
        <td>exhibitions</td>
      </thead>
      <tbody>
        <tr v-for='a in artists' v-bind:key="a.id">
          <td>
            <router-link :to="{name: 'artist', params: {id: a.id}}">
              {{a.name}}
            </router-link>
          </td>
          <td>{{a.count}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import store from '../store'
  import vpaginate from '../components/vpaginate'
  export default {
    name: 'ArtistListView',
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
      artists: function(){
        if(this.$store.state.database == undefined)
          return []

        // query database
        let sql = `
        SELECT a.id, a.name, COUNT(DISTINCT ae.exhibition_id) as No_exhibitions
        FROM artists a
        INNER JOIN exhibitingOn ae ON ae.artist_id = a.id
        WHERE a.name LIKE '%${this.search}%'
        GROUP BY a.id 
        ORDER BY No_exhibitions DESC
        LIMIT ${this.limit} OFFSET ${this.page-1}*${this.limit};
        `;

        let results = this.$store.state.database.exec(sql);
        if(!results[0])
          return [];
        return results[0]['values'].map((row)=>{
          return {
            'id': row[0],
            'name': row[1],
            'count': row[2]
          }
        });
      },

      count: function(){
        if(!this.$store.state.database)
          return NaN

        let sql = `
        SELECT COUNT(id)
        FROM artists
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
        SELECT COUNT(id)
        FROM artists
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
<template>
  <div>
    <header>
      <h2>{{artist.name}}</h2>
    </header>
    <section>
      <h3>Exhibitions</h3>
      <ol>
        <li v-for='e in exhibitions'
            v-bind:key="e.id"
            v-bind:class="{notExhibition: !e.isExhibition}">
          <router-link :to="{name: 'exhibition', params: {id: e.id}}">
            <p>{{e.title}} <small>({{e.date}})</small></p>
          </router-link>
        </li>
      </ol>

      <h3>Curating</h3>
      <ol>
        <li v-for='e in curating' 
            v-bind:key="e.id"
            v-bind:class="{notExhibition: !e.isExhibition}">
          <router-link :to="{name: 'exhibition', params: {id: e.id}}">
            <p>{{e.title}} <small>({{e.date}})</small></p>
          </router-link>
        </li>
      </ol>

      <h3>Opening</h3>
      <ol>
        <li v-for='e in opening' 
            v-bind:key="e.id"
            v-bind:class="{notExhibition: !e.isExhibition}">
          <router-link :to="{name: 'exhibition', params: {id: e.id}}">
            <p>{{e.title}} <small>({{e.date}})</small></p>
          </router-link>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    name: 'ArtistView',
    store,
    computed: {
      artist: function(){
        if(this.$store.state.database == undefined)
          return {};

        let sql = `
        SELECT id, name
        FROM artists
        WHERE id = ${this.$route.params.id}
        LIMIT 1;
        `;
        
        let results = this.$store.state.database.exec(sql);
        let row = results[0].values[0]
        return {
          id: row[0],
          name: row[1]
        }
      },
      
      exhibitions: function(){
        if(!this.$store.state.database)
          return [];
        
        const sql = `
        SELECT DISTINCT e.ikonid, e.title, e.date, e.isExhibition
        FROM exhibitions e
        INNER JOIN exhibitingOn ae ON e.ikonid = ae.exhibition_id
        WHERE ae.artist_id = ${this.$route.params.id}
        ORDER BY e.date DESC;
        `;

        let results = this.$store.state.database.exec(sql);
        if(!results[0])
          return [];

        return results[0].values.map((row)=>{
          return {
            id: row[0],
            title: row[1],
            date: row[2],
            isExhibition: row[3]
          }
        });
      },

      curating: function(){
          if(!this.$store.state.database)
          return [];
        
        const sql = `
        SELECT DISTINCT e.ikonid, e.title, e.date, e.isExhibition
        FROM exhibitions e
        INNER JOIN curatingThe ae ON e.ikonid = ae.exhibition_id
        WHERE ae.artist_id = ${this.$route.params.id}
        ORDER BY e.date DESC;
        `;

        let results = this.$store.state.database.exec(sql);
        if(!results[0])
          return [];

        return results[0].values.map((row)=>{
          return {
            id: row[0],
            title: row[1],
            date: row[2],
            isExhibition: row[3]
          }
        });
      },

      opening: function(){
          if(!this.$store.state.database)
          return [];
        
        const sql = `
        SELECT DISTINCT e.ikonid, e.title, e.date, e.isExhibition
        FROM exhibitions e
        INNER JOIN openingThe ae ON e.ikonid = ae.exhibition_id
        WHERE ae.artist_id = ${this.$route.params.id}
        ORDER BY e.date DESC;
        `;

        let results = this.$store.state.database.exec(sql);
        if(!results[0])
          return [];

        return results[0].values.map((row)=>{
          return {
            id: row[0],
            title: row[1],
            date: row[2],
            isExhibition: row[3]
          }
        });
      }
    }
  }
</script>
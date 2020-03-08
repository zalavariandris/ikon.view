<template>
  <div>
    <header>
      <h2>{{exhibition.title}}</h2>
      <p>{{exhibition.date}}</p>
      <p>
        <router-link :to="{name: 'gallery', params: {id: exhibition.gallery_id}}">
          {{exhibition.gallery}}
        </router-link>
      </p>
      <p>
        <a target='blank' :href="'https://ikon.hu/cal/'+exhibition.id">https://ikon.hu/cal/{{exhibition.id}}</a>
      </p>
    </header>
    <section>
      <h3>Artists</h3>
      <ul>
        <li v-for='a in artists' v-bind:key="a.id">
          <router-link :to="{name: 'artist', params: {id: a.id}}">
            {{a.name}}
          </router-link>
        </li>
      </ul>

      <h3>Curators</h3>
      <ul>
        <li v-for='a in curators' v-bind:key="a.id">
          <router-link :to="{name: 'artist', params: {id: a.id}}">
            {{a.name}}
          </router-link>
        </li>
      </ul>

      <h3>Opening</h3>
      <ul>
        <li v-for='a in opening' v-bind:key="a.id">
          <router-link :to="{name: 'artist', params: {id: a.id}}">
            {{a.name}}
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import store from '../store'
  export default {
    name: 'ExhibitionView',
    store,
    computed: {
      exhibition: function(){
        if(this.$store.state.database == undefined)
          return {};

        // let sql = `
        // SELECT id, title, date, gallery_id
        // FROM exhibitions 
        
        // `;

        let sql = `
        SELECT e.ikonid, e.title, e.date, g.ikonid, g.name
        FROM exhibitions e
        JOIN galleries g ON g.ikonid=e.gallery_id
        WHERE e.ikonid = ${this.$route.params.id}
        LIMIT 1;
        `;
        
        let results = this.$store.state.database.exec(sql);
        let row = results[0].values[0]
        return {
          id: row[0],
          title: row[1],
          date: row[2],
          gallery_id: row[3],
          gallery: row[4]
        }
      },
      
      artists: function(){
        if(!this.$store.state.database)
          return [];
        
        const sql = `
        SELECT DISTINCT a.id, a.name
        FROM exhibitingOn ae
        INNER JOIN artists a ON a.id = ae.artist_id
        WHERE ae.exhibition_id = ${this.$route.params.id}
        `;

        let results = this.$store.state.database.exec(sql);
        if(!results[0])
          return [];

        return results[0].values.map((row)=>{
          return {
            id: row[0],
            name: row[1]
          }
        });
      },

      curators: function(){
        if(!this.$store.state.database)
          return [];
        
        const sql = `
        SELECT DISTINCT a.id, a.name
        FROM curatingThe ae
        INNER JOIN artists a ON a.id = ae.artist_id
        WHERE ae.exhibition_id = ${this.$route.params.id}
        `;

        let results = this.$store.state.database.exec(sql);
        if(!results[0])
          return [];

        return results[0].values.map((row)=>{
          return {
            id: row[0],
            name: row[1]
          }
        });
      },

      opening: function(){
        if(!this.$store.state.database)
          return [];
        
        const sql = `
        SELECT DISTINCT a.id, a.name
        FROM openingThe ae
        INNER JOIN artists a ON a.id = ae.artist_id
        WHERE ae.exhibition_id = ${this.$route.params.id}
        `;

        let results = this.$store.state.database.exec(sql);
        if(!results[0])
          return [];

        return results[0].values.map((row)=>{
          return {
            id: row[0],
            name: row[1]
          }
        });
      }
    }
  }
</script>
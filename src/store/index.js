import Vue from 'vue'
import Vuex from 'vuex'
import initSqlJs from 'sql.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: "notLoading",
    loadingProgress: 0,
    database: null,
    error_msg: ""
  },

  mutations: {
    SET_LOADING_STATUS(state, status){
      state.loadingStatus = status;
    },

    SET_LOADING_PROGRESS(state, progress){
      state.loadingProgress = progress;
    },
    
    SET_DATABASE(state, database){
      state.database = database;
      window.database = database;
    },

    SET_ERROR_MSG(state, msg){
    	state.error_msg = msg;
    }
  },

  actions:{
    fetchDatabase: function(context){
      context.commit('SET_LOADING_STATUS', 'loading');
      const SQL = initSqlJs({
        locateFile: file => `./${file}`
      }).then((SQL)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "./ikon_v005.db", true);
        xhr.responseType = 'arraybuffer';

        xhr.onprogress = (e)=>{
          let progress = e.loaded/e.total;
          context.commit('SET_LOADING_PROGRESS', progress);
        }

        xhr.onload = (e)=> {
          var uInt8Array = new Uint8Array(xhr.response);
          let db = new SQL.Database(uInt8Array);
          context.commit('SET_DATABASE', db);
          context.commit('SET_LOADING_STATUS', 'notLoading');
        };

        xhr.onerror = ()=>{
          alert("ERROR loading database:", xhr.statusText);
          context.commit('SET_ERROR_MSG', xhr.statusText);
        }

        xhr.send();
      });
      
    }
  },

  getters:{
    // Query Artists
    artistsCount: (state, getters) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT COUNT(id)
      FROM artists
      `;

      let results = state.database.exec(sql);

      if(!results[0])
        return NaN;

      return results[0].values[0][0];
    },

    getArtistById: (state, getters) => (id) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT id, name
      FROM artists
      WHERE id = ${id}
      LIMIT 1;
      `;
      
      let results = state.database.exec(sql);
      let row = results[0].values[0]
      return {
        id: row[0],
        name: row[1]
      }
    },

    getArtistsByIds: (state, getters) => (ids) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT id, name
      FROM artists
      WHERE id IN (${ids})
      `;
      
      let results = state.database.exec(sql);
      if(!results[0])
        return [];
      return results[0]['values'].map((row)=>{
        return {
          'id': row[0],
          'name': row[1]
        }
      });
    },

    getArtistsLikeName: (state) => (name, limit, page) => {
      console.assert(state.database!=null)

      // query database
      let sql = `
      SELECT a.id, a.name, COUNT(DISTINCT ae.exhibition_id) as No_exhibitions
      FROM artists a
      INNER JOIN relations ae ON ae.artist_id = a.id
      WHERE a.name LIKE '%${name}%'
      AND ae.relation='exhibiting'
      GROUP BY a.id 
      ORDER BY No_exhibitions DESC
      LIMIT ${limit} OFFSET ${page-1}*${limit};
      `;

      let results = state.database.exec(sql);
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

    getArtistsLikeNameCount: (state) => (name) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT COUNT(id)
      FROM artists
      WHERE name LIKE '%${name}%'
      `;

      let results = state.database.exec(sql);

      if(!results[0])
        return [];

      return results[0].values[0][0]
    },

    getArtistsByExhibitionId: (state) => (id) => {
      console.assert(state.database!=null)
      
      const sql = `
      SELECT DISTINCT a.id, a.name, ae.relation
      FROM relations ae
      INNER JOIN artists a ON a.id = ae.artist_id
      WHERE ae.exhibition_id = ${id}
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          name: row[1],
          relation: row[2]
        }
      });
    },

    getArtistsByExhibitionIds: (state, getters) => (ids)=> {
      console.assert(state.database!=null)
      
      const sql = `
      SELECT DISTINCT a.id, a.name
      FROM exhibitingOn ae
      INNER JOIN artists a ON a.id = ae.artist_id
      WHERE ae.exhibition_id IN (${ids})
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          name: row[1]
        }
      });
    },

    // Query Exhibitions
    exhibitionsCount: (state) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT COUNT(ikonid)
      FROM exhibitions
      `

      let results = state.database.exec(sql);

      if(!results[0])
        return NaN

      return results[0].values[0][0]
    },

    getExhibitionById: (state, getters) => (id) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT e.ikonid, e.title, e.opening, e.closing, g.ikonid, g.name, e.description
      FROM exhibitions e
      JOIN galleries g ON g.ikonid=e.gallery_id
      WHERE e.ikonid = ${id}
      LIMIT 1;
      `;
      
      let results = state.database.exec(sql);
      let row = results[0].values[0]
      return {
        id: row[0],
        title: row[1],
        openingDate: row[2],
        closingDate: row[3],
        gallery_id: row[4],
        gallery: row[5],
        description: row[6]
      }
    },


    getExhibitionsByIds: (state, getters) => (ids) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT e.ikonid, e.title, e.opening, e.closing, g.ikonid, g.name, e.description
      FROM exhibitions e
      JOIN galleries g ON g.ikonid=e.gallery_id
      WHERE e.ikonid IN (${ids})
      `;
      
      let results = state.database.exec(sql);
      return results[0].values.map( (row)=>{
        return {
          id: row[0],
          title: row[1],
          opening: row[2],
          closing: row[3],
          gallery_id: row[4],
          gallery: row[5],
          description: row[6]
        }
      });
    },

    getExhibitionsLikeTitle: (state) => (title, limit, page) => {
      console.assert(state.database!=null)

      // query database
      let sql = `
      SELECT e.ikonid, e.title, e.opening, e.closing, e.isExhibition, g.ikonid, g.name
      FROM exhibitions e
      JOIN galleries g ON g.ikonid=e.gallery_id
      WHERE title LIKE '%${title}%'
      ORDER BY e.opening DESC
      LIMIT ${limit} OFFSET ${page-1}*${limit};
      `;

      let results = state.database.exec(sql);

      if(!results[0])
        return [];



      return results[0]['values'].map((row)=>{
        return {
          'id': row[0],
          'title': row[1],
          'opening': row[2],
          'closing': row[3],
          'isExhibition': row[4],
          'gallery_id': row[5],
          'gallery': row[6]
        }
      });
    },

    getExhibitionsLikeTitleCount: (state) => (title) => {
        console.assert(state.database!=null)

        let sql = `
        SELECT COUNT(ikonid)
        FROM exhibitions
        WHERE title LIKE '%${title}%'
        `

        let results = state.database.exec(sql);

        if(!results[0])
          return [];

        return results[0].values[0][0]
    },

    getExhibitionsByArtistId: (state, getters) => (id) => {
      console.assert(state.database!=null)
      
      const sql = `
      SELECT DISTINCT e.ikonid, e.title, e.opening, e.isExhibition, ae.relation, em.artistsCount, e.gallery_id, g.name, gm.exhibition_count
      FROM exhibitions e
      JOIN relations ae ON e.ikonid = ae.exhibition_id
      JOIN galleries g ON g.ikonid==e.gallery_id
      JOIN (
        SELECT e.ikonid, COUNT(ae.exhibition_id) AS artistsCount
        FROM exhibitions e
        LEFT OUTER JOIN relations ae ON e.ikonid = ae.exhibition_id
        WHERE ae.relation == 'exhibiting'
        GROUP BY e.ikonid
      ) em ON em.ikonid == e.ikonid
      JOIN (
          SELECT g.ikonid, g.name, COUNT(e.ikonid) as exhibition_count
          FROM galleries g
          LEFT JOIN exhibitions e ON e.gallery_id==g.ikonid
          GROUP BY g.ikonid
      ) gm ON gm.ikonid==e.gallery_id
      WHERE ae.artist_id = ${id}
      ORDER BY e.opening DESC;
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          opening: row[2],
          isExhibition: row[3],
          relation: row[4],
          artistCount: row[5],
          gallery_id: row[6],
          gallery: row[7],
          exhibition_count: row[8]
        }
      });
    },

    getExhibitionsByGalleryId: (state, getters) => (id) => {
      console.assert(state.database!=null)
      
      const sql = `
      SELECT DISTINCT e.ikonid, e.title, e.opening, e.isExhibition, e.gallery_id, g.name
      FROM exhibitions e
      JOIN galleries g ON e.gallery_id==g.ikonid
      WHERE gallery_id = ${id}
      ORDER BY e.opening DESC;
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          opening: row[2],
          isExhibition: row[3],
          gallery_id: row[4],
          gallery: row[5]
        }
      });
    },

    // Query Galleries
    galleriesCount: (state) => {
      console.assert(state.database!=null)

      let sql = `
      SELECT COUNT(ikonid)
      FROM galleries
      `

      let results = state.database.exec(sql);

      if(!results[0])
        return NaN

      return results[0].values[0][0]
    },

    getGalleryById: (state, getters) => (id) => {
        if(state.database == undefined)
          return {};

        let sql = `
        SELECT ikonid, name
        FROM galleries
        WHERE ikonid = ${id}
        LIMIT 1;
        `;
        
        let results = state.database.exec(sql);
        let row = results[0].values[0]
        return {
          id: row[0],
          name: row[1]
        }
    },

    getGalleriesLikeName: (state) => (name, limit, page) => {
        if(state.database == undefined)
          return []

        // query database
        let sql = `
        SELECT ikonid, name
        FROM galleries
        WHERE name LIKE '%${name}%'
        ORDER BY name
        LIMIT ${limit} OFFSET ${page-1}*${limit}
        `;

        let results = state.database.exec(sql);

        if(!results[0])
          return [];

        return results[0]['values'].map((row)=>{
          return {
            'id': row[0],
            'name': row[1]
          }
        });
    },

    getGalleriesLikeNameCount: (state) => (name) => {
      if(!state.database)
        return NaN

      let sql = `
      SELECT COUNT(ikonid)
      FROM galleries
      WHERE name LIKE '%${name}%'
      `;

      let results = state.database.exec(sql);

      if(!results[0])
        return [];

      return results[0].values[0][0]
    },



  }
})
import Vue from 'vue'
import Vuex from 'vuex'
import initSqlJs from 'sql.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loadingStatus: "notLoading",
    loadingProgress: 0,
    database: null
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
    }
  },

  actions:{
    fetchDatabase: function(context){
      context.commit('SET_LOADING_STATUS', 'loading');
      const SQL = initSqlJs({
        locateFile: file => `./${file}`
      }).then((SQL)=>{
        const xhr = new XMLHttpRequest();
        xhr.open('GET', "./ikon_v002.db", true);
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
          console.log("ERROR loading database:", xhr.statusText);
        }

        xhr.send();
      });
      
    }
  },

  getters:{
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

    getArtistsLikeName: (state) => (name, limit, page) => {
      if(state.database == undefined)
        return []

      // query database
      let sql = `
      SELECT a.id, a.name, COUNT(DISTINCT ae.exhibition_id) as No_exhibitions
      FROM artists a
      INNER JOIN exhibitingOn ae ON ae.artist_id = a.id
      WHERE a.name LIKE '%${name}%'
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
      if(!state.database)
        return NaN;

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

    getExhibitionsLikeTitle: (state) => (title, limit, page) => {
      if(state.database == undefined)
        return []

      // query database
      let sql = `
      SELECT e.ikonid, e.title, e.openingDate, e.closingDate, e.isExhibition, g.ikonid, g.name
      FROM exhibitions e
      JOIN galleries g ON g.ikonid=e.gallery_id
      WHERE title LIKE '%${title}%'
      ORDER BY e.openingDate DESC
      LIMIT ${limit} OFFSET ${page-1}*${limit};
      `;

      let results = state.database.exec(sql);

      if(!results[0])
        return [];

      return results[0]['values'].map((row)=>{
        return {
          'id': row[0],
          'title': row[1],
          'openingDate': new Date(row[2]).toLocaleDateString(),
          'closingDate': isNaN(new Date(row[3])) ? "" : new Date(row[3]).toLocaleDateString(),
          'isExhibition': row[4],
          'gallery_id': row[5],
          'gallery': row[6]
        }
      });
    },

    getExhibitionsLikeTitleCount: (state) => (title) => {
        if(!state.database)
          return NaN

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

    exhibitionsCount: (state) => {
      if(!state.database)
        return NaN
      let sql = `
      SELECT COUNT(ikonid)
      FROM exhibitions
      `

      let results = state.database.exec(sql);

      if(!results[0])
        return NaN

      return results[0].values[0][0]
    },

    galleriesCount: (state) => {
      if(!state.database)
        return NaN
      let sql = `
      SELECT COUNT(ikonid)
      FROM galleries
      `

      let results = state.database.exec(sql);

      if(!results[0])
        return NaN

      return results[0].values[0][0]
    },

    artistsCount: (state) => {
      if(!state.database)
        return NaN;

      let sql = `
      SELECT COUNT(id)
      FROM artists
      `;

      let results = state.database.exec(sql);

      if(!results[0])
        return NaN;

      return results[0].values[0][0];
    },

    getGalleriesLikeName: (state) => (name, limit, page) => {
        if(state.database == undefined)
          return []

        // query database
        let sql = `
        SELECT ikonid, name
        FROM galleries
        WHERE name LIKE '%${name}%'
        LIMIT ${limit} OFFSET ${page-1}*${limit};
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

    getExhibitionById: (state, getters) => (id) => {
      if(state.database == undefined)
        return null;

      let sql = `
      SELECT e.ikonid, e.title, e.openingDate, e.closingDate, g.ikonid, g.name
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
        gallery: row[5]
      }
    },

    getArtistById: (state, getters) => (id) => {
        if(state.database == undefined)
          return {};

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

    getExhibitionsByArtistId: (state, getters) => (id) => {
      if(!state.database)
          return [];
      
      const sql = `
      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition
      FROM exhibitions e
      INNER JOIN exhibitingOn ae ON e.ikonid = ae.exhibition_id
      WHERE ae.artist_id = ${id}
      ORDER BY e.openingDate DESC;
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          openingDate: isNaN(new Date(row[2])) ? "" : new Date(row[2]).getFullYear(),
          isExhibition: row[3]
        }
      });
    },

    getExhibitionsByArtistIdWithArtistCount:(state, getters) => (id) => {
      if(!state.database)
          return [];

      const sql = `
      SELECT DISTINCT
      e.ikonid,
      e.title,
      e.openingDate,
      e.closingDate,
      e.isExhibition,
      metrics.artistsCount,
      e.gallery_id,
      g.name
      FROM exhibitions e
      INNER JOIN exhibitingOn ae ON e.ikonid==ae.exhibition_id
      INNER JOIN artists a ON a.id==ae.artist_id
      INNER JOIN galleries g ON g.ikonid == e.gallery_id
      JOIN (
          SELECT e.ikonid, COUNT(ae.exhibition_id) AS artistsCount
          FROM EXHIBITIONS e
          LEFT OUTER JOIN exhibitingOn ae ON e.ikonid = ae.exhibition_id
          GROUP BY e.ikonid
          ) metrics ON metrics.ikonid == e.ikonid
      WHERE a.id = ${id}
      ORDER BY e.openingDate DESC
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          openingDate: isNaN(new Date(row[2])) ? "" : new Date(row[2]).getFullYear(),
          closingDate: isNaN(new Date(row[3])) ? "" : new Date(row[3]).getFullYear(),
          isExhibition: row[4],
          artistsCount: row[5],
          gallery_id: row[6],
          gallery: row[7]
        }
      });
    },

    getExhibitionsByCuratorId: (state, getters) => (id) => {
      if(!state.database)
        return [];
      
      const sql = `
      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition
      FROM exhibitions e
      INNER JOIN curatingThe ae ON e.ikonid = ae.exhibition_id
      WHERE ae.artist_id = ${id}
      ORDER BY e.openingDate DESC;
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          openingDate: isNaN(new Date(row[2])) ? "" : new Date(row[2]).getFullYear(),
          isExhibition: row[3]
        }
      });
    },

    getExhibitionsByOpeningspeechId: (state) => (id) => {
      if(!state.database)
        return [];
      
      const sql = `
      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition
      FROM exhibitions e
      INNER JOIN openingThe ae ON e.ikonid = ae.exhibition_id
      WHERE ae.artist_id = ${id}
      ORDER BY e.openingDate DESC;
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          openingDate: isNaN(new Date(row[2])) ? "" : new Date(row[2]).getFullYear(),
          isExhibition: row[3]
        }
      });
    },

    getArtistsByExhibitionId: (state) => (id) => {
      if(!state.database)
        return [];
      
      const sql = `
      SELECT DISTINCT a.id, a.name
      FROM exhibitingOn ae
      INNER JOIN artists a ON a.id = ae.artist_id
      WHERE ae.exhibition_id = ${id}
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

    getArtistsByExhibitionIds: (state, getters) => (ids)=> {
      if(!state.database)
        return [];
      
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

    getCuratorsByExhibitionId: (state) => (id) => {
      if(!state.database)
        return [];
      
      const sql = `
      SELECT DISTINCT a.id, a.name
      FROM curatingThe ae
      INNER JOIN artists a ON a.id = ae.artist_id
      WHERE ae.exhibition_id = ${id}
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

    getOpeningspeechByExhibitionId: (state) => (id) => {
      if(!state.database)
        return [];
      
      const sql = `
      SELECT DISTINCT a.id, a.name
      FROM openingThe ae
      INNER JOIN artists a ON a.id = ae.artist_id
      WHERE ae.exhibition_id = ${id}
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

    getExhibitionsByGalleryId: (state) => (id) => {
      if(!state.database)
        return [];
      
      // query database
      const sql = `
      SELECT DISTINCT ikonid, title, openingDate, isExhibition
      FROM exhibitions
      WHERE gallery_id = ${id}
      ORDER BY openingDate DESC;
      `;

      let results = state.database.exec(sql);
      if(!results[0])
        return [];

      return results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          openingDate: isNaN(new Date(row[2])) ? "" : new Date(row[2]).getFullYear(),
          isExhibition: row[3]
        }
      });
    }
  }
})
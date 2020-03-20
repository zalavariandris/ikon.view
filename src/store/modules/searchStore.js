const searchStore = {
  state:{
    artists: {data: [], count: -1},
    exhibitions: {data: [], count: -1},
    galleries: {data: [], count: -1},
  },
  
  mutations:{
    //
    SET_EXHIBITIONS(state, payload){
      console.assert(payload.data instanceof Array, 'payload data must be an array of exhibitions')
      state.exhibitions = {data: payload.data, count: payload.count};
    },

    SET_ARTISTS(state, payload){
      console.assert(payload.data instanceof Array, 'payload data must be an array of artists')
      state.artists = {data: payload.data, count: payload.count};
    },

    SET_GALLERIES(state, payload){
      console.assert(payload.data instanceof Array, 'payload data must be an array of galleries')
      state.galleries = {data: payload.data, count: payload.count};
    }
  },

  actions:{
    searchArtists: (context, opt)=>{
      console.assert(context.rootState.database!=null)

      // query database
      let sql = `
      SELECT a.id, a.name, COUNT(DISTINCT ae.exhibition_id) as No_exhibitions
      FROM artists a
      INNER JOIN relations ae ON ae.artist_id = a.id
      WHERE a.name LIKE '%${opt.name}%'
      AND ae.relation='exhibiting'
      GROUP BY a.id 
      ORDER BY No_exhibitions DESC
      LIMIT ${opt.limit} OFFSET ${opt.page-1}*${opt.limit};
      `;

      let results = context.rootState.database.exec(sql);
      if(!results[0]){
        context.commit('SET_ARTISTS', {data: [], count: 0});
        return
      }
      const artists = results[0].values.map((row)=>{
        return {
          id: row[0],
          name: row[1],
          count: row[2]
        }
      });

      // get total count without limits
      const count = context.rootState.database.exec(`
        SELECT COUNT(id)
        FROM artists
        WHERE name LIKE '%${opt.name}%'
        `)[0].values[0];

      //return value
      context.commit('SET_ARTISTS', {data: artists, count: count});
    },

    searchExhibitions: (context, opt)=>{
      console.assert(context.rootState.database!=null)
      // query database
      let sql = `
      SELECT e.ikonid, e.title, e.opening, e.closing, e.isExhibition, g.ikonid, g.name
      FROM exhibitions e
      JOIN galleries g ON g.ikonid=e.gallery_id
      WHERE title LIKE '%${opt.title}%'
      ORDER BY e.opening DESC
      LIMIT ${opt.limit} OFFSET ${opt.page-1}*${opt.limit};
      `;

      let results = context.rootState.database.exec(sql);

      if(!results[0]){
        context.commit('SET_EXHIBITIONS', {data:[], count:0});
        return;
      }

      const count = context.rootState.database.exec(`
        SELECT COUNT(ikonid)
        FROM exhibitions
        WHERE title LIKE '%${opt.title}%'
        `)[0].values[0];

      const exhibitions = results[0].values.map((row)=>{
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

      context.commit('SET_EXHIBITIONS', {data: exhibitions, count: count});
    },

    searchGalleries: (context, opt)=>{
      console.assert(context.rootState.database!=null)

      // query database
      let sql = `
      SELECT ikonid, name
      FROM galleries
      WHERE name LIKE '%${opt.name}%'
      ORDER BY name
      LIMIT ${opt.limit} OFFSET ${opt.page-1}*${opt.limit}
      `;

      let results = context.rootState.database.exec(sql);

      if(!results[0]){
        context.commit('SET_GALLERIES', {data:[], count: 0});
        return
      }

      const count = context.rootState.database.exec(`
        SELECT COUNT(ikonid) FROM galleries
        WHERE name LIKE '%${opt.name}%'
        ;`)[0].values[0]

      const galleries = results[0].values.map((row)=>{
        return {
          'id': row[0],
          'name': row[1]
        }
      });

      context.commit('SET_GALLERIES', {data: galleries, count: count});
    }
  }
}

export default searchStore;
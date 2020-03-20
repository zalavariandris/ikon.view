const exhibitionStore = {
  namespaced: true,
  state:{
    currentExhibition: null,
    artists: []
  },

  mutations: {
    SET_CURRENT_EXHIBITION: (state, exhibition)=>{
      state.currentExhibition = exhibition;
    },

    SET_ARTISTS: (state, artists)=>{
      state.artists = artists;
    }
  },

  actions: {
    fetchExhibition: (context, id)=>{
      console.assert(context.rootState.database!=null)

      let sql = `
      SELECT e.ikonid, e.title, e.opening, e.closing, g.ikonid, g.name
      FROM exhibitions e
      JOIN galleries g ON g.ikonid=e.gallery_id
      WHERE e.ikonid = ${id}
      LIMIT 1;
      `;
      
      let results = context.rootState.database.exec(sql);
      if(!results[0]){
        context.commit('SET_CURRENT_EXHIBITION', null);
        return;
      }

      let row = results[0].values[0]
      context.commit('SET_CURRENT_EXHIBITION', {
        id: row[0],
        title: row[1],
        opening: row[2],
        closing: row[3],
        gallery_id: row[4],
        gallery: row[5]
      });
    },

    fetchArtists: (context, id)=>{
      console.assert(context.rootState.database!=null)

      const sql = `
      SELECT DISTINCT a.id, a.name, ae.relation
      FROM relations ae
      INNER JOIN artists a ON a.id = ae.artist_id
      WHERE ae.exhibition_id = ${id}
      `;

      let results = context.rootState.database.exec(sql);
      if(!results[0]){
        context.commit('SET_ARTISTS', {data: [], count:-1});
        return;
      }

      const artists = results[0].values.map((row)=>{
        return {
          id: row[0],
          name: row[1],
          relation: row[2]
        }
      });

      context.commit('SET_ARTISTS', artists);
    },
  }
}

export default exhibitionStore;
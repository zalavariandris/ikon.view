const galleryStore = {
  namespaced: true,
  state: {
    currentGallery: null,
    exhibitions: []
  },
  mutations: {
    SET_CURRENT_GALLERY: (state, gallery)=>{
      state.currentGallery = gallery;
    },

    SET_EXHIBITIONS: (state, exhibitions)=>{
      console.assert(exhibitions instanceof Array, 'Exhibitions must be an array');
      state.exhibitions = exhibitions;
    }
  },

  actions:{
    fetchGallery: (context, id) => {
      console.assert(context.rootState.database!=null)

      let sql = `
      SELECT ikonid, name
      FROM galleries
      WHERE ikonid = ${id}
      LIMIT 1;
      `;

      let results = context.rootState.database.exec(sql);
      let row = results[0].values[0]
      context.commit('SET_CURRENT_GALLERY', {
        id: row[0],
        name: row[1]
      });
    },

    fetchExhibitions: (context, id)=>{
      console.assert(context.rootState.database!=null)

      const sql = `
      SELECT DISTINCT e.ikonid, e.title, e.opening, e.isExhibition, e.gallery_id, g.name
      FROM exhibitions e
      JOIN galleries g ON e.gallery_id==g.ikonid
      WHERE gallery_id = ${id}
      ORDER BY e.opening DESC;
      `;

      let results = context.rootState.database.exec(sql);
      if(!results[0]){
        context.commit('SET_EXHIBITIONS', {data: [], count: 0})
        return;
      }

      const exhibitions = results[0].values.map((row)=>{
        return {
          id: row[0],
          title: row[1],
          opening: row[2],
          isExhibition: row[3],
          gallery_id: row[4],
          gallery: row[5]
        }
      });

      context.commit('SET_EXHIBITIONS', exhibitions);
    },
  }
}

export default galleryStore;
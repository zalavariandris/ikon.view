const artistStore = {
    namespaced: true,
    state: {
        currentArtist: null,
        exhibitions: []
    },

    mutations:{
        SET_CURRENT_ARTIST(state, artist){
          state.currentArtist = artist;
        },

        SET_EXHIBITIONS(state, exhibitions){
          state.exhibitions = exhibitions;
        }
    },

    actions: {
        fetchArtist: (context, id)=>{
          console.assert(context.rootState.database!=null)

          let sql = `
          SELECT id, name
          FROM artists
          WHERE id = ${id}
          LIMIT 1;
          `;
          
          let results = context.rootState.database.exec(sql);

          if(!results[0]){
            context.commit('SET_CURRENT_ARTIST', null);
            return;
          }

          let row = results[0].values[0]
          context.commit('SET_CURRENT_ARTIST', {
            id: row[0],
            name: row[1]
          });
        },

        fetchExhibitions: (context, id)=>{
          console.assert(context.rootState.database!=null)
          
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

          let results = context.rootState.database.exec(sql);
          if(!results[0]){
            context.commit('SET_EXHIBITIONS', []);
            return;
          }

          let exhibitions = results[0].values.map((row)=>{
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
          context.commit('SET_EXHIBITIONS', exhibitions);
        },

    }
}

export default artistStore;
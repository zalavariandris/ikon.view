<template>
    <div>
        <!-- <h2>Statistics</h2> -->
        <section>
            <!-- <h3>Timeline</h3> -->
            <careertrajectory :plot="plot" :legend="legend"></careertrajectory>
        </section>
        <section>
            <!-- <h3>Ego network</h3> -->
            <figure>
                <d3graphology :graph="graph"></d3graphology>
                    <figcaption class='stats'>
                    nodes: {{graph.nodes().length}}
                    edges: {{graph.edges().length}}
                </figcaption>
            </figure>
        </section>
    </div>
</template>

<script>
    import graphology from 'graphology';
    import subGraph from 'graphology-utils/subgraph';
    import d3graphology from '../components/d3graphology.vue';
    import careertrajectory from '../components/careertrajectory.vue';

    export default {
        name: 'ArtistStats',
        components:{careertrajectory, d3graphology},

        computed:{
            exhibitions: function(){
                return this.$store.getters.getExhibitionsByArtistId(this.$route.params.id);
            },

            exhibiting: function(){
                return this.exhibitions.filter( (e)=>e.relation=='exhibiting' );
            },

            graph: function(){
                console.assert(this.$store.state.database ? true : false);

                const sql = `
                SELECT DISTINCT A.artist_id AS a, A.exhibition_id AS b, B.artist_id AS c, C.exhibition_id AS d
                FROM relations A
                JOIN relations B ON B.exhibition_id==A.exhibition_id
                JOIN relations C ON C.artist_id==B.artist_id
                WHERE A.artist_id==${this.$route.params.id}
                AND a!=c`

                const result = this.$store.state.database.exec(sql);
                if(!result[0])
                    return new graphology.Graph()

                const paths = result[0].values

                let G = new graphology.Graph()
                window.G = G;
                for(let path of paths){
                    if(!G.hasNode('a'+path[0]))
                        G.addNode('a'+path[0], {color:'red'})
                    if(!G.hasNode('e'+path[1]))
                        G.addNode('e'+path[1], {color:'yellow'})
                    if(!G.hasNode('a'+path[2]))
                        G.addNode('a'+path[2], {color:'lightblue'})
                    
                    if(!G.hasEdge('a'+path[0], 'e'+path[1]))
                        G.addEdge('a'+path[0], 'e'+path[1])
                    if(!G.hasEdge('e'+path[1], 'a'+path[2]))
                        G.addEdge('e'+path[1], 'a'+path[2])
                }

                for(let path of paths){
                    if(G.hasNode(path[3]))
                        if(!G.hasEdge('a'+path[2], 'e'+path[3]))
                            G.addEdge('a'+path[2], 'e'+path[3])
                    }

                // calculate degree centrality
                for(let n of G.nodes()){
                    G.setNodeAttribute(n, 'degree',  G.degree(n));
                }

                let sumDegree = 0;
                for(let n of G.nodes()){
                    sumDegree+=G.getNodeAttribute(n, 'degree');
                }

                for(let n of G.nodes()){
                  let degree = G.degree(n)//G.getNodeAttribute(n, 'degree');
                  G.setNodeAttribute(n, 'degreeCentrality', degree/sumDegree);
              }

                // set node visual attributes
                for(let n of G.nodes()){
                    let degreeCentrality = G.getNodeAttribute(n, 'degree');
                    let defaultSize = 10;
                    G.setNodeAttribute(n, 'size', n[0]=='a' ? Math.log1p(degreeCentrality**3)*20 : defaultSize);
                }
                
                G = subGraph(G, G.nodes().filter( (n)=> G.degree(n)>1) );

                // populate artists names
                let artists = this.$store.getters.getArtistsByIds(
                    G.nodes()
                    .filter( (n)=>n[0]=='a' )
                    .map((n)=>parseInt(n.slice(1)))
                    );
                for(let a of artists){
                    G.setNodeAttribute('a'+a.id, 'label', a.name)
                }


                // populate exhibition titles
                let exhibitions = this.$store.getters.getExhibitionsByIds(
                    G.nodes()
                    .filter( (n)=>n[0]=='e' )
                    .map((n)=>parseInt(n.slice(1)))
                    );

                for(let e of exhibitions){
                    G.setNodeAttribute('e'+e.id, 'label', e.title);
                    G.setNodeAttribute('e'+e.id, 'isExhibition', e.isExhibition);
                }

                // drop leaf nodes
                G = subGraph(G, G.nodes().filter( (n)=> G.degree(n)>1) );
                return G;
            },

            plot: function(){
                let plot = this.exhibiting.map( (d)=>{
                    return {
                        x: new Date(d.opening),
                        y: d.exhibition_count,
                        label: d.gallery,
                        tooltip: d.title+'\n'+d.gallery+'\n'+new Date(d.opening).toLocaleDateString(),
                        color: d.artistCount==1 ? 'pink' : 'lightsteelblue'
                    }
                });

                plot.sort( (a, b)=>a.x-b.x );
                return plot;
            },

            legend: function(){
                return {
                    solo: 'pink',
                    group: 'lightsteelblue'
                }
            }
        }
}
</script>

<style>
  .stats{
    font-size: 70%;
    font-style: italic;
    opacity: 0.5;
  }

  figure{
    margin: 0;
  }

  section{
    margin-bottom: 3em;
  }
</style>
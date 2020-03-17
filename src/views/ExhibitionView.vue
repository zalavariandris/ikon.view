<template>
  <div v-if="exhibition" class="ExhibitionView">
    <header>
      <!-- <h1>Exhibition</h1> -->
      <h2>{{exhibition.title}}</h2>
      <p>
        {{exhibition.opening}}
        {{new Date(exhibition.opening).toLocaleDateString()}}
        <template v-if="!isNaN(new Date(exhibition.closing))">
        - {{new Date(exhibition.closing).toLocaleDateString()}}
        </template>
      </p>
      <p>
        <router-link :to="{name: 'gallery', params: {id: exhibition.gallery_id}}">
          {{exhibition.gallery}}
        </router-link>
      </p>
      <p>
        <a target='blank' :href="'https://ikon.hu/cal/'+exhibition.id">https://ikon.hu/cal/{{exhibition.id}}</a>
      </p>
    </header>
    <section class='info'>

      <section v-if="artists.length>0">
        <h3>Artist<template v-if="artists.length>1">s</template></h3>
        <ul>
          <li v-for='a in artists' v-bind:key="a.id">
            <router-link :to="{name: 'artist', params: {id: a.id}}">
              {{a.name}}
            </router-link>
          </li>
        </ul>
      </section>

      <section v-if="curators.length>0">
        <h3>Curator<template v-if="curators.length>1">s</template></h3>
        <ul>
          <li v-for='a in curators' v-bind:key="a.id">
            <router-link :to="{name: 'artist', params: {id: a.id}}">
              {{a.name}}
            </router-link>
          </li>
        </ul>
      </section>

      <section v-if="hosts.length>0">
        <h3>Host<template v-if="hosts.length>1">s</template></h3>
        <ul>
          <li v-for='a in hosts' v-bind:key="a.id">
            <router-link :to="{name: 'artist', params: {id: a.id}}">
              {{a.name}}
            </router-link>
          </li>
        </ul>
      </section>

    </section>
    <section class="description">
      {{description}}
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
        return this.$store.getters.getExhibitionById(this.$route.params.id)
      },
      
      all: function(){
        return this.$store.getters.getArtistsByExhibitionId(this.$route.params.id)
      },

      artists: function(){
        return this.all.filter( (a)=>a.relation == 'exhibiting' );
      },

      curators: function(){
        return this.all.filter( (a)=>a.relation == 'curating' );
      },

      hosts: function(){
        return this.all.filter( (a)=>a.relation == 'opening' );
      },

      description: function(){
        if(!this.exhibition.description)
          return null;
        return this.exhibition.description.split('\n').filter((p)=>p!='').map((p)=>p.trim()).join('\n');
      }
    }
  }
</script>

<style>
.info{
  display: flex;
}
.info>section{
  margin-right: 2em;
}
.description{
  white-space: pre-line;
  line-height: 2;
  font-size: 80%;
}  
</style>
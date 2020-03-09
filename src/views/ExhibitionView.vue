<template>
  <div>
    <header>
      <h1>Exhibition</h1>
      <h2>{{exhibition.title}}</h2>
      <p>{{exhibition.openingDate}}-{{exhibition.closingDate}}</p>
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
        console.log('exhibition')
        return this.$store.getters.getExhibitionById(this.$route.params.id)
      },
      
      artists: function(){
        return this.$store.getters.getArtistsByExhibitionId(this.$route.params.id)
      },

      curators: function(){
        return this.$store.getters.getCuratorsByExhibitionId(this.$route.params.id)
      },

      opening: function(){
        return this.$store.getters.getOpeningspeechByExhibitionId(this.$route.params.id)
      }
    }
  }
</script>
<template>
  <div id="app">
    <div id='error' v-if="error_msg">
      {{error_msg}}
    </div>
    <header>
        <h1>
          <router-link to="/">
          Welcome to cleaning<br/> IKON
          </router-link>
        </h1>
      <nav>
        <ul>
          <li>
            <router-link to="/artists">artists</router-link>
          </li>
          <li>
            <router-link to="/exhibitions">exhibitions</router-link>
          </li>
          <li>
            <router-link to="/galleries">galleries</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <div id="status" v-if="loadingStatus=='loading'">
        <label for="db">loading data...</label>
        <progress id="db" v-bind:value="loadingProgress*100" max="100">{{loadingProgress*100}}%</progress>
      </div>
      <router-view v-if="
      ready"></router-view>
    </main>
    <footer>
    </footer>
  </div>
</template>

<script>

/* ROUTING */
import router from './router'

/* Store */
import store from './store'


/* MAIN APP */
export default {
  name: 'App',
  store,
  router,
  created: function(){
    // check webassembly support
    const supported = (() => {
        try {
            if (typeof WebAssembly === "object"
                && typeof WebAssembly.instantiate === "function") {
                const module = new WebAssembly.Module(Uint8Array.of(0x0, 0x61, 0x73, 0x6d, 0x01, 0x00, 0x00, 0x00));
                if (module instanceof WebAssembly.Module)
                    return new WebAssembly.Instance(module) instanceof WebAssembly.Instance;
            }
        } catch (e) {
          this.$store.state.error_msg = "webAssembly is not supported"+ e;
        }
        return false;
    })();
    if(!supported){
      this.$store.state.error_msg = "webAssembly is not supported";
    }
  },
  
  mounted: function(){
    try{
      this.$store.dispatch('fetchDatabase');
    }
    catch(err) {
      this.$store.state.error_msg = err.message;
    }
  },

  computed: {
    ready: function(){
      return this.$store.state.database ? true : false;
    },

    loadingStatus: function(){
      return this.$store.state.loadingStatus;
    },
    
    loadingProgress: function(){
      return this.$store.state.loadingProgress;
    },
    
    error_msg: function(){
      return this.$store.state.error_msg;
    }
  }
}
</script>

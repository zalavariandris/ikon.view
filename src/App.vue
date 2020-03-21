<template>
  <div id="app">
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
      <router-view></router-view>
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
  router
}
</script>

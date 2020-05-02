import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
});

router.beforeEach( (to, from, next)=>{
	document.body.className = to.name;
	document.title = 'ikon.view - '+to.name;
	next();
});

export default router;
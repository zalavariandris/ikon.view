(function(t){function e(e){for(var n,r,o=e[0],l=e[1],u=e[2],d=0,h=[];d<o.length;d++)r=o[d],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&h.push(a[r][0]),a[r]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);c&&c(e);while(h.length)h.shift()();return s.push.apply(s,u||[]),i()}function i(){for(var t,e=0;e<s.length;e++){for(var i=s[e],n=!0,o=1;o<i.length;o++){var l=i[o];0!==a[l]&&(n=!1)}n&&(s.splice(e--,1),t=r(r.s=i[0]))}return t}var n={},a={app:0},s=[];function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=t,r.c=n,r.d=function(t,e,i){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(i,n,function(e){return t[e]}.bind(null,n));return i},r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/ikon.view/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var c=l;s.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},"034f":function(t,e,i){"use strict";var n=i("85ec"),a=i.n(n);a.a},1:function(t,e){},2:function(t,e){},3:function(t,e){},"3de4":function(t,e,i){},4:function(t,e){},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("header",[i("h1",[t._v("Welcome to cleaning IKON")]),i("nav",[i("ul",[i("li",[i("router-link",{attrs:{to:"/artists"}},[t._v("artists")])],1),i("li",[i("router-link",{attrs:{to:"/exhibitions"}},[t._v("exhibitions")])],1),i("li",[i("router-link",{attrs:{to:"/galleries"}},[t._v("galleries")])],1)])])]),i("main",["loading"==t.loadingStatus?i("div",{attrs:{id:"status"}},[t._v(t._s(t.loadingStatus))]):t._e(),i("router-view")],1),i("footer")])},s=[],r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ExhibitionListView"},[i("h2",[t._v("Exhibitions "),i("small",[t._v("("+t._s(t.count)+")")])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{placeholder:"filter"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),i("vpaginate",{attrs:{count:Math.ceil(t.resultsCount/t.limit)},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}),i("table",[t._m(0),i("tbody",t._l(t.exhibitions,(function(e){return i("tr",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("td",[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[t._v(" "+t._s(e.title)+" ")])],1),i("td",[t._v(" "+t._s(e.openingDate)+" ")]),i("td",[t._v(" "+t._s(e.closingDate)+" ")]),i("td",[i("router-link",{attrs:{to:{name:"gallery",params:{id:e.gallery_id}}}},[t._v(" "+t._s(e.gallery)+" ")])],1)])})),0)])],1)},o=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("td",[t._v("title")]),i("td",[t._v("opening")]),i("td",[t._v("closing")]),i("td",[t._v("gallery")])])}],l=(i("99af"),i("d81d"),i("d3b7"),i("ac1f"),i("841c"),i("ddb0"),i("ace4"),i("5cc6"),i("9a8c"),i("a975"),i("735e"),i("c1ac"),i("d139"),i("3a7b"),i("d5d6"),i("82f8"),i("e91f"),i("60bd"),i("5f96"),i("3280"),i("3fcc"),i("ca91"),i("25a1"),i("cd26"),i("3c5d"),i("2954"),i("649e"),i("219c"),i("170b"),i("b39a"),i("72f7"),i("2f62")),u=i("fdac4"),c=i.n(u);n["a"].use(l["a"]);var d=new l["a"].Store({state:{loadingStatus:"notLoading",database:null},mutations:{SET_LOADING_STATUS:function(t,e){t.loadingStatus=e},SET_DATABASE:function(t,e){t.database=e}},actions:{fetchDatabase:function(t){t.commit("SET_LOADING_STATUS","loading");c()({locateFile:function(t){return"./".concat(t)}}).then((function(e){var i=new XMLHttpRequest;i.open("GET","./ikon_v002.db",!0),i.responseType="arraybuffer",i.onprogress=function(t){var e=t.loaded/t.total;console.log("loading...",e)},i.onload=function(n){var a=new Uint8Array(i.response),s=new e.Database(a);t.commit("SET_DATABASE",s),t.commit("SET_LOADING_STATUS","notLoading")},i.onerror=function(){console.log("ERROR loading database:",i.statusText)},i.send()}))}}}),h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"paginate"},[i("button",{on:{click:t.prev}},[t._v("<")]),t._v(" "+t._s(t.value)+"/"+t._s(t.count)+" "),i("button",{on:{click:t.next}},[t._v(">")])])},p=[],m={name:"vpaginate",props:["value","count"],methods:{prev:function(){console.log("prev"),this.$emit("input",Math.max(1,this.value-1))},next:function(){console.log("next"),this.page=this.page+1,this.$emit("input",Math.min(this.value+1,this.count))}}},v=m,f=(i("b73a"),i("2877")),b=Object(f["a"])(v,h,p,!1,null,null,null),_=b.exports,g={name:"ExhibitionListView",components:{vpaginate:_},store:d,data:function(){return{search:"",limit:15,page:1}},computed:{exhibitions:function(){if(void 0==this.$store.state.database)return[];var t="\n      SELECT e.ikonid, e.title, e.openingDate, e.closingDate, e.isExhibition, g.ikonid, g.name\n      FROM exhibitions e\n      JOIN galleries g ON g.ikonid=e.gallery_id\n      WHERE title LIKE '%".concat(this.search,"%'\n      ORDER BY e.openingDate DESC\n      LIMIT ").concat(this.limit," OFFSET ").concat(this.page-1,"*").concat(this.limit,";\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0]["values"].map((function(t){return{id:t[0],title:t[1],openingDate:new Date(t[2]).toLocaleDateString(),closingDate:isNaN(new Date(t[3]))?"":new Date(t[3]).toLocaleDateString(),isExhibition:t[4],gallery_id:t[5],gallery:t[6]}})):[]},count:function(){if(!this.$store.state.database)return NaN;var t="\n      SELECT COUNT(ikonid)\n      FROM exhibitions\n      ",e=this.$store.state.database.exec(t);return e[0]?e[0].values[0][0]:[]},resultsCount:function(){if(!this.$store.state.database)return NaN;var t="\n      SELECT COUNT(ikonid)\n      FROM exhibitions\n      WHERE title LIKE '%".concat(this.search,"%'\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values[0][0]:[]}},watch:{search:function(){this.page=0}}},E=g,x=Object(f["a"])(E,r,o,!1,null,null,null),O=x.exports,N=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ArtistListView"},[i("h2",[t._v("Artists "),i("small",[t._v(t._s(t.count))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{placeholder:"filter"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),i("vpaginate",{attrs:{count:Math.ceil(t.resultsCount/t.limit)},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}),i("table",[t._m(0),i("tbody",t._l(t.artists,(function(e){return i("tr",{key:e.id},[i("td",[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1),i("td",[t._v(t._s(e.count))])])})),0)])],1)},T=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("td",[t._v("name")]),i("td",[t._v("exhibitions")])])}],D={name:"ArtistListView",store:d,components:{vpaginate:_},data:function(){return{search:"",limit:15,page:1}},computed:{artists:function(){if(void 0==this.$store.state.database)return[];var t="\n      SELECT a.id, a.name, COUNT(DISTINCT ae.exhibition_id) as No_exhibitions\n      FROM artists a\n      INNER JOIN exhibitingOn ae ON ae.artist_id = a.id\n      WHERE a.name LIKE '%".concat(this.search,"%'\n      GROUP BY a.id \n      ORDER BY No_exhibitions DESC\n      LIMIT ").concat(this.limit," OFFSET ").concat(this.page-1,"*").concat(this.limit,";\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0]["values"].map((function(t){return{id:t[0],name:t[1],count:t[2]}})):[]},count:function(){if(!this.$store.state.database)return NaN;var t="\n      SELECT COUNT(id)\n      FROM artists\n      ",e=this.$store.state.database.exec(t);return e[0]?e[0].values[0][0]:[]},resultsCount:function(){if(!this.$store.state.database)return NaN;var t="\n      SELECT COUNT(id)\n      FROM artists\n      WHERE name LIKE '%".concat(this.search,"%'\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values[0][0]:[]}},watch:{search:function(){this.page=0}}},$=D,S=Object(f["a"])($,N,T,!1,null,null,null),R=S.exports,k=i("8c4f"),y=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"GalleryListView"},[i("h2",[t._v("Galleries "),i("small",[t._v(t._s(t.count))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{placeholder:"filter"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),i("vpaginate",{attrs:{count:Math.ceil(t.resultsCount/t.limit)},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}),i("table",[t._m(0),i("tbody",t._l(t.galleries,(function(e){return i("tr",{key:e.id},[i("td",[i("router-link",{attrs:{to:{name:"gallery",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)])})),0)])],1)},I=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("td",[t._v("name")])])}],C={name:"GalleryListView",store:d,components:{vpaginate:_},data:function(){return{search:"",limit:15,page:1}},computed:{galleries:function(){if(void 0==this.$store.state.database)return[];var t="\n      SELECT ikonid, name\n      FROM galleries\n      WHERE name LIKE '%".concat(this.search,"%'\n      LIMIT ").concat(this.limit," OFFSET ").concat(this.page-1,"*").concat(this.limit,";\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0]["values"].map((function(t){return{id:t[0],name:t[1]}})):[]},count:function(){if(!this.$store.state.database)return NaN;var t="\n      SELECT COUNT(ikonid)\n      FROM galleries\n      WHERE name LIKE '%".concat(this.search,"%'\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values[0][0]:[]},resultsCount:function(){if(!this.$store.state.database)return NaN;var t="\n      SELECT COUNT(ikonid)\n      FROM galleries\n      WHERE name LIKE '%".concat(this.search,"%'\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values[0][0]:[]}},watch:{search:function(){this.page=0}}},L=C,w=Object(f["a"])(L,y,I,!1,null,null,null),M=w.exports,F=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",[i("h2",[t._v(t._s(t.exhibition.title))]),i("p",[t._v(t._s(t.exhibition.openingDate)+"-"+t._s(t.exhibition.closingDate))]),i("p",[i("router-link",{attrs:{to:{name:"gallery",params:{id:t.exhibition.gallery_id}}}},[t._v(" "+t._s(t.exhibition.gallery)+" ")])],1),i("p",[i("a",{attrs:{target:"blank",href:"https://ikon.hu/cal/"+t.exhibition.id}},[t._v("https://ikon.hu/cal/"+t._s(t.exhibition.id))])])]),i("section",[i("h3",[t._v("Artists")]),i("ul",t._l(t.artists,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)})),0),i("h3",[t._v("Curators")]),i("ul",t._l(t.curators,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)})),0),i("h3",[t._v("Opening")]),i("ul",t._l(t.opening,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)})),0)])])},A=[],H={name:"ExhibitionView",store:d,computed:{exhibition:function(){if(void 0==this.$store.state.database)return{};var t="\n      SELECT e.ikonid, e.title, e.openingDate, e.closingDate, g.ikonid, g.name\n      FROM exhibitions e\n      JOIN galleries g ON g.ikonid=e.gallery_id\n      WHERE e.ikonid = ".concat(this.$route.params.id,"\n      LIMIT 1;\n      "),e=this.$store.state.database.exec(t),i=e[0].values[0];return{id:i[0],title:i[1],openingDate:i[2],closingDate:i[3],gallery_id:i[4],gallery:i[5]}},artists:function(){if(!this.$store.state.database)return[];var t="\n      SELECT DISTINCT a.id, a.name\n      FROM exhibitingOn ae\n      INNER JOIN artists a ON a.id = ae.artist_id\n      WHERE ae.exhibition_id = ".concat(this.$route.params.id,"\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values.map((function(t){return{id:t[0],name:t[1]}})):[]},curators:function(){if(!this.$store.state.database)return[];var t="\n      SELECT DISTINCT a.id, a.name\n      FROM curatingThe ae\n      INNER JOIN artists a ON a.id = ae.artist_id\n      WHERE ae.exhibition_id = ".concat(this.$route.params.id,"\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values.map((function(t){return{id:t[0],name:t[1]}})):[]},opening:function(){if(!this.$store.state.database)return[];var t="\n      SELECT DISTINCT a.id, a.name\n      FROM openingThe ae\n      INNER JOIN artists a ON a.id = ae.artist_id\n      WHERE ae.exhibition_id = ".concat(this.$route.params.id,"\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values.map((function(t){return{id:t[0],name:t[1]}})):[]}}},W=H,j=Object(f["a"])(W,F,A,!1,null,null,null),U=j.exports,J=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",[i("h2",[t._v(t._s(t.artist.name))])]),i("section",[i("h3",[t._v("Exhibitions")]),i("ol",t._l(t.exhibitions,(function(e){return i("li",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[i("p",[t._v(t._s(e.title)+" "),i("small",[t._v("("+t._s(e.openingDate)+")")])])])],1)})),0),i("h3",[t._v("Curating")]),i("ol",t._l(t.curating,(function(e){return i("li",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[i("p",[t._v(t._s(e.title)+" "),i("small",[t._v("("+t._s(e.openingDate)+")")])])])],1)})),0),i("h3",[t._v("Opening")]),i("ol",t._l(t.opening,(function(e){return i("li",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[i("p",[t._v(t._s(e.title)+" "),i("small",[t._v("("+t._s(e.openingDate)+")")])])])],1)})),0)])])},P=[],V={name:"ArtistView",store:d,computed:{artist:function(){if(void 0==this.$store.state.database)return{};var t="\n      SELECT id, name\n      FROM artists\n      WHERE id = ".concat(this.$route.params.id,"\n      LIMIT 1;\n      "),e=this.$store.state.database.exec(t),i=e[0].values[0];return{id:i[0],name:i[1]}},exhibitions:function(){if(!this.$store.state.database)return[];var t="\n      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition\n      FROM exhibitions e\n      INNER JOIN exhibitingOn ae ON e.ikonid = ae.exhibition_id\n      WHERE ae.artist_id = ".concat(this.$route.params.id,"\n      ORDER BY e.openingDate DESC;\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:isNaN(new Date(t[2]))?"":new Date(t[2]).getFullYear(),isExhibition:t[3]}})):[]},curating:function(){if(!this.$store.state.database)return[];var t="\n      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition\n      FROM exhibitions e\n      INNER JOIN curatingThe ae ON e.ikonid = ae.exhibition_id\n      WHERE ae.artist_id = ".concat(this.$route.params.id,"\n      ORDER BY e.openingDate DESC;\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:isNaN(new Date(t[2]))?"":new Date(t[2]).getFullYear(),isExhibition:t[3]}})):[]},opening:function(){if(!this.$store.state.database)return[];var t="\n      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition\n      FROM exhibitions e\n      INNER JOIN openingThe ae ON e.ikonid = ae.exhibition_id\n      WHERE ae.artist_id = ".concat(this.$route.params.id,"\n      ORDER BY e.openingDate DESC;\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:isNaN(new Date(t[2]))?"":new Date(t[2]).getFullYear(),isExhibition:t[3]}})):[]}}},Y=V,B=Object(f["a"])(Y,J,P,!1,null,null,null),G=B.exports,K=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",[i("h2",[t._v(t._s(t.gallery.name))])]),i("section",[i("h3",[t._v("Exhibitions")]),i("ul",t._l(t.exhibitions,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[i("p",[t._v(t._s(e.title)+" "),i("small",[t._v("("+t._s(e.date)+")")])])])],1)})),0)])])},q=[],X={name:"GalleryView",store:d,computed:{gallery:function(){if(void 0==this.$store.state.database)return{};var t="\n      SELECT ikonid, name\n      FROM galleries\n      WHERE ikonid = ".concat(this.$route.params.id,"\n      LIMIT 1;\n      "),e=this.$store.state.database.exec(t),i=e[0].values[0];return{id:i[0],name:i[1]}},exhibitions:function(){if(!this.$store.state.database)return[];var t="\n      SELECT DISTINCT ikonid, title, date\n      FROM exhibitions\n      WHERE gallery_id = ".concat(this.$route.params.id,"\n      ORDER BY date DESC;\n      "),e=this.$store.state.database.exec(t);return e[0]?e[0].values.map((function(t){return{id:t[0],title:t[1],date:t[2]}})):[]}}},z=X,Q=Object(f["a"])(z,K,q,!1,null,null,null),Z=Q.exports;n["a"].use(k["a"]);var tt=[{path:"/exhibitions",component:O},{path:"/artists",component:R},{path:"/galleries",component:M},{name:"exhibition",path:"/exhibition/:id",component:U},{name:"artist",path:"/artist/:id",component:G},{name:"gallery",path:"/gallery/:id",component:Z}],et=new k["a"]({routes:tt}),it={name:"App",store:d,router:et,components:{ExhibitionListView:O,ArtistListView:R},mounted:function(){this.$store.dispatch("fetchDatabase")},computed:{loadingStatus:function(){return this.$store.state.loadingStatus}}},nt=it,at=(i("034f"),Object(f["a"])(nt,a,s,!1,null,null,null)),st=at.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(st)}}).$mount("#app")},"85ec":function(t,e,i){},b73a:function(t,e,i){"use strict";var n=i("3de4"),a=i.n(n);a.a}});
//# sourceMappingURL=app.6785b35c.js.map
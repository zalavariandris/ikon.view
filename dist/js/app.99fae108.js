(function(t){function e(e){for(var n,o,s=e[0],l=e[1],u=e[2],d=0,h=[];d<s.length;d++)o=s[d],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&h.push(r[o][0]),r[o]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);c&&c(e);while(h.length)h.shift()();return a.push.apply(a,u||[]),i()}function i(){for(var t,e=0;e<a.length;e++){for(var i=a[e],n=!0,s=1;s<i.length;s++){var l=i[s];0!==r[l]&&(n=!1)}n&&(a.splice(e--,1),t=o(o.s=i[0]))}return t}var n={},r={app:0},a=[];function o(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,o),i.l=!0,i.exports}o.m=t,o.c=n,o.d=function(t,e,i){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(i,n,function(e){return t[e]}.bind(null,n));return i},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/ikon.view/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=e,s=s.slice();for(var u=0;u<s.length;u++)e(s[u]);var c=l;a.push([0,"chunk-vendors"]),i()})({0:function(t,e,i){t.exports=i("56d7")},1:function(t,e){},2:function(t,e){},3:function(t,e){},"3de4":function(t,e,i){},"3e50":function(t,e,i){"use strict";var n=i("c521"),r=i.n(n);r.a},4:function(t,e){},4558:function(t,e,i){"use strict";var n=i("f4f5"),r=i.n(n);r.a},"56d7":function(t,e,i){"use strict";i.r(e);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("header",[i("h1",[i("router-link",{attrs:{to:"/"}},[t._v(" Welcome to cleaning"),i("br"),t._v(" IKON ")])],1),i("nav",[i("ul",[i("li",[i("router-link",{attrs:{to:"/artists"}},[t._v("artists")])],1),i("li",[i("router-link",{attrs:{to:"/exhibitions"}},[t._v("exhibitions")])],1),i("li",[i("router-link",{attrs:{to:"/galleries"}},[t._v("galleries")])],1)])])]),i("main",["loading"==t.loadingStatus?i("div",{attrs:{id:"status"}},[i("label",{attrs:{for:"db"}},[t._v("loading...")]),i("progress",{attrs:{id:"db",max:"100"},domProps:{value:100*t.loadingProgress}},[t._v(t._s(100*t.loadingProgress)+"%")])]):t._e(),i("router-view")],1),i("footer")])},a=[],o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ExhibitionListView"},[i("h2",[t._v("Exhibitions "),i("small",[t._v("("+t._s(t.count)+")")])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{placeholder:"filter"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),i("vpaginate",{attrs:{count:Math.ceil(t.resultsCount/t.limit)},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}),i("table",[t._m(0),i("tbody",t._l(t.exhibitions,(function(e){return i("tr",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("td",[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[t._v(" "+t._s(e.title)+" ")])],1),i("td",[i("small",[t._v(t._s(e.openingDate))])]),i("td",[i("small",[t._v(t._s(e.closingDate))])]),i("td",[i("router-link",{attrs:{to:{name:"gallery",params:{id:e.gallery_id}}}},[t._v(" "+t._s(e.gallery)+" ")])],1)])})),0)])],1)},s=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("td",{attrs:{width:"50%"}},[t._v("title")]),i("td",{attrs:{width:"60px"}},[t._v("opening")]),i("td",{attrs:{width:"60px"}},[t._v("closing")]),i("td",{attrs:{width:"20%"}},[t._v("gallery")])])}],l=(i("ac1f"),i("841c"),i("99af"),i("d81d"),i("ace4"),i("d3b7"),i("5cc6"),i("9a8c"),i("a975"),i("735e"),i("c1ac"),i("d139"),i("3a7b"),i("d5d6"),i("82f8"),i("e91f"),i("60bd"),i("5f96"),i("3280"),i("3fcc"),i("ca91"),i("25a1"),i("cd26"),i("3c5d"),i("2954"),i("649e"),i("219c"),i("170b"),i("b39a"),i("72f7"),i("ddb0"),i("2f62")),u=i("fdac4"),c=i.n(u);n["a"].use(l["a"]);var d=new l["a"].Store({state:{loadingStatus:"notLoading",loadingProgress:0,database:null},mutations:{SET_LOADING_STATUS:function(t,e){t.loadingStatus=e},SET_LOADING_PROGRESS:function(t,e){t.loadingProgress=e},SET_DATABASE:function(t,e){t.database=e}},actions:{fetchDatabase:function(t){t.commit("SET_LOADING_STATUS","loading");c()({locateFile:function(t){return"./".concat(t)}}).then((function(e){var i=new XMLHttpRequest;i.open("GET","./ikon_v003.db",!0),i.responseType="arraybuffer",i.onprogress=function(e){var i=e.loaded/e.total;t.commit("SET_LOADING_PROGRESS",i)},i.onload=function(n){var r=new Uint8Array(i.response),a=new e.Database(r);t.commit("SET_DATABASE",a),t.commit("SET_LOADING_STATUS","notLoading")},i.onerror=function(){console.log("ERROR loading database:",i.statusText)},i.send()}))}},getters:{getGalleriesLikeNameCount:function(t){return function(e){if(!t.database)return NaN;var i="\n      SELECT COUNT(ikonid)\n      FROM galleries\n      WHERE name LIKE '%".concat(e,"%'\n      "),n=t.database.exec(i);return n[0]?n[0].values[0][0]:[]}},getArtistsLikeName:function(t){return function(e,i,n){if(void 0==t.database)return[];var r="\n      SELECT a.id, a.name, COUNT(DISTINCT ae.exhibition_id) as No_exhibitions\n      FROM artists a\n      INNER JOIN exhibitingOn ae ON ae.artist_id = a.id\n      WHERE a.name LIKE '%".concat(e,"%'\n      GROUP BY a.id \n      ORDER BY No_exhibitions DESC\n      LIMIT ").concat(i," OFFSET ").concat(n-1,"*").concat(i,";\n      "),a=t.database.exec(r);return a[0]?a[0]["values"].map((function(t){return{id:t[0],name:t[1],count:t[2]}})):[]}},getArtistsLikeNameCount:function(t){return function(e){if(!t.database)return NaN;var i="\n      SELECT COUNT(id)\n      FROM artists\n      WHERE name LIKE '%".concat(e,"%'\n      "),n=t.database.exec(i);return n[0]?n[0].values[0][0]:[]}},getExhibitionsLikeTitle:function(t){return function(e,i,n){if(void 0==t.database)return[];var r="\n      SELECT e.ikonid, e.title, e.openingDate, e.closingDate, e.isExhibition, g.ikonid, g.name\n      FROM exhibitions e\n      JOIN galleries g ON g.ikonid=e.gallery_id\n      WHERE title LIKE '%".concat(e,"%'\n      ORDER BY e.openingDate DESC\n      LIMIT ").concat(i," OFFSET ").concat(n-1,"*").concat(i,";\n      "),a=t.database.exec(r);return a[0]?a[0]["values"].map((function(t){return{id:t[0],title:t[1],openingDate:new Date(t[2]).toLocaleDateString(),closingDate:isNaN(new Date(t[3]))?"":new Date(t[3]).toLocaleDateString(),isExhibition:t[4],gallery_id:t[5],gallery:t[6]}})):[]}},getExhibitionsLikeTitleCount:function(t){return function(e){if(!t.database)return NaN;var i="\n        SELECT COUNT(ikonid)\n        FROM exhibitions\n        WHERE title LIKE '%".concat(e,"%'\n        "),n=t.database.exec(i);return n[0]?n[0].values[0][0]:[]}},exhibitionsCount:function(t){if(!t.database)return NaN;var e="\n      SELECT COUNT(ikonid)\n      FROM exhibitions\n      ",i=t.database.exec(e);return i[0]?i[0].values[0][0]:NaN},galleriesCount:function(t){if(!t.database)return NaN;var e="\n      SELECT COUNT(ikonid)\n      FROM galleries\n      ",i=t.database.exec(e);return i[0]?i[0].values[0][0]:NaN},artistsCount:function(t){if(!t.database)return NaN;var e="\n      SELECT COUNT(id)\n      FROM artists\n      ",i=t.database.exec(e);return i[0]?i[0].values[0][0]:NaN},getGalleriesLikeName:function(t){return function(e,i,n){if(void 0==t.database)return[];var r="\n        SELECT ikonid, name\n        FROM galleries\n        WHERE name LIKE '%".concat(e,"%'\n        LIMIT ").concat(i," OFFSET ").concat(n-1,"*").concat(i,";\n        "),a=t.database.exec(r);return a[0]?a[0]["values"].map((function(t){return{id:t[0],name:t[1]}})):[]}},getExhibitionById:function(t,e){return function(e){if(void 0==t.database)return null;var i="\n      SELECT e.ikonid, e.title, e.openingDate, e.closingDate, g.ikonid, g.name, e.description\n      FROM exhibitions e\n      JOIN galleries g ON g.ikonid=e.gallery_id\n      WHERE e.ikonid = ".concat(e,"\n      LIMIT 1;\n      "),n=t.database.exec(i),r=n[0].values[0];return{id:r[0],title:r[1],openingDate:r[2],closingDate:r[3],gallery_id:r[4],gallery:r[5],description:r[6]}}},getArtistById:function(t,e){return function(e){if(void 0==t.database)return{};var i="\n        SELECT id, name\n        FROM artists\n        WHERE id = ".concat(e,"\n        LIMIT 1;\n        "),n=t.database.exec(i),r=n[0].values[0];return{id:r[0],name:r[1]}}},getGalleryById:function(t,e){return function(e){if(void 0==t.database)return{};var i="\n        SELECT ikonid, name\n        FROM galleries\n        WHERE ikonid = ".concat(e,"\n        LIMIT 1;\n        "),n=t.database.exec(i),r=n[0].values[0];return{id:r[0],name:r[1]}}},getExhibitionsByArtistId:function(t,e){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition\n      FROM exhibitions e\n      INNER JOIN exhibitingOn ae ON e.ikonid = ae.exhibition_id\n      WHERE ae.artist_id = ".concat(e,"\n      ORDER BY e.openingDate DESC;\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:t[2],isExhibition:t[3]}})):[]}},getExhibitionsByArtistIdWithArtistCount:function(t,e){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT\n      e.ikonid,\n      e.title,\n      e.openingDate,\n      e.closingDate,\n      e.isExhibition,\n      metrics.artistsCount,\n      e.gallery_id,\n      g.name\n      FROM exhibitions e\n      INNER JOIN exhibitingOn ae ON e.ikonid==ae.exhibition_id\n      INNER JOIN artists a ON a.id==ae.artist_id\n      INNER JOIN galleries g ON g.ikonid == e.gallery_id\n      JOIN (\n          SELECT e.ikonid, COUNT(ae.exhibition_id) AS artistsCount\n          FROM EXHIBITIONS e\n          LEFT OUTER JOIN exhibitingOn ae ON e.ikonid = ae.exhibition_id\n          GROUP BY e.ikonid\n          ) metrics ON metrics.ikonid == e.ikonid\n      WHERE a.id = ".concat(e,"\n      ORDER BY e.openingDate DESC\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:t[2],closingDate:t[3],isExhibition:t[4],artistsCount:t[5],gallery_id:t[6],gallery:t[7]}})):[]}},getExhibitionsByCuratorId:function(t,e){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition\n      FROM exhibitions e\n      INNER JOIN curatingThe ae ON e.ikonid = ae.exhibition_id\n      WHERE ae.artist_id = ".concat(e,"\n      ORDER BY e.openingDate DESC;\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:t[2],isExhibition:t[3]}})):[]}},getExhibitionsByOpeningspeechId:function(t){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT e.ikonid, e.title, e.openingDate, e.isExhibition\n      FROM exhibitions e\n      INNER JOIN openingThe ae ON e.ikonid = ae.exhibition_id\n      WHERE ae.artist_id = ".concat(e,"\n      ORDER BY e.openingDate DESC;\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:t[2],isExhibition:t[3]}})):[]}},getArtistsByExhibitionId:function(t){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT a.id, a.name\n      FROM exhibitingOn ae\n      INNER JOIN artists a ON a.id = ae.artist_id\n      WHERE ae.exhibition_id = ".concat(e,"\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],name:t[1]}})):[]}},getArtistsByExhibitionIds:function(t,e){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT a.id, a.name\n      FROM exhibitingOn ae\n      INNER JOIN artists a ON a.id = ae.artist_id\n      WHERE ae.exhibition_id IN (".concat(e,")\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],name:t[1]}})):[]}},getCuratorsByExhibitionId:function(t){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT a.id, a.name\n      FROM curatingThe ae\n      INNER JOIN artists a ON a.id = ae.artist_id\n      WHERE ae.exhibition_id = ".concat(e,"\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],name:t[1]}})):[]}},getOpeningspeechByExhibitionId:function(t){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT a.id, a.name\n      FROM openingThe ae\n      INNER JOIN artists a ON a.id = ae.artist_id\n      WHERE ae.exhibition_id = ".concat(e,"\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],name:t[1]}})):[]}},getExhibitionsByGalleryId:function(t){return function(e){if(!t.database)return[];var i="\n      SELECT DISTINCT ikonid, title, openingDate, isExhibition\n      FROM exhibitions\n      WHERE gallery_id = ".concat(e,"\n      ORDER BY openingDate DESC;\n      "),n=t.database.exec(i);return n[0]?n[0].values.map((function(t){return{id:t[0],title:t[1],openingDate:t[2],isExhibition:t[3]}})):[]}}}}),h=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"paginate"},[i("button",{on:{click:t.prev}},[t._v("<")]),t._v(" "+t._s(t.value)+"/"+t._s(t.count)+" "),i("button",{on:{click:t.next}},[t._v(">")])])},g=[],f={name:"vpaginate",props:["value","count"],methods:{prev:function(){console.log("prev"),this.$emit("input",Math.max(1,this.value-1))},next:function(){console.log("next"),this.page=this.page+1,this.$emit("input",Math.min(this.value+1,this.count))}}},p=f,v=(i("b73a"),i("2877")),b=Object(v["a"])(p,h,g,!1,null,null,null),m=b.exports,_={name:"ExhibitionListView",components:{vpaginate:m},store:d,data:function(){return{search:"",limit:15,page:1}},computed:{exhibitions:function(){return this.$store.getters.getExhibitionsLikeTitle(this.search,this.limit,this.page)},resultsCount:function(){return this.$store.getters.getExhibitionsLikeTitleCount(this.search)},count:function(){return this.$store.getters.exhibitionsCount}},watch:{search:function(){this.page=0}}},x=_,E=Object(v["a"])(x,o,s,!1,null,null,null),y=E.exports,N=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ArtistListView"},[i("h2",[t._v("Artists "),i("small",[t._v(t._s(t.count))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{placeholder:"filter"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),i("vpaginate",{attrs:{count:Math.ceil(t.resultsCount/t.limit)},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}),i("table",[t._m(0),i("tbody",t._l(t.artists,(function(e){return i("tr",{key:e.id},[i("td",[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1),i("td",[t._v(t._s(e.count))])])})),0)])],1)},k=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("td",[t._v("name")]),i("td",{attrs:{width:"70px"}},[t._v("exhibitions")])])}],w={name:"ArtistListView",store:d,components:{vpaginate:m},data:function(){return{search:"",limit:15,page:1}},computed:{artists:function(){return this.$store.getters.getArtistsLikeName(this.search,this.limit,this.page)},count:function(){return this.$store.getters.artistsCount},resultsCount:function(){return this.$store.getters.getArtistsLikeNameCount(this.search,this.limit,this.page)}},watch:{search:function(){this.page=0}}},O=w,C=Object(v["a"])(O,N,k,!1,null,null,null),I=C.exports,T=(i("b0c0"),i("8c4f")),S=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"LandingPageView"},[i("ul",[i("li",[i("router-link",{attrs:{to:"/artists"}},[t._v(" Artists ")]),t.artistsCount?i("small",[t._v(" ("+t._s(t.artistsCount)+") ")]):t._e()],1),i("li",[i("router-link",{attrs:{to:"/exhibitions"}},[t._v(" Exhibitions ")]),t.exhibitionsCount?i("small",[t._v(" ("+t._s(t.exhibitionsCount)+") ")]):t._e()],1),i("li",[i("router-link",{attrs:{to:"/galleries"}},[t._v(" Galleries ")]),t.galleriesCount?i("small",[t._v(" ("+t._s(t.galleriesCount)+") ")]):t._e()],1)])])},D=[],L={name:"LandingPageView",store:d,computed:{artistsCount:function(){return this.$store.getters.artistsCount},exhibitionsCount:function(){return this.$store.getters.exhibitionsCount},galleriesCount:function(){return this.$store.getters.galleriesCount}}},R=L,A=(i("4558"),Object(v["a"])(R,S,D,!1,null,null,null)),$=A.exports,M=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"GalleryListView"},[i("h2",[t._v("Galleries "),i("small",[t._v(t._s(t.count))])]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.search,expression:"search"}],attrs:{placeholder:"filter"},domProps:{value:t.search},on:{input:function(e){e.target.composing||(t.search=e.target.value)}}}),i("vpaginate",{attrs:{count:Math.ceil(t.resultsCount/t.limit)},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}}),i("table",[t._m(0),i("tbody",t._l(t.galleries,(function(e){return i("tr",{key:e.id},[i("td",[i("router-link",{attrs:{to:{name:"gallery",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)])})),0)])],1)},B=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",[i("td",[t._v("name")])])}],F={name:"GalleryListView",store:d,components:{vpaginate:m},data:function(){return{search:"",limit:15,page:1}},computed:{galleries:function(){return this.$store.getters.getGalleriesLikeName(this.search,this.limit,this.page)},count:function(){return this.$store.getters.galleriesCount},resultsCount:function(){return this.$store.getters.getGalleriesLikeNameCount(this.search)}},watch:{search:function(){this.page=0}}},G=F,W=Object(v["a"])(G,M,B,!1,null,null,null),H=W.exports,P=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",[i("h1",[t._v("Exhibition")]),i("h2",[t._v(t._s(t.exhibition.title))]),i("p",[t._v(" "+t._s(new Date(t.exhibition.openingDate).toLocaleDateString())+" "),isNaN(Date(t.exhibition.closingDate))?t._e():i("span",[t._v(" - "+t._s(new Date(t.exhibition.closingDate).toLocaleDateString())+" ")])]),i("p",[i("router-link",{attrs:{to:{name:"gallery",params:{id:t.exhibition.gallery_id}}}},[t._v(" "+t._s(t.exhibition.gallery)+" ")])],1),i("p",[i("a",{attrs:{target:"blank",href:"https://ikon.hu/cal/"+t.exhibition.id}},[t._v("https://ikon.hu/cal/"+t._s(t.exhibition.id))])])]),i("section",{staticClass:"info"},[i("section",[i("h3",[t._v("Artists")]),i("ul",t._l(t.artists,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)})),0)]),i("section",[i("h3",[t._v("Curators")]),i("ul",t._l(t.curators,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)})),0)]),i("section",[i("h3",[t._v("Opening")]),i("ul",t._l(t.opening,(function(e){return i("li",{key:e.id},[i("router-link",{attrs:{to:{name:"artist",params:{id:e.id}}}},[t._v(" "+t._s(e.name)+" ")])],1)})),0)])]),i("section",{staticClass:"description"},[t._v(" "+t._s(t.exhibition.description)+" ")])])},j=[],J={name:"ExhibitionView",store:d,computed:{exhibition:function(){return console.log("exhibition"),this.$store.getters.getExhibitionById(this.$route.params.id)},artists:function(){return this.$store.getters.getArtistsByExhibitionId(this.$route.params.id)},curators:function(){return this.$store.getters.getCuratorsByExhibitionId(this.$route.params.id)},opening:function(){return this.$store.getters.getOpeningspeechByExhibitionId(this.$route.params.id)}}},U=J,Y=(i("985f"),Object(v["a"])(U,P,j,!1,null,null,null)),V=Y.exports,z=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",[i("h1",[t._v("Artist")]),i("h2",[t._v(t._s(t.artist.name))])]),i("main",[i("figure",{staticStyle:{float:"right","text-align":"right"}},[i("figcaption",[i("label",{attrs:{for:"showNetwork"}},[t._v("network")]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.showNetwork,expression:"showNetwork"}],attrs:{id:"showNetwork",type:"checkbox"},domProps:{checked:Array.isArray(t.showNetwork)?t._i(t.showNetwork,null)>-1:t.showNetwork},on:{change:function(e){var i=t.showNetwork,n=e.target,r=!!n.checked;if(Array.isArray(i)){var a=null,o=t._i(i,a);n.checked?o<0&&(t.showNetwork=i.concat([a])):o>-1&&(t.showNetwork=i.slice(0,o).concat(i.slice(o+1)))}else t.showNetwork=r}}}),i("br")]),t.showNetwork?i("d3graphology",{attrs:{graph:t.bipartedGraphology}}):t._e(),i("figcaption",{staticClass:"stats"},[t._v(" nodes: "+t._s(t.bipartedGraphology.nodes().length)+" edges: "+t._s(t.bipartedGraphology.edges().length)+" ")])],1),t.cv.length?i("section",[i("h3",[t._v("Exhibitions")]),i("ul",t._l(t.cv,(function(e){return i("li",[t._v(" "+t._s(e[0])+" "),i("ul",t._l(e[1],(function(e){return i("li",{key:e.id,staticClass:"exhibition",class:{notExhibition:!e.isExhibition,solo:e.artistsCount<3}},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[t._v(" "+t._s(e.title)+" "),1==e.artistsCount?i("small",[t._v("solo ")]):t._e(),i("br")]),i("router-link",{attrs:{to:{name:"gallery",params:{id:e.gallery_id}}}},[i("small",[t._v(t._s(e.gallery))])])],1)})),0)])})),0)]):t._e(),t.curatingcv.length>0?i("section",[i("h3",[t._v("Curating")]),i("ul",t._l(t.curatingcv,(function(e){return i("li",[t._v(" "+t._s(e[0])+" "),i("ul",t._l(e[1],(function(e){return i("li",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[t._v(" "+t._s(e.title)+" ")]),i("router-link",{attrs:{to:{name:"gallery",params:{id:e.gallery_id}}}},[t._v(" "+t._s(e.gallery)+" ")])],1)})),0)])})),0)]):t._e(),t.openingspeechcv.length>0?i("section",[i("h3",[t._v("Opening")]),i("ul",t._l(t.openingspeechcv,(function(e){return i("li",[t._v(" "+t._s(e[0])+" "),i("ul",t._l(e[1],(function(e){return i("li",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[t._v(" "+t._s(e.title)+" ")]),i("router-link",{attrs:{to:{name:"gallery",params:{id:e.gallery_id}}}},[t._v(" "+t._s(e.gallery)+" ")])],1)})),0)])})),0)]):t._e()])])},K=[],q=(i("a4d3"),i("e01a"),i("d28b"),i("4de4"),i("3ca3"),i("2909")),X=i("2a63"),Q=i.n(X),Z=i("ae83"),tt=i.n(Z),et=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"d3graphology"})},it=[],nt=i("5698");window.d3=nt;var rt={name:"d3graphology",props:["graph"],mounted:function(){console.log("mounted"),window.d3graphology=this;var t=300;this.svg=nt["select"](this.$el).append("svg").attr("width","100%").attr("height",t),this.viewport=this.svg.append("g").attr("class","viewport"),this.initLinks(),this.initNodes(),this.initLabels(),this.initSimulation(),this.updateNodes(),this.updateLinks(),this.updateLabels(),window.d3graphology=this},watch:{graph:function(){this.updateSimulation(),this.updateNodes(),this.updateLinks(),this.updateLabels()}},methods:{initSimulation:function(){var t=this;console.log("init simulation"),this.simgraph={nodes:this.graph.nodes().map((function(e){return{id:e,r:t.graph.getNodeAttribute(e,"size")}})),edges:this.graph.edges().map((function(e){return{source:t.graph.source(e),target:t.graph.target(e)}}))},this.simulation=nt["forceSimulation"](this.simgraph.nodes).force("charge",nt["forceManyBody"]().strength((function(e){return-800*t.graph.getNodeAttribute(e.id,"size")}))).force("link",nt["forceLink"](this.simgraph.edges).id((function(t){return t.id})).distance(50).strength(1)).force("center",nt["forceCenter"](this.$el.offsetWidth/2,this.$el.offsetHeight/2)).force("x",nt["forceX"](this.$el.offsetWidth/2).strength(1)).force("y",nt["forceY"](this.$el.offsetHeight/2).strength(1)).force("collision",nt["forceCollide"]().radius((function(e){return t.graph.getNodeAttribute(e.id,"size")}))).velocityDecay(.9).on("tick",(function(){t.viewport.selectAll(".node").attr("cx",(function(t){return t.x})).attr("cy",(function(t){return t.y})),t.viewport.selectAll(".link").attr("d",(function(t){var e=t.target.x-t.source.x,i=t.target.y-t.source.y,n=Math.sqrt(e*e+i*i),r=e*t.target.r/n,a=i*t.target.r/n,o=e*t.source.r/n,s=i*t.source.r/n;return"M"+(t.source.x+o)+","+(t.source.y+s)+"L"+(t.target.x-r)+","+(t.target.y-a)})),t.viewport.select(".labels").selectAll("text").attr("x",(function(t){return t.x})).attr("y",(function(t){return t.y}));t.fit()})),this.simulation.stop(),this.simulation.restart()},updateSimulation:function(){var t=this;console.log("update simulation"),this.simgraph={nodes:this.graph.nodes().map((function(e){return{id:e,r:t.graph.getNodeAttribute(e,"size")}})),edges:this.graph.edges().map((function(e){return{source:t.graph.source(e),target:t.graph.target(e)}}))},this.simulation.stop(),this.simulation.nodes(this.simgraph.nodes),this.simulation.force("link",nt["forceLink"](this.simgraph.edges).id((function(t){return t.id})).distance(100).strength(1)),this.simulation.alpha(1).restart()},initNodes:function(){this.viewport.append("g").attr("class","nodes")},updateNodes:function(){var t=this,e=this.viewport.select(".nodes").selectAll(".node").data(this.simgraph.nodes,(function(t){return t})),i=function(e,i){var n=t.graph.neighbors(e.id).concat([e.id]),r=tt()(t.graph,n);t.viewport.classed("nodes-highlighted",!0),nt["selectAll"](".node").filter((function(t){return r.hasNode(t.id)})).classed("highlighted",!0),nt["selectAll"](".link").filter((function(t){return r.hasNode(t.source.id)&&r.hasNode(t.target.id)})).classed("highlighted",!0)},n=function(e,i){t.viewport.classed("nodes-highlighted",!1),nt["selectAll"](".node").classed("highlighted",!1),nt["selectAll"](".link").classed("highlighted",!1)};e.enter().append("circle").attr("class","node").classed("exhibition",(function(t){return"e"==t.id[0]})).classed("artist",(function(t){return"a"==t.id[0]})).merge(e).attr("r",(function(e){return t.graph.getNodeAttribute(e.id,"size")||40})).on("mouseover",i).on("mouseout",n),e.exit().remove(),console.log("update node",e)},initLinks:function(){this.viewport.append("g").attr("class","links")},updateLinks:function(){var t=this.viewport.select(".links").selectAll(".link").data(this.simgraph.edges,(function(t){return t.source+t.target}));t.enter().append("path").attr("class","link").merge(t).attr("d",(function(t){var e=t.target.x-t.source.x,i=t.target.y-t.source.y,n=Math.sqrt(e*e+i*i),r=e*t.target.r/n,a=i*t.target.r/n,o=e*t.source.r/n,s=i*t.source.r/n;return"M"+(t.source.x+o)+","+(t.source.y+s)+"L"+(t.target.x-r)+","+(t.target.y-a)})),t.exit().remove()},initLabels:function(){this.viewport.append("g").attr("class","labels")},updateLabels:function(){var t=this,e=this.viewport.select(".labels").selectAll("text").data(this.simgraph.nodes,(function(t){return t.id}));e.enter().append("text").text((function(e){return t.graph.getNodeAttribute(e.id,"label").length<21?t.graph.getNodeAttribute(e.id,"label"):t.graph.getNodeAttribute(e.id,"label").substring(0,21)+"..."})).attr("text-anchor","middle").attr("alignment-baseline","middle").attr("style","user-select: none; pointer-events: none;").attr("font-size",(function(e){return.5*t.graph.getNodeAttribute(e.id,"size")})).merge(e).attr("x",(function(t){return t.x})).attr("y",(function(t){return t.y})),e.exit().remove()},zoomFit:function(t,e){var i=this.viewport,n=i.node().getBBox(),r=i.node().parentElement,a=r.clientWidth,o=r.clientHeight,s=n.width,l=n.height,u=n.x+s/2,c=n.y+l/2;if(0!=s&&0!=l){var d=(t||.75)/Math.max(s/a,l/o),h=[a/2-d*u,o/2-d*c];this.viewport.attr("translate",h),this.viewport.attr("scale",d)}},fit:function(){var t=this.viewport.node().getBBox(),e=this.svg.node().clientWidth,i=this.svg.node().clientHeight,n=t.width,r=t.height,a=t.x+n/2,o=t.y+r/2;if(0!=n&&0!=r){var s=1/Math.max(n/e,r/i),l=[e/2-s*a,i/2-s*o];this.viewport.attr("transform","translate(".concat(l[0],",").concat(l[1],") scale(").concat(s,")"))}}}},at=rt,ot=(i("5c92"),Object(v["a"])(at,et,it,!1,null,null,null)),st=ot.exports;i("13d5"),i("4ec9");function lt(t,e){return console.assert("string"==typeof e||"function"==typeof e),t.reduce((function(t,i){if("function"==typeof e)var n=e(i);else if("string"==typeof e)n=i[e];return t.set(n,t.get(n)||[]),t.get(n).push(i),t}),new Map)}var ut={name:"ArtistView",components:{d3graphology:st},store:d,data:function(){return{showNetwork:!0}},computed:{artist:function(){return this.$store.getters.getArtistById(this.$route.params.id)},exhibitions:function(){return this.$store.getters.getExhibitionsByArtistIdWithArtistCount(this.$route.params.id)},cv:function(){var t=lt(this.exhibitions,(function(t){return new Date(t["openingDate"]).getFullYear()}));return Object(q["a"])(t.entries()).sort((function(t,e){return e-t}))},curating:function(){return this.$store.getters.getExhibitionsByCuratorId(this.$route.params.id)},curatingcv:function(){var t=lt(this.curating,(function(t){return new Date(t["openingDate"]).getFullYear()}));return Object(q["a"])(t.entries()).sort((function(t,e){return e-t}))},openingspeech:function(){return this.$store.getters.getExhibitionsByOpeningspeechId(this.$route.params.id)},openingspeechcv:function(){var t=lt(this.openingspeech,(function(t){return new Date(t["openingDate"]).getFullYear()}));return Object(q["a"])(t.entries()).sort((function(t,e){return e-t}))},bipartedGraphology:function(){var t=new Q.a.Graph,e=(this.artist,this.artist);t.addNode("a"+e.id,{label:e.name,color:"hsl(155, 73%, 64%)"});var i=!0,n=!1,r=void 0;try{for(var a,o=this.exhibitions[Symbol.iterator]();!(i=(a=o.next()).done);i=!0){var s=a.value;t.addNode("e"+s.id,{label:s.title,color:"lightgrey"}),t.addEdge("a"+e.id,"e"+s.id,{weight:1});var l=!0,u=!1,c=void 0;try{for(var d,h=this.$store.getters.getArtistsByExhibitionId(s.id)[Symbol.iterator]();!(l=(d=h.next()).done);l=!0){var g=d.value;if(t.hasNode("a"+g.id)||t.addNode("a"+g.id,{label:g.name,color:"hsl(155, 73%, 64%)"}),t.hasEdge("e"+s.id,"a"+g.id)){var f=t.setEdgeAttribute("e"+s.id,"a"+g.id);t.setEdgeAttribute("e"+s.id,"a"+g.id,"weight",f+1)}else t.addEdge("e"+s.id,"a"+g.id,{weight:1})}}catch(J){u=!0,c=J}finally{try{l||null==h.return||h.return()}finally{if(u)throw c}}}}catch(J){n=!0,r=J}finally{try{i||null==o.return||o.return()}finally{if(n)throw r}}var p=!0,v=!1,b=void 0;try{for(var m,_=t.nodes()[Symbol.iterator]();!(p=(m=_.next()).done);p=!0){var x=m.value;t.setNodeAttribute(x,"degree",t.degree(x))}}catch(J){v=!0,b=J}finally{try{p||null==_.return||_.return()}finally{if(v)throw b}}var E=0,y=!0,N=!1,k=void 0;try{for(var w,O=t.nodes()[Symbol.iterator]();!(y=(w=O.next()).done);y=!0){var C=w.value;E+=t.getNodeAttribute(C,"degree")}}catch(J){N=!0,k=J}finally{try{y||null==O.return||O.return()}finally{if(N)throw k}}var I=!0,T=!1,S=void 0;try{for(var D,L=t.nodes()[Symbol.iterator]();!(I=(D=L.next()).done);I=!0){var R=D.value,A=t.degree(R);t.setNodeAttribute(R,"degreeCentrality",A/E)}}catch(J){T=!0,S=J}finally{try{I||null==L.return||L.return()}finally{if(T)throw S}}var $=!0,M=!1,B=void 0;try{for(var F,G=t.nodes()[Symbol.iterator]();!($=(F=G.next()).done);$=!0){var W=F.value,H=t.getNodeAttribute(W,"degreeCentrality"),P=E/t.nodes().length*30;t.setNodeAttribute(W,"size","a"==W[0]?1e3*Math.pow(H,.6)+P/2:P),t.setNodeAttribute(W,"color","a"==W[0]?"hsl(155, 73%, 64%)":"lightslategray")}}catch(J){M=!0,B=J}finally{try{$||null==G.return||G.return()}finally{if(M)throw B}}var j=t.nodes().filter((function(e){return t.degree(e)>1}));return t=tt()(t,j),t}}},ct=ut,dt=(i("b4fb"),Object(v["a"])(ct,z,K,!1,null,null,null)),ht=dt.exports,gt=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("header",[i("h1",[t._v("Gallery")]),i("h2",[t._v(t._s(t.gallery.name))])]),i("section",[i("ul",t._l(t.groupedByDate,(function(e){return i("li",[t._v(" "+t._s(e[0])+" "),i("ul",t._l(e[1],(function(e){return i("li",{key:e.id,class:{notExhibition:!e.isExhibition}},[i("router-link",{attrs:{to:{name:"exhibition",params:{id:e.id}}}},[i("p",[t._v(t._s(e.title)+" "),i("small",[t._v("("+t._s(e.openingDate)+")")])])])],1)})),0)])})),0)])])},ft=[],pt={name:"GalleryView",store:d,computed:{gallery:function(){return this.$store.getters.getGalleryById(this.$route.params.id)},exhibitions:function(){return this.$store.getters.getExhibitionsByGalleryId(this.$route.params.id)},groupedByDate:function(){var t=lt(this.exhibitions,(function(t){return new Date(t["openingDate"]).getFullYear()}));return Object(q["a"])(t.entries()).sort((function(t,e){return e-t}))}}},vt=pt,bt=(i("3e50"),Object(v["a"])(vt,gt,ft,!1,null,null,null)),mt=bt.exports;n["a"].use(T["a"]);var _t=[{name:"home",path:"/",component:$},{name:"exhibitions",path:"/exhibitions",component:y},{name:"artists",path:"/artists",component:I},{name:"galleries",path:"/galleries",component:H},{name:"exhibition",path:"/exhibitions/:id",component:V},{name:"artist",path:"/artists/:id",component:ht},{name:"gallery",path:"/galleries/:id",component:mt}],xt=new T["a"]({routes:_t});xt.beforeEach((function(t,e,i){document.body.className=t.name,document.title="ikon.view - "+t.name,i()}));var Et=xt,yt={name:"App",store:d,router:Et,components:{ExhibitionListView:y,ArtistListView:I},mounted:function(){this.$store.dispatch("fetchDatabase")},computed:{loadingStatus:function(){return this.$store.state.loadingStatus},loadingProgress:function(){return this.$store.state.loadingProgress}}},Nt=yt,kt=Object(v["a"])(Nt,r,a,!1,null,null,null),wt=kt.exports;i("5aea");n["a"].config.productionTip=!1,new n["a"]({render:function(t){return t(wt)}}).$mount("#app")},"5aea":function(t,e,i){},"5c92":function(t,e,i){"use strict";var n=i("dda5"),r=i.n(n);r.a},7928:function(t,e,i){},"985f":function(t,e,i){"use strict";var n=i("fec2"),r=i.n(n);r.a},b4fb:function(t,e,i){"use strict";var n=i("7928"),r=i.n(n);r.a},b73a:function(t,e,i){"use strict";var n=i("3de4"),r=i.n(n);r.a},c521:function(t,e,i){},dda5:function(t,e,i){},f4f5:function(t,e,i){},fec2:function(t,e,i){}});
//# sourceMappingURL=app.99fae108.js.map
ikon.view
=========
  
## Demo
https://zalavariandris.github.io/ikon.view/

## TODOS
- [ ] create tests
- [x] use moment instead native Date
- [x] express api server
- [ ] create deploy to gh-pages script
- [ ] get rid of toplist, unified search with levenshtein distance
- [ ] EDITING

### Artist Bio
- [x] add description for exhibitions from ikon.hu/archive
- [x] group list of dict by key
- [x] tag solo exhibitions
- [x] CV: group exhibitions by year
- [x] sort exhibiting, curating openingspeech secionts by count
- [x] group exhibitions by year
- [ ] in curating or openingspeech sections, show artists, when not too many
- [ ] add curating and opening relation with edge colors
- [ ] color people nodes by profession

### vgraph
- [x] d3graph
- [x] vue based graph
- [x] biparted ego network for artists
- [x] move to graphology network representation
- [ ] support edge color
- [ ] curved links (with intermediate nodes)


## Deploy to gh-pages
https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
- add remote from github
- create gh-pages branch
```
npm run build
git add -f dist
git commit -m "dist subtree commit2"
//git push origin --delete gh-pages
git subtree push --prefix dist origin gh-pages
git rm -r dist --cached
```

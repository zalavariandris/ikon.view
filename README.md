# ikon.view

## Demo
https://zalavariandris.github.io/ikon.view/

## Deploy to gh-pages
https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
- add remote from github
- create gh-pages branch
```
npm run build
// comment out dist/ in .gitignore. dont commit to master branch
git add dist && git commit -m "Initial dist subtree commit"
git subtree push --prefix dist origin gh-pages
// uncomment dist folder in .gitignore
```

## TODOS
- move to graphology network representation
- ArtistView
  - [x] biparted ego network
  - [ ] tag solo exhibitions
  - [ ] CV: group exhibitions by year
  - [ ] sort exhibiting, curating opening by count

- vgraph
  - [x] d3graph
  - [ ] sigma
  - [ ] sigma with d3 force layout
  - [ ] d3 with custom threejs renderer
  - [ ] selection
  - [ ] editing


- d3graph
  - [x] zoom to fit content

- [ ] create deploy to gh-pages script

- [ ] express api server
- [ ] editing
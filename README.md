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
- [x] Landing page
  - [ ] unified search with levenshtein distance

- [ ] get rid of toplist

- [x] move to graphology network representation

- ExhibitionView
  - [ ] add description for exhibitions from ikon.hu/archive

- Store
  - [x] return date as ISO string 

- Utils
  - [x] group list of dict by key

- ArtistView
  - [x] biparted ego network
    - [ ] add curating and opening relation with edge colors
    - [ ] color people nodes by profession
  - [x] tag solo exhibitions
  - [x] CV: group exhibitions by year
  - [ ] in curating or openingspeech sections, show artists, when not too many
  - [ ] sort exhibiting, curating openingspeech secionts by count

- ArtistsListView
  - [ ] exhibition, opening amd curating count

- GalleryView
  - [ ] group exhibitions by year
  - [ ] ego network

- vgraph
  - [x] d3graph
  - [ ] sigma
  - [ ] sigma with d3 force layout
  - [ ] d3 with custom threejs renderer
  - [ ] selection
  - [ ] editing

- d3graph
  - [x] zoom to fit content
  - [ ] filter not exhibition events from graph

- [ ] create deploy to gh-pages script

- [ ] express api server
- [ ] editing
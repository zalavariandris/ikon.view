//https://medium.com/@Roli_Dori/deploy-vue-cli-3-project-to-github-pages-ebeda0705fbd
// must have a gh-pages branch
npm run build
// dist probably need to be in git repo
git add dist && git commit -m "Initial dist subtree commit"
git subtree push --prefix dist origin gh-pages

//git rm -r --cached dist

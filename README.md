# Dev Stack 🛠

Just a basic Gulp based dev-stack with some frequently used NPM components and SCSS structure we use in WordPress websites development.

## Gulp Key Components
- SASS compilation and autoprefix
- JavaScript compilation and Uglify processing
- Optional JavaScript Babel compilation
- Assets MD5 query string hash invalidation
- BrowserSync
- Gettex POT generation
- Success and error notifications

This dev-stack is usually used in a `src` folder of WordPress theme. With a few path modifications it can be used anywhere.

## Available Tasks
- `$ gulp javascript` runs JavaScript compilation to `public/js` folder
- `$ gulp javascript-vendor` copies JavaScript vendor scripts to `public/js/vendor` folder
- `$ gulp style` runs SCSS/CSS complation to `template` folder
- `$ gulp style-components` runs SCSS/CSS components compilation to `public/css` folder
- `$ gulp md5-css` runs MD5 query string hash invalidation of style.css
- `$ gulp md5-css-components` runs MD5 query string hash invalidation of CSS components
- `$ gulp md5-js` runs MD5 query string hash invalidation of JavaScript
- `$ gulp pot` generate `template.pot` file to `languages/themes` folder
- `$ gulp browser-sync` – runs BrowserSync, preferably use `$ gulp` for BrowserSync and Watch

## Available Commands
- `$ npm install` installs NPM packages
- `$ gulp` runs `browser-sync` and `watch`
- `$ gulp build` runs `style`, `style-compontents`, `javascript-vendor`, `javascript`, `md5-css`, `md5-css-components` and `md5-js`

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

This dev-stack is usually used in `src` folder of WordPress theme. With a few path modifications it can be used anywhere.

## Available Tasks
- `$ gulp javascript` runs JavaScript compilation to `public/js` folder
- `$ gulp javascript-vendor` copies JavaScript vendor scripts to `public/js/vendor` folder
- `$ gulp style` runs SCSS/CSS complation to `public/css` folder
- `$ gulp md5-style` runs MD5 query string hash invalidation of CSS sources
- `$ gulp md5-javascript` runs MD5 query string hash invalidation of JavaScript sources
- `$ gulp pot` generates `template.pot` file to `languages/themes` folder
- `$ gulp browser-sync` – runs BrowserSync, but rather use `$ gulp` for BrowserSync and Watch

## Available Commands
- `$ npm install` installs NPM packages
- `$ gulp` runs `browser-sync` and `watch`
- `$ gulp build` runs `style`, `javascript-vendor`, `javascript`, `md5-style`, and `md5-javascript`

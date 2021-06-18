# GitHub Language Colors

[![NPM](https://nodei.co/npm/gh-lang-colors.png)](https://nodei.co/npm/gh-lang-colors/)

A JSON map of languages and colors used on GitHub.
The JSON file is updated automatically by GitHub Actions.

## Getting started

1. Install the package:

```
npm install --save gh-lang-colors
```

2. Add the package into your app:

```js
const GH_LANG_COLORS = require('gh-lang-colors');

console.log(GH_LANG_COLORS['JavaScript']) // #f1e05a
```

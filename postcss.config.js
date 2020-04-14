module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {},
    'postcss-cssnext': {
      warnForDuplicates: false
    },
    cssnano: {},
    // to edit target browsers: use "browserslist" field in package.json
    autoprefixer: {}
  }
};

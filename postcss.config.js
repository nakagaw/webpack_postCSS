var combConfig = require('./csscomb.json');
// var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  // parser: 'postcss-scss',
  plugins: {
    'precss': {},
    // 'postcss-flexbugs-fixes': {},
    // 'postcss-csscomb': combConfig,
    // new StyleLintPlugin({ configFile: xxx}),
    'css-mqpacker': { sort: true }, // trueにしないと先勝ソート
    'autoprefixer': { browsers: 'last 2 version'}
    // 'cssnano': {}
  }
}
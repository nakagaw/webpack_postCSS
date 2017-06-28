var combConfig = require('./csscombrc.json');

module.exports = {
  plugins: {
    'stylelint': {
      configFile: './stylelintrc.json'
    },
    'postcss-reporter': { clearAllMessages: true },
    'postcss-sorting': combConfig,
    'precss': {},
    'postcss-flexbugs-fixes': {},
    'css-mqpacker': { sort: true }, // trueにしないと先勝ソート
    'autoprefixer': { browsers: 'last 2 version'},
    'cssnano': {}
  }
}
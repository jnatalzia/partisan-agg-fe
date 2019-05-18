const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const CleanCSS = require('clean-css');

const cleanCSS = new CleanCSS({});

module.exports = {
  mode: process.env.DEBUG ? 'development' : 'production',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/index.html', to: 'index.html'},
      { from: 'src/manifest.json', to: 'manifest.json' },
      { from: 'src/fonts/', to: 'fonts/' },
      { from: 'src/img/', to: 'img/' },
      { from: 'src/css/', to: 'css/', transform(content, path) {
        console.log();
        let css = cleanCSS.minify(String(content))
        return css.styles;
      }}
    ])
  ],
  watchOptions: {
    ignored: ['node_modules']
  }
}
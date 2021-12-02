const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BrowserSync = require('browser-sync-webpack-plugin');

let p;

const htmlWebpackPlugin = (fileName) => {
  return new HtmlWebpackPlugin({
    template: `./pages/${fileName}.pug`,
    filename: `./${fileName}.html`
  })
}

const PATHS = {
  src:  path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets'
}

let config = {
  plugins: [
    new CleanWebpackPlugin(),
    htmlWebpackPlugin('catalog'),
    htmlWebpackPlugin('index'),
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
    new BrowserSync({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['dist']
      }
    }),
  ],
  mode: 'none',
  context: PATHS.src,
  entry: './common/index.js',
  output: {
    path: PATHS.dist,
    filename: 'js/index.bundle.js'
  },
  module: {
    rules: [
      // ===PUG===
      {
        test: /\.pug$/,
        use: ['html-loader',
          { loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      // ===IMAGES===
      {
        test: /\.(png|jp(e)?g|svg)$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/img/[name][ext]`
        }
      },
      // ===FONTS===
      {
         test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
         type: 'asset/resource',
         generator: {
           filename: `${PATHS.assets}/fonts/[name][ext]`
         }
       },
       // ===SCSS==
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      }
    ]
  }
}



module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.mode = 'development';
    p = true;
  }

  if (argv.mode === 'production') {
    config.mode = 'production';
    p = false;
  }

  return config;
}

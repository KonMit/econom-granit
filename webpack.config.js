const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const BrowserSync = require('browser-sync-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

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

let clientConfig = {
  plugins: [
    
    new CleanWebpackPlugin(),
    htmlWebpackPlugin('shar'),
    htmlWebpackPlugin('lampada'),
    htmlWebpackPlugin('vasi'),
    htmlWebpackPlugin('kroshka'),
    htmlWebpackPlugin('bordur'),
    htmlWebpackPlugin('plitka'),
    htmlWebpackPlugin('vertikalnie'),
    htmlWebpackPlugin('contacts'),
    htmlWebpackPlugin('catalog'),
    htmlWebpackPlugin('our-work'),
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
  
  mode:'none',
  context: PATHS.src,
  entry: './common/index.js',
  target:'web',
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
      // ===PHP===
      {
        test: /\.php$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.dist}[ext]`
        }
      },
      // ===IMAGES===
      {
        test: /\.(png|jp(e)?g|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/img/[path][name][ext]`
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
      // ===JSON===
       {
        test: /\.json?$/,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/JSON/[name][ext]`
        }
      },
       // ===SCSS==
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      }
    ]
  },
  //  optimization: {
  //   minimizer: [
  //     "...",
  //     new ImageMinimizerPlugin({
  //       minimizer: {
  //         implementation: ImageMinimizerPlugin.imageminMinify,
  //         options: {
  //           // Lossless optimization with custom option
  //           // Feel free to experiment with options for better result for you
  //           plugins: [
  //             ["gifsicle", { interlaced: true }],
  //             ["jpegtran", { progressive: true }],
  //             ["optipng", { optimizationLevel: 5 }],
  //             // Svgo configuration here https://github.com/svg/svgo#configuration
  //             [
  //               "svgo",
  //               {
  //                 plugins: extendDefaultPlugins([
  //                   {
  //                     name: "removeViewBox",
  //                     active: false,
  //                   },
  //                   {
  //                     name: "addAttributesToSVGElement",
  //                     params: {
  //                       attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
  //                     },
  //                   },
  //                 ]),
  //               },
  //             ],
  //           ],
  //         },
  //       },
  //     }),
  //   ],
  // },
};

// let serverConfing = {
//   target:'node',
//   output: {
//     path: PATHS.dist,
//     filename: 'js/index.bundle.node.js'
//   },
// }

// module.exports = [serverConfing, clientConfig];

module.exports = (env, argv) => {
 
  if (argv.mode === 'development') {
    clientConfig.mode = 'development';
    p = true;
  }

  if (argv.mode === 'production') {
    clientConfig.mode = 'production';
    p = false;
  }

  return clientConfig;
};

const path = require('path');
const os = require('os');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const postcssImport = require('postcss-import');
const cssnext = require('postcss-cssnext');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const stylelint = require('stylelint');
function resolve (dir) {
    return path.join(__dirname, dir);
}
module.exports = {
  entry: {
    main: "@/main"
  },
  output: {
    path: path.resolve(__dirname, "../../../WEBTEST/html/dist")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: "vue-style-loader!css-loader",
            postcss: "vue-style-loader!css-loader!postcss-loader"
          },
          postLoaders: {
            html: "babel-loader"
          }
        }
      },
      {
        test: /iview\/.*?js$/,
        loader: "happypack/loader?id=happybabel",
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: "happypack/loader?id=happybabel",
        exclude: /node_modules/
      },
      {
        test: /\.js[x]?$/,
        include: [resolve("src")],
        exclude: /node_modules/,
        loader: "happypack/loader?id=happybabel"
      },
      {
        test: /\.css$/,
        // loader: ExtractTextPlugin.extract('style', 'css!postcss')
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader", "postcss-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ["css-loader?minimize", "autoprefixer-loader", "less-loader"],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        loader: "url-loader?limit=1024"
      },
      {
        test: /\.(html|tpl)$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HappyPack({
      id: "happybabel",
      loaders: ["babel-loader"],
      threadPool: happyThreadPool,
      verbose: true
    }),
    new StyleLintPlugin({
      config: {
        // 你的lint扩展自刚刚安装的stylelint-config-standard
        extends: "stylelint-config-standard"
      },
      // 正则匹配想要lint监测的文件
      files: "frontend/stylesheet/**/*.l?(e|c)ss"
    }),
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery"
    })
  ],
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      vue: "vue/dist/vue.esm.js",
      "@": resolve("../src")
    }
  }
};
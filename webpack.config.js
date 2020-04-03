require('dotenv').config()
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { join } = require('path');
const webpack = require('webpack');
const {HotModuleReplacementPlugin} = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = env => {
  let config = {
    mode: 'development',
    entry: join(__dirname, 'src/main.js'),
    output: {
      path: join(__dirname, 'build'),
      filename: 'bundle.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    plugins: [
      new HotModuleReplacementPlugin(),
      new VueLoaderPlugin(),
      new webpack.DefinePlugin({
        'process.env.YOUTUBE_API_KEY': `"${process.env.YOUTUBE_API_KEY}"`
      }),
      new HTMLWebpackPlugin({
        'showErrors': true,
        'cache': true,
        'title': 'Meyo',
        'favicon': join(__dirname, 'public/static/favicons/favicon.ico'),
        'template': join(__dirname, 'public/index.html'),
      }),
      new CopyWebpackPlugin([
        {
          from: join(__dirname, 'public/static'),
          to: 'static'
        },
      ])
    ],
    resolve: {
      alias: {
        '~': join(__dirname, 'src/'),
        '~api': join(__dirname, 'src/api/'),
        '~assets': join(__dirname, 'src/assets/'),
        '~components': join(__dirname, 'src/components/'),
        '~config': join(__dirname, 'src/weblearn.config.js'),
        '~events': join(__dirname, 'src/events/'),
        '~pages': join(__dirname, 'src/pages/'),
        '~store': join(__dirname, 'src/store/'),
        '~topics': join(__dirname, 'src/topics/'),
        '~transformers': join(__dirname, 'src/transformers/'),
        '~util': join(__dirname, 'src/util/'),
        '~widgets': join(__dirname, 'src/widgets/')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
	  options: {
	      presets: ['@babel/preset-env']
	  }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.(yml|yaml)$/,
          loader: 'json-loader!yaml-loader'
        },
        {
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        },
        {
          test: /\.sass$/,
          loader: 'style-loader!css-loader!sass-loader?indentedSyntax'
        },
        {
          test: /\.scss$/,
          loader: 'style-loader!css-loader!sass-loader'
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          query: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    }
  }

  if(env && env.analyze) {
    config.plugins = (config.plugins || []).concat([
      new BundleAnalyzerPlugin()
    ])
  }


  return config
}

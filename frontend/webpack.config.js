const autoprefixer = require('autoprefixer')

module.exports = [{
    entry: ['./src/sass/app.scss', './src/index.js'],
    output: {
      // This is necessary for webpack to compile
      // But we never use style-bundle.js
      filename: 'bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'bundle.css',
              },
            },
            { loader: 'extract-loader' },
            { loader: 'css-loader' },
            /* {
              loader: 'postcss-loader',
              options: {
                postcssOptions: () => [autoprefixer()]
              }
            }, */
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['./node_modules']
                },
                // Prefer Dart Sass
                implementation: require('sass'),

                // See https://github.com/webpack-contrib/sass-loader/issues/804
                webpackImporter: false,
              }
            },
          ]
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          /* query: {
            presets: ['@babel/preset-env'],
          }, */
        }
      ]
    },
  }];
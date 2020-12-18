//const autoprefixer = require('autoprefixer')

module.exports = [{
    entry: ['./src/sass/app.scss', './src/index.js'],
  
    output: {
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
            {
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  includePaths: ['./node_modules']
                },
                implementation: require('sass'),
                webpackImporter: false,
              }
            },
          ]
        },
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
            }
          }
        },
      ],
    },
  },
];
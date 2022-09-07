const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  // entry is the top level of my code
  entry: './client/index.js',
  output: {
    filename: 'main.js',
    path: __dirname + '/public',
  },

  // change mode to 'production' for live build, 'development' for dev build
  // process.env.NODE_ENV is set in package.json scripts for starting production vs dev builds
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
          }
        },
        // test: /\.tsx?$/,
        // use: 'ts-loader',
        // exclude: /(node_modules)/
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules)/,
        use: [
          "style-loader",
          "css-loader",
          'sass-loader',
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
    ]
  },
  // dev server configuration
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Development', // title is optional
      //injects bundle into the html file, then serves
      template: '/index.html', // template is required
    })
  ],
  devServer: {
    static: {
      // virtual directory created in RAM where bundled app will be served from
      publicPath: '/public',
      // where we can serve additional static files from
      directory: path.resolve(__dirname, '/public'),
    },
    proxy: {
      // when making a request to server, use the specified server domain 
      '/statistics': 'http://localhost:3000',
      // for future use
      '/api': 'http://localhost:3000',
    },
    compress: true,
    port: 8080
  },
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx', '.ts'],
  },
};
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
<<<<<<< HEAD
  entry: './src/main.js', // Точка входа
  output: {
    filename: 'bundle.[contenthash].js', // Имя бандла
    path: path.resolve(__dirname, 'build'), // Директория для файлов сборки
    clean: true, // Удаляем предыдущую сборку перед созданием новой
  },
  devtool: 'source-map', // Генерируем карту исходного кода
  plugins: [ // Подключаем плагины
=======
  entry: './src/main.js',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'source-map',
  plugins: [
>>>>>>> master
    new HtmlPlugin({
      template: 'public/index.html',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          globOptions: {
            ignore: ['**/index.html'],
          },
        },
      ],
    }),
  ],
  module: {
<<<<<<< HEAD
    rules: [ // Добавляем лоадеры
=======
    rules: [
>>>>>>> master
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          },
        },
      },
<<<<<<< HEAD
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
=======
    ]
  }
>>>>>>> master
};

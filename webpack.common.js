const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'], // import 시 생략할 확장자
  },
  output: {
    filename: 'bundle.js', // 번들링 결과 파일명
    path: path.resolve(__dirname, 'dist'), // 번들링 결과 파일 경로
    publicPath: "/",
    clean: true, // 번들링 시 이전에 생성되어있던 번들링 파일을 지우고 번들링
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/i, // 변환이 필요한 파일들을 식별
        exclude: /node_modules/, // 정규표현식에 일치하는 파일 중에서 제외할 파일
        use: { // 사용할 loader 선언. 뒤에 선언한 loader가 먼저 실행됨
          loader: 'ts-loader',
        },
      },
      {
        test: /.css?$/,
        exclude: [],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'file-loader'],
      },
    ],
  },
  plugins: [ // 최종 output을 변경해주는 도구
    new Dotenv({
      systemvars: true // 모든 시스템 변수를 추가적으로 로드(외부 시스템 변수에 접근 허용)
    }),
    new HtmlWebpackPlugin({ // html 파일을 자동으로 생성
      template: './public/index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/images/favicon.png',
      mode: 'webapp',
      devMode: 'webapp',
      favicons: {
        appName: '잔잔북스',
        appDescription: '독서 기록을 편리하게, 잔잔북스',
        developerName: 'misobae',
        developerURL: null, // prevent retrieving from the nearest package.json
        background: '#ddd',
        theme_color: '#333',
        icons: {
          coast: false,
          yandex: false
        }
      }
    }),
    new RobotstxtPlugin(),
  ],
  devtool: 'inline-source-map', // devtool: 소스맵 생성 방식 설정
  devServer: { // devServer: 코드가 변경될 때 마다 자동으로 컴파일하는 옵션
    static: './dist',
    hot: true, // 수정된 부분만 바뀌고, 입력해놓은 정보들은 유지되는 기능
    open: true, // 서버가 시작된 후 브라우저를 열어줌
  },
};
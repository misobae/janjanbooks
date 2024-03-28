const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval', // 빠른 소스맵을 생성해 번들링된 코드를 실제 소스 코드에 매핑함. 빠르지만 정확성이 떨어질 수 있음. 개발 중에 권장되는 옵션 중 하나
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
    proxy: [
      {
        context: ['/ttb/api'], // 클라이언트에서 /ttb/api로 시작하는 모든 요청을
        target: 'http://www.aladin.co.kr', // 여기로 프록시해라
        changeOrigin: true, // 헤더의 host 값을 대상 서버의 호스트로 변경하는 옵션 (defualt: false)
      },
    ],
  },
});
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval', // 빠른 소스맵을 생성해 번들링된 코드를 실제 소스 코드에 매핑함. 빠르지만 정확성이 떨어질 수 있음. 개발 중에 권장되는 옵션 중 하나
  devServer: {
    historyApiFallback: true,
    port: 3000,
    hot: true,
  },
});
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map', // 프로덕션 빌드 시 소스맵 파일을 생성하지만 번들링된 파일에 소스맵 경로를 숨겨 외부에 노출되지 않도록 함
});
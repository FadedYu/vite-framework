module.exports = {
  // 只校验eslint，不自动修复
  // "*.{js,ts,vue}": "eslint",

  // eslint自动修复lint问题。
  '*.{js,ts,vue,jsx,tsx}': 'eslint --fix',

  // 启动stylelint校验，并自动修复
  '*.{vue,css,less,html}': 'stylelint --fix'
}

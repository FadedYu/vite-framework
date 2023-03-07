/**
 * 提交代码前，对所提交的代码进行代码规范校验
 */
module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint  --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
  '*.{scss,less,styl,html}': ['stylelint --fix', 'prettier --write'],
  '*.vue': ['eslint --fix', 'prettier --write', 'stylelint --fix']
}

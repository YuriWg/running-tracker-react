const ghpages = require('gh-pages');
const fs = require('fs');

// 确保 .nojekyll 文件存在
fs.writeFileSync('./build/.nojekyll', '');

ghpages.publish(
  'build',
  {
    branch: 'gh-pages',
    message: '自动部署 ' + new Date().toISOString(),
    dotfiles: true  // 重要：包括以点开头的文件
  },
  function(err) {
    if (err) {
      console.error('部署失败:', err);
      process.exit(1);
    } else {
      console.log('成功部署到 GitHub Pages！');
    }
  }
);
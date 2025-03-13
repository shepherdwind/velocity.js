#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 递归遍历目录
function traverseDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      traverseDir(fullPath);
    } else if (file.endsWith('.js') && !file.endsWith('.d.js')) {
      fixImports(fullPath);
    }
  }
}

// 修复导入语句
function fixImports(file) {
  console.log(`Fixing imports in ${file}`);
  let content = fs.readFileSync(file, 'utf8');

  // 修复相对导入
  content = content.replace(/from\s+['"](\.[^'"]*)['"]/g, (match, importPath) => {
    // 如果导入路径没有扩展名，添加 .js
    if (!path.extname(importPath)) {
      return `from '${importPath}.js'`;
    }
    return match;
  });

  // 修复单独的 import 语句
  content = content.replace(/import\s+['"](\.[^'"]*)['"]/g, (match, importPath) => {
    // 如果导入路径没有扩展名，添加 .js
    if (!path.extname(importPath)) {
      return `import '${importPath}.js'`;
    }
    return match;
  });

  fs.writeFileSync(file, content, 'utf8');
}

// 开始处理
const esmDir = path.join(__dirname, '../dist/esm');
traverseDir(esmDir);
console.log('ESM imports fixed successfully!');

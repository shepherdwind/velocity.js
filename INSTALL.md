# 安装指南

本项目使用 npm 作为包管理器。

## 安装项目依赖

克隆仓库后，在项目根目录运行：

```bash
npm install
```

这将安装所有依赖项。

## 常用命令

以下是一些常用命令：

```bash
# 运行测试
npm test

# 运行 lint
npm run lint

# 构建项目
npm run build

# 测试构建结果
npm run test:build

# 运行 CI 流程（lint + test + build）
npm run ci
```

## 使用国内镜像

项目已配置使用 npmmirror（原淘宝镜像）作为默认注册表，这将大大提高在中国地区的下载速度。配置在 `.npmrc` 文件中。

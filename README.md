# Vue 3 + TypeScript + Vite

## 搭建husky eslint prettier commitlint commitizen 规范的项目

### 一、安装eslint

npm i eslint -D
执行初始化
npx eslint --init
按步骤走完
会生成.eslintrc文件

生成的eslintrc配置需要改一下，不然vue文件会报Parsing error: ‘＞‘ expected

修改

```
// before
// parser: '@typescript-eslint/parser',
// parserOptions: {
//   ecmaVersion: 'latest',
//   sourceType: 'module'
// },

// now
"parser": "vue-eslint-parser",
  "parserOptions":{
  "parser":"@typescript-eslint/parser",
},
```

### 二、安装prettier

npm i prettier -D
手动新建 .prettierrc，写点基础配置，如下

```
{
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "singleQuote": true,
  "arrowParens": "avoid"
}

```

eslint 与prettier结合使用
安装依赖
npm i  eslint-config-prettier eslint-plugin-prettier -D
配置.eslintrc文件
把插件使用上

```
module.exports = {
  extends: [
    "eslint:recommended", 
    "plugin:vue/vue3-essential",
+    'plugin:prettier/recommended'
  ],
}
```

### 三、安装husky lint-staged  

husky----------操作 git 钩子的工具
lint-staged----本地暂存代码检查工具

npm i lint-staged husky -D

设置脚本：npm set-script prepare "husky install"
会在packages.json追加一条script
 "prepare":"husky install"

启动脚本：npm run prepare
会生成.husky目录

添加git钩子命令
npx husky add .husky/pre-commit "npx lint-staged"

创建.lintstagedrc.json

```
{
  "*.{js,jsx,ts,tsx,vue}": "eslint --ext .vue,.js,.ts src/"
}

```

### 四、安装Commitlint

Commitlint：用于校验填写的commit message是否符合设定的规范

npm i commitlint @commitlint/config-conventional -D

添加husky钩子
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'

### 五、安装commitizen

Commitizen：是一个命令行提示工具，它主要用于帮助我们更快地写出规范的commit message

npm i commitizen  -g   全局安装

可选：使用cz-conventional-changelog规则
npm i cz-conventional-changelog -D
再执行

```
npx commitizen init cz-conventional-changelog --save-dev --save-exact
# npm commitizen init cz-conventional-changelog --save-dev --save-exact 
# yarn commitizen init cz-conventional-changelog --yarn --dev --exact 
# pnpm commitizen init cz-conventional-changelog --pnpm --save-dev --save-exact
```

上面的命令会在package里添加

```
 "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
 }
```

可选：使用自己的规则

npm i -D commitlint-config-cz cz-customizable

把package.json里的commitizen配置改成使用cz-customizable

```
"config": {
    "commitizen": {
      "path": "node_modules/cz-customizable"
    }
 }
```

新建commitlint.config.js文件

```
module.exports = {
  // 使用 .cz.config.js里的规则 
  extends: ['cz'],
  rules: {
    // 自定义
  }
};
```

新建 .cz-config.js

```
  'use strict'
  module.exports = {
    types: [
      { value: '✨新增', name: '新增:    新的内容' },
      { value: '🐛修复', name: '修复:    修复一个Bug' },
      { value: '📝文档', name: '文档:    变更的只有文档' },
      { value: '💄格式', name: '格式:    空格, 分号等格式修复' },
      { value: '♻️重构', name: '重构:    代码重构，注意和特性、修复区分开' },
      { value: '⚡️性能', name: '性能:    提升性能' },
      { value: '✅测试', name: '测试:    添加一个测试' },
      { value: '🔧工具', name: '工具:    开发工具变动(构建、脚手架工具等)' },
      { value: '⏪回滚', name: '回滚:    代码回退' }
    ],
    scopes: [
      { name: 'leetcode' },
      { name: 'javascript' },
      { name: 'typescript' },
      { name: 'Vue' },
      { name: 'node' }
    ],
    // it needs to match the value for field type. Eg.: 'fix'
    /*  scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },  */
    // override the messages, defaults are as follows
    messages: {
      type: '选择一种你的提交类型:',
      scope: '选择一个scope (可选):',
      // used if allowCustomScopes is true
      customScope: 'Denote the SCOPE of this change:',
      subject: '短说明:\n',
      body: '长说明，使用"|"换行(可选)：\n',
      breaking: '非兼容性说明 (可选):\n',
      footer: '关联关闭的issue，例如：#31, #34(可选):\n',
      confirmCommit: '确定提交说明?(yes/no)'
    },
    allowCustomScopes: true,
    allowBreakingChanges: ['特性', '修复'],
    // limit subject length
    subjectLimit: 100
  }

```

最后使用git cz命令即可有提示的提交代码

# mockgenerator
基于swagger文档自动生成前端mock文件

### 安装

```
$ npm i mockgeneratorcli -g
```

### 配置文件（mockGenerator.config.js）
```
module.exports = {
  swaggerUrl: '', // swagger-api的文档地址
  outputFileType: 'ts', //生成文件类型 ts||js
  outputPath: './mock/biz', // 输出目录，最终会自动生成文件 outputPath/[模块名]
  ignoreList: ['Import'], // 忽略api列表
  dataLength: '1-8', // mock 为数组时数组长度
  fileName: 'mock', //默认以swaggerapi tags的第一个值为模块名，按模块生成mock文件，否则以该配置为文件名生成单个文件
};

```

### 使用

命令行使用：
```
$ mockgeneratorcli

```
在package.json中添加任务
```
{
   ...
    "scripts": {
        ...
        "mockgenerator": "mockgeneratorcli"
    },
    ...
}

```


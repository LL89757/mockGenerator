module.exports = {
  swaggerUrl: '', // swagger-api的文档地址
  outputFileType: 'ts', //生成文件类型 ts||js
  outputPath: './mock/biz', // 输出目录，最终会自动生成文件 outputPath/[模块名]
  ignoreList: ['Import'], // 忽略api列表
  dataLength: '1-8', // mock 为数组时数组长度
  fileName: 'mock', //默认以swaggerapi tags的第一个值为模块名，按模块生成mock文件，否则以该配置为文件名生成单个文件
};

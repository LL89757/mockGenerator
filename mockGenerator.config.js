module.exports = {
  swaggerUrlList: [
    {
      swaggerUrl: '',
      outputDir: '/mock/demo',
      generate: false,
    }
  ],
  outputFileType: 'ts', //生成文件类型 ts||js
  ignoreList: [], // 忽略api列表
  dataLength: '1-8', // mock 为数组时数组长度
  fileName: 'mock', //默认以swaggerapi tags的第一个值为模块名，按模块生成mock文件，否则以该配置为文件名生成单个文件
}

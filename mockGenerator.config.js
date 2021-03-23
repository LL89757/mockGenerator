module.exports = {
  swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-edu-admin', // swagger-api的文档地址
  swaggerUrlList: [
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-edu-admin',
      outputDir: '/mock/edu-admin',
      generate: false,
    },
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-sso',
      outputDir: '/mock/sso',
      generate: false,
    },
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-ordering',
      outputDir: '/mock/ordering',
      generate: true,
    },
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-org-management',
      outputDir: '/mock/org-management',
      generate: true,
    },
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-bff',
      outputDir: '/mock/bff',
      generate: true,
    },
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-background-task',
      outputDir: '/mock/background-task',
      generate: false,
    },
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-msg-center',
      outputDir: '/mock/msg-center',
      generate: false,
    },
    {
      swaggerUrl: 'https://dev-tbu-next-erp-gateway.schoolpal.cn/swagger/df-dev-next-erp-020-01/next-report',
      outputDir: '/mock/report',
      generate: true,
    },
  ],
  outputFileType: 'ts', //生成文件类型 ts||js
  ignoreList: [], // 忽略api列表
  dataLength: '1-8', // mock 为数组时数组长度
  fileName: 'mock', //默认以swaggerapi tags的第一个值为模块名，按模块生成mock文件，否则以该配置为文件名生成单个文件
}

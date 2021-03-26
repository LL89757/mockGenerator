const swaggerParserMock = require('swagger-parser-mock');
const fs = require('fs');
const mkdirp = require('mkdirp');
const signale = require('signale');
const mockGenerator = {
  async init({ swaggerUrlList, dataLength, fileName, ignoreList, outputFileType }) {
    this.swaggerUrlList = swaggerUrlList;
    this.dataLength = dataLength;
    this.fileName = fileName;
    this.ignoreList = ignoreList;
    this.outputFileType = outputFileType || 'ts';
    signale.start('mock generate start');
    signale.wait(`get swaggerData.`);
    this.swaggerUrlList.forEach(async data => {
      if (!data.generate) {
        return
      }
      let url = data.swaggerUrl,
        outputDir = data.outputDir
      signale.start(`mock-job:${url} start`)
      let swaggerData = await this.parse(url)
      if (swaggerData.length === 0) {
        signale.error(`swaggerData cannot be empty`)
        return
      }
      let mockData = this.getMockData(swaggerData)
      await this.generateMockFile(mockData, outputDir)
      signale.start(`mock-job:${url} complete`)
    })
  },
  //   解析swagger-api-doc
  async parse(url) {
    try {
      const { paths } = await swaggerParserMock(url)
      if (!paths) {
        return []
      }
      return paths
    } catch (error) {
      signale.fatal(error)
      return []
    }
  },

  //   生成mock数据
  getMockData(paths) {
    let keys = Object.keys(paths);
    let contentObj = {};
    keys.forEach(key => {
      let method = paths[key].post ? 'post' : 'get';
      let apiDetail = paths[key][method];
      let module = apiDetail.tags[0] || this.fileName;
      if (!contentObj[module]) {
        contentObj[module] = '';
      }
      if (!this.filterIgnoreList(key)) {
        let data = this.generateData(paths, key, method);
        contentObj[module] += data;
      }
    });
    return contentObj;
  },
  //   过滤忽略api
  filterIgnoreList(path) {
    return (
      this.ignoreList.findIndex(ignorePath => {
        return path.indexOf(ignorePath) != -1;
      }) != -1
    );
    // return (
    //   path.match(/[a-zA-z0-9]+/g).findIndex(pathModule => {
    //     return (
    //       this.blacklist.findIndex(module => {
    //         return module == pathModule;
    //       }) != -1
    //     );
    //   }) != -1
    // );
  },
  //  生成每个模块的mock数据
  generateData(paths, path, method) {
    const summary = paths[path][method]['summary'];
    const response = paths[path][method]['responses']['200'];
    try {
      if (!response['example']) {
        signale.error(`responseData parse failed; path:${path} \r\n`, 'example response cannot be empty');
        return '';
      }
      const data = formatResToMock(path, response['example'], this.dataLength);
      return `  // ${summary.replace(/\r\n/g, '\r\n//')}
  '${method.toUpperCase()} /api${path.replace(/\{([^}]*)\}/g, ':$1')}': (req, res) => {
    res.send(Mock.mock(${data.replace(/null/g, '') || `true`}));
  },
`;
    } catch (error) {
      signale.error(`responseData parse failed; path:${path} \r\n`, error);
      return '';
    }
  },
  //   生成mock文件
  async generateMockFile(mockData, outputDir) {
    await this.makeDir(outputDir);
    for (let key in mockData) {
      await this.writeMockFile(mockData[key], key, outputDir);
    }
  },
  async writeMockFile(data, fileName, outputDir) {
    // 写入文件
    let temp = '';
    if (this.outputFileType == 'ts') {
      temp = `import Mock from 'mockjs';
export default {
${data}};`;
    } else {
      temp = `var Mock = require('mockjs');
module.exports = {
  ${data}};`;
    }
    fs.writeFile(`${process.cwd()}${outputDir}/${fileName}.${this.outputFileType}`, temp, 'utf-8', err => {
      if (err) {
        signale.fatal(err);
        throw err;
      }
    });
  },
  //   生成目录
  async makeDir(outputDir) {
    let path=process.cwd() + outputDir
    return new Promise((resolve, reject) => {
      let exists=fs.existsSync(path)
      if (!exists) {
        // 新建该文件夹
        mkdirp(path).then((made) => {
          console.log(made)
          resolve();
        });
      } else {
        resolve();
      }
    });
  },
};

// 格式化mock
function formatResToMock(path, res, dataLength) {
  let data = '';
  let praseRes = JSON.parse(res);
  if (Array.isArray(praseRes)) {
    data = `{ 
      "data|${dataLength}": ${res}
    }`;
  } else {
    Object.keys(praseRes).forEach(key => {
      if (Array.isArray(praseRes[key])) {
        praseRes[`${[key]}|${dataLength}`] = praseRes[key];
        delete praseRes[key];
      }
    });
    data = `{ 
      "data": ${JSON.stringify(praseRes)}
    }`;
  }
  return data;
}
module.exports = mockGenerator;

#!/usr/bin/env node
var mockGenerator = require('../lib/mockGenerator')
var program = require('commander');
var {join} =require('path')
const mockConfig = require(join(process.cwd() + '/mockGenerator.config'));
program
  .description('generate mock data by swaggerapi')
  .version('v' + require(join(process.cwd() + '/package.json')).version, '-v, --version')
  .action(function (env, opt) {
    mockGenerator.init({
      swaggerUrl: mockConfig.swaggerUrl,
      outputPath: mockConfig.outputPath,
      dataLength: mockConfig.dataLength,
      fileName: mockConfig.fileName,
      ignoreList: mockConfig.ignoreList,
      outputFileType: mockConfig.outputFileType,
    });
  })
  .parse(process.argv);

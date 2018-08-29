function isLinux() {
  return typeof global !== 'undefined' && global.process && global.process.platform === 'linux';
}

var config = {
  apps: [{
    name: 'ssr' + (process.env.num || ''),
    script: './node_modules/dvd-base-build-node-ssr/dist/server.js',
    instances: process.env.env == 'prod' ? 8 : 1,
    merge_logs: true,
    // log_date_format: '\[ YYYY-MM-DD MM:mm:ss SSS ',
  }],
};

// 日志
if (isLinux()) {
  config.apps[0].output = '/data/logs/node_logs/ssr/ssr' + (process.env.num || '') + '-out.log';
  config.apps[0].error = '/data/logs/node_logs/ssr/ssr' + (process.env.num || '') + '-error.log';
  config.apps[0].log = '/data/logs/node_logs/ssr/ssr' + (process.env.num || '') + '-all.log';
}

console.log('pm2配置如下：');
console.log(config);

module.exports = config;

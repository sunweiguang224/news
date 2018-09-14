'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressFavicon = require('express-favicon');

var _expressFavicon2 = _interopRequireDefault(_expressFavicon);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _htmlMinifier = require('html-minifier');

var _htmlMinifier2 = _interopRequireDefault(_htmlMinifier);

var _vueServerRenderer = require('vue-server-renderer');

var _dvdServiceJsConsole = require('../common/js/dvd-service-js-console/dvd-service-js-console');

var _dvdServiceJsConsole2 = _interopRequireDefault(_dvdServiceJsConsole);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import buildPageRouter from './build_page_router.js';

/*// 如果本地开发，启动express服务之前编译路由，确保路由能够注册上
 // 如果发布代码，路由已经在npm run server中编译好，不需要启动服务前编译，这样可以快速重启
 if (!config.env.env) {
 buildPageRouter();
 }*/

// 创建一个新的bundleRenderer，需要50ms~200ms，不必要每次请求都创建


// 自定义
// 第三方
function bundleRendererFactory() {
  var setting = {
    runInNewContext: 'once', // 只实例化一次，且业务代码不会污染global
    template: _fs2.default.readFileSync(_path2.default.resolve('src/build/template.html'), 'utf-8'), // （可选）页面模板
    inject: false
  };

  // 指定html中加载的client端JS（发布代码时必须加载，保证功能完整性；本地开发时有则加载，只开发html和css时可以不用编译client端JS）
  if (_config2.default.env.env || _fs2.default.existsSync('dist/static/vue-ssr-client-manifest.json')) {
    // 必须用实时读取文件方式（require方式有缓存，开发模式下不能拿实时更新）
    setting.clientManifest = JSON.parse(_fs2.default.readFileSync('dist/static/vue-ssr-client-manifest.json', 'utf-8')); // （可选）客户端构建 manifest
  }

  return (0, _vueServerRenderer.createBundleRenderer)(JSON.parse(_fs2.default.readFileSync('dist/static/vue-ssr-server-bundle.json', 'utf-8')), setting);
}

/*// 压缩html，去除冗余空格
 function minifyHtml(html) {
 return htmlMinifier.minify(html, {
 removeComments: true,
 collapseWhitespace: true,
 minifyJS: true,
 minifyCSS: true,
 });
 }*/

/************************************ 服务端启动任务 ************************************/


// 内部模块
_dvdServiceJsConsole2.default.log('>>>>>>>>>>>>>>> \u670D\u52A1\u7AEF\u542F\u52A8\u4EFB\u52A1\u5F00\u59CB\u6267\u884C\u3002' + _util2.default.getNow());

// 全局服务
var app = (0, _express2.default)();

// 全局cookie解析，为req增加cookies字段，可以使用req.cookies.xxx获取单个cookie
app.use((0, _cookieParser2.default)());

// 处理favicon.ico请求
app.use((0, _expressFavicon2.default)(_path2.default.resolve('favicon.ico')));

// 注册静态文件服务
app.use(_express2.default.static(_path2.default.resolve('dist'), {
  setHeaders: function setHeaders(res) {
    res.set({
      // 'Content-Encoding': 'gzip',
    });
  }
}));

// 全局异常处理，服务端发生异常时将错误返回给页面
app.use(function (err, req, res, next) {
  _dvdServiceJsConsole2.default.error(err.stack, { req: req });
  res.status(500).send('服务器发生异常:\n' + err.stack);
});

// 预先创建渲染器
var bundleRenderer = _config2.default.env.env ? bundleRendererFactory() : null;

if (!_config2.default.env.env) {

  app.use(_express2.default.Router().get(['*'], function (req, res, next) {
    if (req.protocol === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
  }));
}

// html请求
app.use(_express2.default.Router().get(['/*.html', '/'], function (req, res, next) {

  _dvdServiceJsConsole2.default.log('express\u6536\u5230html\u8BF7\u6C42', { req: req });

  var start = Date.now();

  // 保证每次修改代码生效（本地开发模式）
  if (!_config2.default.env.env) {
    bundleRenderer = bundleRendererFactory();
  }

  // html请求超时，60s
  var maxTime = 60000;
  var timeout = setTimeout(function () {
    var msg = '[' + req.url + '] \u8BF7\u6C42\u8D85\u65F6' + maxTime / 1000 + 's\uFF0C\u5DF2\u4E3B\u52A8\u7ED3\u675F\u3002';
    _dvdServiceJsConsole2.default.log(msg, { req: req });
    res.end(msg);
  }, maxTime);

  // 开始渲染
  bundleRenderer.renderToString({
    req: req,
    res: res,
    config: _config2.default
  }).then(function (html) {

    // html response header
    res.set({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache'
    });

    // html response body
    res.end(html);

    clearTimeout(timeout);

    _dvdServiceJsConsole2.default.log('\u9875\u9762\u6E32\u67D3\u5B8C\u6210\uFF0C\u65F6\u95F4\u6D88\u8017\u4E3A\uFF1A' + (Date.now() - start), { req: req });
  }).catch(function (err) {
    // 如果主动中断，不输出log
    if (err.message !== 'interrupt') {
      if (err.message === '404') {
        res.write('404\u60A8\u8BF7\u6C42\u7684\u9875\u9762\u4E0D\u5B58\u5728');
      } else {
        // res.end(`${err.message}<br>${err.stack.replace(/\n/g, '<br>')}`);
        res.write('\u8C8C\u4F3C\u51FA\u9519\u4E86');
      }
      res.end('\uFF0C\u5373\u5C06\u8DF3\u8F6C\u5230\u5E97\u94FA\u9996\u9875<script>setTimeout(function(){ location.href = \'/\'; }, 3000);</script>');
      _dvdServiceJsConsole2.default.error(err, { req: req });
    }
  });
}));

// 启动服务
(function listen() {

  // 创建http(s)服务
  var server = {
    http: _http2.default.createServer(app),
    https: _https2.default.createServer({
      cert: _fs2.default.readFileSync(_path2.default.resolve('src/build/cert/file.crt'), 'utf8'),
      key: _fs2.default.readFileSync(_path2.default.resolve('src/build/cert/private.pem'), 'utf8')
      // cert: fs.readFileSync(path.resolve('src/build/cert/prod/new_davdian_com.cer'), 'utf8'),
      // key: fs.readFileSync(path.resolve('src/build/cert/prod/new_davdian_com.key'), 'utf8'),
    }, app)
  };

  // 启动端口号=项目配置文件中的基础号段+当前开发环境num
  var port = _config2.default.pkg.port;
  if (_config2.default.env.num) {
    port.http += parseInt(_config2.default.env.num);
    port.https += parseInt(_config2.default.env.num);
  }

  // 监听端口
  server.http.listen(port.http, function () {
    _dvdServiceJsConsole2.default.log('http\u670D\u52A1\u5DF2\u542F\u52A8 ' + JSON.stringify(server.http.address()));
  });
  server.https.listen(port.https, function () {
    _dvdServiceJsConsole2.default.log('https\u670D\u52A1\u5DF2\u542F\u52A8 ' + JSON.stringify(server.https.address()));
  });
})();
'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressFavicon = require('express-favicon');

var _expressFavicon2 = _interopRequireDefault(_expressFavicon);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _htmlMinifier = require('html-minifier');

var _htmlMinifier2 = _interopRequireDefault(_htmlMinifier);

var _httpProxyMiddleware = require('http-proxy-middleware');

var _httpProxyMiddleware2 = _interopRequireDefault(_httpProxyMiddleware);

var _vueServerRenderer = require('vue-server-renderer');

var _dvdServiceJsConsole = require('../common/js/dvd-service-js-console/dvd-service-js-console');

var _dvdServiceJsConsole2 = _interopRequireDefault(_dvdServiceJsConsole);

var _util = require('./util.js');

var _util2 = _interopRequireDefault(_util);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _build_page_router = require('./build_page_router.js');

var _build_page_router2 = _interopRequireDefault(_build_page_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 如果本地开发，启动express服务之前编译路由，确保路由能够注册上
// 如果发布代码，路由已经在npm run server中编译好，不需要启动服务前编译，这样可以快速重启


// 内部模块
// import ajax from 'dvd-service-js-ajax';

// import bodyParser from 'body-parser';
// 第三方
if (!_config2.default.env.env) {
  (0, _build_page_router2.default)();
}

// 创建一个新的bundleRenderer，需要50ms~200ms，不必要每次请求都创建


// 自定义

// import Vue from 'vue';
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

// 压缩html，去除冗余空格
function minifyHtml(html) {
  return _htmlMinifier2.default.minify(html, {
    removeComments: true,
    collapseWhitespace: true,
    minifyJS: true,
    minifyCSS: true
  });
}

/************************************ 服务端启动任务 ************************************/
_dvdServiceJsConsole2.default.log('>>>>>>>>>>>>>>> \u670D\u52A1\u7AEF\u542F\u52A8\u4EFB\u52A1\u5F00\u59CB\u6267\u884C\u3002' + _util2.default.getNow());

// 全局服务
var app = (0, _express2.default)();

// // 全局开启gzip
// if (config.env.mini) {
//   app.use(compression());
// }

// 全局cookie解析，为req增加cookies字段，可以使用req.cookies.xxx获取单个cookie
app.use((0, _cookieParser2.default)());

// 设置全局response header
app.use(function (req, res, next) {
  res.set('Content-Type', 'text/html; charset=utf-8');
  next();
});

// 全局异常处理，服务端发生异常时将错误返回给页面
app.use(function (err, req, res, next) {
  _dvdServiceJsConsole2.default.error(err.stack, { req: req });
  res.status(500).send('服务器发生异常:\n' + err.stack);
});

// 处理favicon.ico请求
app.use((0, _expressFavicon2.default)(_path2.default.resolve('favicon.ico')));

// 代理client端接口请求，本地开发模式独有
if (!_config2.default.env.env) {
  app.use('/api/*', function (req, res, next) {

    // 不处理接口
    if (req.originalUrl.indexOf('/api/fe/getHybridConfig') === 0) {
      next();
      return;
    }

    var func = (0, _httpProxyMiddleware2.default)({
      // 请求后端，使用固定协议+协议默认端口
      // target: `${req.protocol}://${req.headers.host.split(':')[0]}`,
      target: 'https://' + req.headers.host.split(':')[0]
    });
    func(req, res, next);
  });
}

// // post请求body解析，application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// 预先创建渲染器
var bundleRenderer = _config2.default.env.env ? bundleRendererFactory() : null;

// 注册页面级路由，某些页面可能需要单独处理
// glob.sync(`${__dirname}/../../${config.path.router.replace('src/', 'dist/static/')}`).forEach(filePath => {
//   // 引入router
//   let router = require(filePath).default;
//
//   router = router.create({
//     bundleRenderer,
//     bundleRendererFactory: config.env.env ? null : bundleRendererFactory,   // 如果是本地开发模式，保证每次修改代码生效
//     minifyHtml,
//     config,
//   });
//
//   // 使用router
//   app.use(router);
//   console.log(`发现并注册router：${filePath}`);
// });

// 直接kill掉无用的请求
var invalidRouter = _express2.default.Router();
invalidRouter.get('/undefined', function (req, res, next) {
  _dvdServiceJsConsole2.default.log('express\u6536\u5230\u8BF7\u6C42\uFF1A' + req.url, { req: req });
  res.end();
  _dvdServiceJsConsole2.default.log('\u5DF2\u7ECF\u7ED3\u675F\u6389\u65E0\u7528\u7684\u8BF7\u6C42\uFF1A' + req.url, { req: req });
});
app.use(invalidRouter);

// 注册通用级get路由
var allGetRouter = _express2.default.Router();
allGetRouter.get('*', function (req, res, next) {

  _dvdServiceJsConsole2.default.log('express\u6536\u5230\u8BF7\u6C42', { req: req });

  var start = Date.now();

  // 保证每次修改代码生效（本地开发模式）
  if (!_config2.default.env.env) {
    bundleRenderer = bundleRendererFactory();
  }

  // 解决不正常的请求
  var maxTime = 60000;
  var timeout = setTimeout(function () {
    var msg = '\u8BF7\u6C42\u8D85\u8FC7' + maxTime / 1000 + 's\uFF0C\u5DF2\u4E3B\u52A8\u7ED3\u675F\uFF1A' + req.url;
    res.end(msg);
    _dvdServiceJsConsole2.default.log(msg, { req: req });
  }, maxTime);

  // 开始渲染
  bundleRenderer.renderToString({
    req: req,
    res: res,
    config: _config2.default
  }).then(function (html) {
    _dvdServiceJsConsole2.default.log('\u9875\u9762\u6E32\u67D3\u5B8C\u6210\uFF0C\u65F6\u95F4\u6D88\u8017\u4E3A\uFF1A' + (Date.now() - start), { req: req });

    // res.end(config.env.mini ? minifyHtml(html) : html);
    res.end(html);

    clearTimeout(timeout);
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

  /*// 流式渲染
   const stream = bundleRenderer.renderToStream({
   req,
   url: req.url,
   });
    stream.on('data', data => {
   res.write(data.toString());
   res.flush();
   });
    stream.on('end', () => {
   res.end();
   });
    stream.on('error', err => {
   console.error(err)
   res.end(`${err.message}<br>${err.stack.replace(/\n/g, '<br>')}`);
   });*/
});
app.use(allGetRouter);

/*// 注册通用级post路由作为借口代理，开发模式独有
 if(!config.env.env) {
 let allPostRouter = express.Router();
 allPostRouter.post('*', bodyParser.urlencoded({ extended: false }), (req, res, next) => {
 console.log(req.body)

 console.log(`${req.protocol}://${req.headers.host}${req.url}`);

 delete req.body.sign;

 ajax.send({
 url: `${req.protocol}://${req.headers.host}${req.url}`,
 method: 'post',
 responseType: 'json',
 data: req.body,
 }, {req, res}).then(response => {
 console.log(response);
 // res.set('Content-Type', 'text/html; charset=utf-8');
 res.end(JSON.stringify(response));
 }).catch(err => {
 console.error(err);
 });

 });
 app.use(allPostRouter);
 }*/

// 创建全局http(s)服务
var httpServer = _http2.default.createServer(app);

// 启动全局http(s)服务并监听
// httpServer.listen(config.env.env ? 6080 : 80, () => {
// httpServer.listen(6080, () => {

// 启动端口号=项目配置文件中的基础号段+当前开发环境num
var port = _config2.default.pkg.port;
if (_config2.default.env.env) {
  port += _config2.default.env.num ? parseInt(_config2.default.env.num) : 0;

  // 本地开发模式启动端口号=项目配置文件中的基础号段+1
} else {
  port += 1;
}
httpServer.listen(port, function () {
  _dvdServiceJsConsole2.default.log('http\u670D\u52A1\u5DF2\u542F\u52A8 ' + JSON.stringify(httpServer.address()));
});

/*// 服务端不用启动https
 if (!config.env.env) {
 // 创建全局http(s)服务，
 let httpsServer = https.createServer({
 key: fs.readFileSync(path.join(__dirname, '/../../cer/private.pem'), 'utf8'),
 cert: fs.readFileSync(path.join(__dirname, '/../../cer/file.crt'), 'utf8'),
 }, app);

 // httpsServer.listen(config.env.env ? 6443 : 443, () => {
 httpsServer.listen(6443, () => {
 console.log(`https服务已启动 ${JSON.stringify(httpsServer.address())}`);
 });
 }*/
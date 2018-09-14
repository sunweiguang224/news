// 第三方
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import favicon from 'express-favicon';
import cookieParser from 'cookie-parser';
import htmlMinifier from 'html-minifier';
import {createBundleRenderer} from 'vue-server-renderer';

// 内部模块
import console from '../common/js/dvd-service-js-console/dvd-service-js-console';

// 自定义
import util from './util.js';
import config from './config.js';
// import buildPageRouter from './build_page_router.js';

/*// 如果本地开发，启动express服务之前编译路由，确保路由能够注册上
 // 如果发布代码，路由已经在npm run server中编译好，不需要启动服务前编译，这样可以快速重启
 if (!config.env.env) {
 buildPageRouter();
 }*/

// 创建一个新的bundleRenderer，需要50ms~200ms，不必要每次请求都创建
function bundleRendererFactory() {
  let setting = {
    runInNewContext: 'once',  // 只实例化一次，且业务代码不会污染global
    template: fs.readFileSync(path.resolve(`src/build/template.html`), 'utf-8'), // （可选）页面模板
    inject: false,
  };

  // 指定html中加载的client端JS（发布代码时必须加载，保证功能完整性；本地开发时有则加载，只开发html和css时可以不用编译client端JS）
  if (config.env.env || fs.existsSync('dist/static/vue-ssr-client-manifest.json')) {
    // 必须用实时读取文件方式（require方式有缓存，开发模式下不能拿实时更新）
    setting.clientManifest = JSON.parse(fs.readFileSync('dist/static/vue-ssr-client-manifest.json', 'utf-8')); // （可选）客户端构建 manifest
  }

  return createBundleRenderer(JSON.parse(fs.readFileSync('dist/static/vue-ssr-server-bundle.json', 'utf-8')), setting);
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
console.log(`>>>>>>>>>>>>>>> 服务端启动任务开始执行。${util.getNow()}`);

// 全局服务
let app = express();

// 全局cookie解析，为req增加cookies字段，可以使用req.cookies.xxx获取单个cookie
app.use(cookieParser());

// 处理favicon.ico请求
app.use(favicon(path.resolve('favicon.ico')));

// 注册静态文件服务
app.use(express.static(path.resolve('dist'), {
  setHeaders(res) {
    res.set({
      // 'Content-Encoding': 'gzip',
    });
  },
}));

// 全局异常处理，服务端发生异常时将错误返回给页面
app.use((err, req, res, next) => {
  console.error(err.stack, {req});
  res.status(500).send('服务器发生异常:\n' + err.stack);
});

// 预先创建渲染器
let bundleRenderer = config.env.env ? bundleRendererFactory() : null;

if (!config.env.env) {

  app.use(express.Router().get(['*'], (req, res, next) => {
    if (req.protocol === 'https') {
      res.redirect(`http://${req.hostname}${req.url}`);
    } else {
      next();
    }
  }));

}

// html请求
app.use(express.Router().get(['/*.html', '/'], (req, res, next) => {

  console.log(`express收到html请求`, {req});

  let start = Date.now();

  // 保证每次修改代码生效（本地开发模式）
  if (!config.env.env) {
    bundleRenderer = bundleRendererFactory();
  }

  // html请求超时，60s
  let maxTime = 60000;
  let timeout = setTimeout(() => {
    let msg = `[${req.url}] 请求超时${maxTime / 1000}s，已主动结束。`;
    console.log(msg, {req});
    res.end(msg);
  }, maxTime);

  // 开始渲染
  bundleRenderer.renderToString({
    req,
    res,
    config,
  }).then(html => {

    // html response header
    res.set({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });

    // html response body
    res.end(html);

    clearTimeout(timeout);

    console.log(`页面渲染完成，时间消耗为：${Date.now() - start}`, {req});
  }).catch(err => {
    // 如果主动中断，不输出log
    if (err.message !== 'interrupt') {
      if (err.message === '404') {
        res.write(`404您请求的页面不存在`);
      } else {
        // res.end(`${err.message}<br>${err.stack.replace(/\n/g, '<br>')}`);
        res.write(`貌似出错了`);
      }
      res.end(`，即将跳转到店铺首页<script>setTimeout(function(){ location.href = '/'; }, 3000);</script>`);
      console.error(err, {req});
    }
  });

}));

// 启动服务
(function listen() {

  // 创建http(s)服务
  let server = {
    http: http.createServer(app),
    https: https.createServer({
      cert: fs.readFileSync(path.resolve('src/build/cert/file.crt'), 'utf8'),
      key: fs.readFileSync(path.resolve('src/build/cert/private.pem'), 'utf8'),
      // cert: fs.readFileSync(path.resolve('src/build/cert/prod/new_davdian_com.cer'), 'utf8'),
      // key: fs.readFileSync(path.resolve('src/build/cert/prod/new_davdian_com.key'), 'utf8'),
    }, app),
  };

  // 启动端口号=项目配置文件中的基础号段+当前开发环境num
  let port = config.pkg.port;
  if (config.env.num) {
    port.http += parseInt(config.env.num);
    port.https += parseInt(config.env.num);
  }

  // 监听端口
  server.http.listen(port.http, () => {
    console.log(`http服务已启动 ${JSON.stringify(server.http.address())}`);
  });
  server.https.listen(port.https, () => {
    console.log(`https服务已启动 ${JSON.stringify(server.https.address())}`);
  });

})();

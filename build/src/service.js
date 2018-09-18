// 第三方
import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import express from 'express';
import favicon from 'express-favicon';
import cookieParser from 'cookie-parser';
import {createBundleRenderer} from 'vue-server-renderer';

// 内部模块
import console from './module/dvd-service-js-console/dvd-service-js-console.js';

// 自定义
import util from './util.js';
import config from './config.js';

// 创建一个新的bundleRenderer，需要50ms~200ms，不必要每次请求都创建
let bundleRendererFactory = () => {

  let setting = {
    runInNewContext: 'once',  // 只实例化一次，且业务代码不会污染global
    template: fs.readFileSync(`${config.path.base}/../res/template.html`, 'utf-8'), // （可选）页面模板
    inject: false,
  };

  // 指定html中加载的client端JS（发布代码时必须加载，保证功能完整性；本地开发时有则加载，只开发html和css时可以不用编译client端JS）
  if (config.env.env || fs.existsSync('dist/vue-ssr-client-manifest.json')) {

    // 必须用实时读取文件方式（require方式有缓存，开发模式下不能拿实时更新）
    setting.clientManifest = JSON.parse(fs.readFileSync('dist/vue-ssr-client-manifest.json', 'utf-8')); // （可选）客户端构建 manifest
  }

  return createBundleRenderer(JSON.parse(fs.readFileSync('dist/vue-ssr-server-bundle.json', 'utf-8')), setting);

};

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
  res.status(500).send('服务器发生异常:\n' + err.stack);
  console.error(err.stack, {req});
});

// 预先创建渲染器
let bundleRenderer = config.env.env ? bundleRendererFactory() : null;

// 本地开发模式时，遇到https请求302成http请求
if (!config.env.env) {
  app.use(express.Router().get(['*'], (req, res, next) => {
    if (req.protocol === 'https') {
      res.redirect(`http://${req.hostname}${req.url}`);
    } else {
      next();
    }
  }));
}

// 所有html请求
app.use(express.Router().get(['/*.html', '/'], (req, res, next) => {

  console.log(`express收到html请求`, {req});

  let start = Date.now();

  // 本地开发模式时，每次遇到请求重新创建渲染上下文，保证每次修改代码生效
  if (!config.env.env) {
    bundleRenderer = bundleRendererFactory();
  }

  // 请求超时时间，30s
  let maxTime = 30000;
  let timeout = setTimeout(() => {
    let msg = `[${req.url}] 请求超时${maxTime / 1000}s，已主动结束。`;
    res.end(msg);
    console.log(msg, {req});
  }, maxTime);

  // 开始渲染
  bundleRenderer.renderToString({
    req,
    res,
    config,
  }).then(html => {

    // 设置html返回头
    res.set({
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache',
    });

    // 设置html返回体
    res.end(html);

    // 清除超时监控
    clearTimeout(timeout);

    console.log(`页面渲染完成，时间消耗为：${Date.now() - start}`, {req});

  }).catch(err => {

    // 如果非主动中断，提示用户出错
    if (err.message !== 'interrupt') {

      // 404错误，用户请求的页面没有在router.js中注册
      if (err.message === '404') {
        res.write(`404 您请求的页面不存在`);

        // 未知错误
      } else {
        res.write(`发生未知错误`);
      }

      // 页面展示错误类型
      res.end(`，即将跳转到店铺首页<script>setTimeout(function(){ location.href = '/'; }, 3000);</script>`);

      console.error(err, {req});
    }

  });

}));

// 启动服务
(function startListen() {

  // 创建http(s)服务
  let server = {
    http: http.createServer(app),
    https: https.createServer({
      cert: fs.readFileSync(path.resolve(`${config.path.base}/../res/ssl/file.crt`), 'utf8'),
      key: fs.readFileSync(path.resolve(`${config.path.base}/../res/ssl/private.pem`), 'utf8'),
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

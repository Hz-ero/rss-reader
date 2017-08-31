'use strict';
var express = require('express');
var timeout = require('connect-timeout');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var AV = require('leanengine');
var proxy = require('http-proxy-middleware')

var app = express();


/*
 *  设置代理 
 */
const url_ithome = '/rss/ithome'
const url_kr = '/rss/36kr'
const url_ifanr = '/rss/ifanr'

const option_ithome = {
    target: 'https://www.ithome.com',
    changeOrigin: true,
    pathRewrite: {
        '^/rss/ithome' : '/rss/'
    }
}
const option_kr = {
    target: 'http://36kr.com',
    changeOrigin: true,
    pathRewrite: {
        '^/rss/36kr' : '/feed'
    }
}
const option_ifanr = {
    target: 'https://www.ifanr.com',
    changeOrigin: true,
    pathRewrite: {
        '^/rss/ifanr' : '/feed'
    }
}
const proxy_ithome = proxy(option_ithome)
const proxy_kr = proxy(option_kr)
const proxy_ifanr = proxy(option_ifanr)

app.use(url_ithome, proxy_ithome)
app.use(url_kr, proxy_kr)
app.use(url_ifanr, proxy_ifanr)






// 设置模板引擎
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('build'));

// 设置默认超时时间
app.use(timeout('15s'));

// 加载云引擎中间件
app.use(AV.express());

app.enable('trust proxy');
// 需要重定向到 HTTPS 可去除下一行的注释。
// app.use(AV.Cloud.HttpsRedirect());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// 可以将一类的路由单独保存在一个文件中
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'))
})

app.use(function(req, res, next) {
  // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
  if (!res.headersSent) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

// error handlers
app.use(function(err, req, res, next) {
  if (req.timedout && req.headers.upgrade === 'websocket') {
    // 忽略 websocket 的超时
    return;
  }

  var statusCode = err.status || 500;
  if (statusCode === 500) {
    console.error(err.stack || err);
  }
  if (req.timedout) {
    console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
  }
  res.status(statusCode);
  // 默认不输出异常详情
  var error = {};
  if (app.get('env') === 'development') {
    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    error = err;
  }
  res.send({
    message: err.message,
    error: error
  });
});

AV.init({
  appId: process.env.LEANCLOUD_APP_ID || '10RauVJ62IqDQ8KsjqlW0Wm5-gzGzoHsz',
  appKey: process.env.LEANCLOUD_APP_KEY || 'rDKhgYDrV0nGBhyNNGy3BRov',
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '68pshELmfW1aBX5hPegc9CKu'
});

// // 如果不希望使用 masterKey 权限，可以将下面一行删除
// AV.Cloud.useMasterKey();

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || process.env.PORT || 3000);

app.listen(PORT, function (err) {
  console.log('Node app is running on port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error("Caught exception:", err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
  });
});

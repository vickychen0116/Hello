
var express = require('express');
var app     = express();
var port    = process.env.PORT || 3000;
var router = express.Router();

// 在每一個請求被處理之前都會執行的 middleware
router.use(function(req:string, res:any, next:any) {

  // 輸出記錄訊息至終端機
  //console.log(req.method, req.url);

  // 繼續路由處理
  next();
});

app.get('/', function(req:string, res:any) {
  res.send('Hello World!');
});
app.get('/api', function (req:string, res:any) {
  res.json({ message: "第一個API!" });
});

app.use('/', router);

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
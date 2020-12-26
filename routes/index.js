var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {
  const { headers } = req;
  const userAgent = headers['user-agent'];
  const x = req.headers;
  // res.set('Content-Type', 'text/html')
  // res.send(JSON.stringify(x));
  res.render('index', { title: 'Cloutflare', obj: JSON.stringify(x) });
});

module.exports = router;
/* GET home page. */

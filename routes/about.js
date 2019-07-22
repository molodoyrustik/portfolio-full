const express = require('express');
const router = express.Router();
const content = require('../content.json');

router.get('/', function (req, res) {
  let obj = {
    title: 'Главная страница',
    content
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/about', obj);
});

module.exports = router;
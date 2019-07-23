const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', function (req, res) {
  let obj = {
    title: 'Главная страница'
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/index', obj);
});


router.post('/signin', function (req, res, next) {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({flag: false, message: 'Укажите email и пароль!'});
    }
    req
      .logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json({flag: true, message: 'Пользователь найден'})
      });
  })(req, res, next);
});

router.post('/logout', function (req, res) {
  req.session.destroy();
  return res.json([{flag: true, message: 'Сессия удалена'}])
});

module.exports = router;
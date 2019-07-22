const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');
const content = require('../content.json');
// const User = require('../models/User');
const Post = require('../models/Post');
const Work = require('../models/Work');
const SkillGroup = require('../models/SkillGroup');
const Skill = require('../models/Skill');


router.get('/', async function (req, res) {
  let skillgroups = await SkillGroup.find();
  let skills = await Skill.find();
  let obj = {
    title: 'Admin page',
    content,
    skillgroups,
    skills
  };
  Object.assign(obj, req.app.locals.settings);
  res.render('pages/admin', obj);
});

router.post('/works', async function (req, res) {
  let form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), config.upload);
  form.parse(req, async function(err, fields, files) {
    if (err) {
      return res.json({ flag: false, message: 'Не удалось загрузить картинку' });
    }
    if (!fields.title || !fields.technologies || !fields.link) {
      return res.json({flag: false, message: 'Заполните все поля'});
    }
    fs.rename(files.photo.path, path.join(config.upload, files.photo.name), async function (err) {
      if (err) {
        fs.unlink(path.join(config.upload, files.photo.name));
        fs.rename(files.photo.path, files.photo.name);
      }
      
      const work = new Work({
        id: new mongoose.mongo.ObjectId(),
        title: fields.title,
        technologies: fields.technologies,
        imgUrl: `/upload/${files.photo.name}`,
        link: fields.link,
      })
      await work.save();
      res.json({ flag: true, message: 'Проект успешно добавлен' });
    });
  });
});

router.post('/posts', async function (req, res) {
  try {
    const { title, date, text } = req.body;
    if (!title || !date || !text) {
      return res.json({ flag: false, message: 'Заполните все поля' });
    }
    const id = new mongoose.mongo.ObjectId();
    const post = new Post({ id, title, date, text });
    await post.save();
    return res.json({ flag: true, message: 'Пост успешно добавлен' });
  } catch(err) {
    return res.json({ flag: false, message: 'Произошла ошибка' });
  }
});

router.post('/skillgroups', async function (req, res) {
  const { title } = req.body;
  if (!title) {
    return res.json({ flag: false, message: 'Заполните все поля' });
  }
  const skillGroup = new SkillGroup({
    id: new mongoose.mongo.ObjectId(),
    title,
  })

  await skillGroup.save();

  return res.json({ flag: true, message: 'Группа скилов успешно добавлен' });
});

router.post('/skills', async function (req, res) {
  const { name, groupId, value } = req.body;
  if (!name || !groupId || !value) {
    return res.json({ flag: false, message: 'Заполните все поля' });
  }
  const skill = new Skill({
    id: new mongoose.mongo.ObjectId(),
    name,
    groupId,
    value,
  })

  await skill.save();

  return res.json({ flag: true, message: 'Скилл успешно добавлен' });
});

router.put('/skills', async function (req, res) {
  const { data } = req.body;
  if (!data.length) {
    return res.json({ flag: false, message: 'Заполните все поля' });
  }

  data.forEach(async (elem, index) => {
    await Skill.updateOne({id: elem.id}, { value: elem.value });
  })
  
  return res.json({ flag: true, message: 'Скилл успешно добавлен' });
});




module.exports = router;
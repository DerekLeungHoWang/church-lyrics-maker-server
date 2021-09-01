// routes/things.js routing file
"use strict";
const express = require("express");
const lyricsController = require("../controllers/lyricsController");
const Lyrics = require('../models/Lyrics')
let router = express.Router();

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});

router.post('/add', lyricsController.addNewLyrics);
router.get('/getAll', lyricsController.findAllLyrics);
router.get('/:id', lyricsController.findLyricsById);
router.put('/:id', lyricsController.editLyricsById);
router.delete('/:id', lyricsController.deleteLyricsById);

module.exports = router;
const router = require('express').Router();
const { Model } = require('sequelize');
const { Project, User } = require('../models');

router.get('/', async (req,res) => {
    res.render('homepage')
});

module.exports = router
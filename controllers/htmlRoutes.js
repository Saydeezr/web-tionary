const router = require('express').Router();
const { Project, User } = require('../models');

router.get('/', (req,res) => {
    res.render('main')
})
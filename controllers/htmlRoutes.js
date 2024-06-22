const router = require('express').Router();
const { Model } = require('sequelize');
const { Project, User } = require('../models');

router.get('/', (req,res) => {
    res.render('homepage')
});
  
// directs signup page
router.get('/signup', (req, res) => {
   res.render('signup')
})

// directs login page
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router
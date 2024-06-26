const router = require('express').Router();
const { Model } = require('sequelize');
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

//directs to homepage
router.get('/', async (req,res) => {
    try{
        const blogData = await Blog.findAll({
            include: [{
                model: User,
                attributes: ['name'],
            },
        ],
        });

        const blogs = blogData((blogs) => blogData.get({plain: true}));
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(500).json(err);
    }
});
  
// directs to dashboard
router.get('/dashboard', withAuth, async (req,res) => {
    try{ 
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });

        const user = userData.get({ plain: true });
        res.render('dashboard', { 
            ...user,
            logged_in: true
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

// directs signup page
router.get('/signup', (req, res) => {
   res.render('signup')
});

// directs login page
router.get('/login', (req, res) => {
    if(req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router
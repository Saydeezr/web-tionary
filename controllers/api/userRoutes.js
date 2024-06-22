const router = require('express').Router();
const { User } = require('../../models');

// Route for signup
router.post('/signup', async (req, res) => {
    try{
        const userData = await User.create(req.body);
        console.log(userData)
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          res.status(200).json(userData);
    });
    } catch(err) {
        res.status(400).json(err);
    }
})

// Route for login
router.post('/login', async (req, res) => {
    const userData = await profile.findOne({ 
        where: { username: req.body.username },
    });

    if(!userData) {
        res.status(400).json({message: 'incorrect username/password'});
        return;
    }
    const passwordCheck = await userData.validatePassword(req.body.password)
    if(!passwordCheck){
        res.status(400).json({message: 'incorrect password'});
        return;
    } 
    req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        res.json({ user: userData, message:'You are logged in' })
    })
})

module.exports = router;
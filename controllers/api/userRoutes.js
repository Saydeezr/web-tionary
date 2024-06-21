const router = require('express').Router;
const { User } = require('../../models');
const { use } = require('../htmlRoutes');

router.post('/login', async (req, res) => {
    const userId = await profile.findOne({ 
        where: { username: req.body.username },
    });

    if(!userId) {
        res.status(400).json({message: 'incorrect username/password'});
        return;
    }
    const passwordCheck = await userId.validatePassword(req.body.password)
    if(!passwordCheck){
        res.status(400).json({message: 'incorrect password'});
        return;
    } 
    req.session.save(() => {
        req.session.user_id = userId.id;
        req.session.logged_in = true;
        res.json({ user: userId, message:'You are logged in' })
    })
})

module.exports = router;
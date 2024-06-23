const router = require('express').Router();

//imports routes from their files
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes')

//middleware to direct to path
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);

module.exports = router; 
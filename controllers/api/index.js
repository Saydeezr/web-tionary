const router = require('express').Router();

//imports routes from their files
const userRoutes = require('./userRoutes');
const blogRoutes = require('./blogRoutes');

//middleware to direct to path
router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);

module.exports = router; 
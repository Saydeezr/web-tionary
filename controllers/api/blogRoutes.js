const router = require('express').Router();
const { Blog } = require('../../models');


// route to get all blogs
router.get('/', async (req, res) => {
    try{
        const blogPosts = await Blog.findAll()
            res.status(200).json(blogPosts);
        } catch(err) {
            res.status(400).json(err)
        }
    });


// route to make a post
router.post('/', async (req, res) => {
    try{
        const newBlog = await Blog.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newBlog);
    } catch(err) {
        res.status(400).json(err);
    }
});

    
// route to get all blogs of one user 
router.get('/:id', async (req, res) => {
    try{
        const userId = req.params.userId;
        const userBlogs = await Blog.findAll({
            where: {
                userId: userId
            }
        });

        res.json(userBlogs);
    } catch(err) {
        res.status(400).json(err);
    }
});


module.exports = router;
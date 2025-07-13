const express = require('express')
const {body} = require('express-validator/check')

const router = express.Router()

const feedControllers = require('../controllers/feed')

// GET /feed/posts
router.get('/posts', feedControllers.getPosts)

// validation POST /feed/post
router.post('/post',[
    // check validation title
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
], feedControllers.postCreate)


router.getPost('/post/:postId', feedControllers.getPost)



module.exports = router
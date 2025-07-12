const express = require('express')

const router = express.Router()

const feedControllers = require('../controllers/feed')

// GET /feed/posts
router.get('/posts', feedControllers.getPosts)

router.post('/post', feedControllers.postCreate)





module.exports = router
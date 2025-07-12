exports.getPosts = (req,res) => {
    res.status(200).json({posts: [{title: "first Post", content:"This is te first posts!"}]})
}

// gunakan post untuk mengecek 
exports.postCreate = (req,res) => {
    const title = req.body.title
    const content = req.body.content
    // create post in db
    res.status(201).json({
        message: 'Post Created Success',
        post:{ id: new Date().toISOString(), title: title, content: content}
    })
}
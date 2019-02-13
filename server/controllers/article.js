const Article = require('../models/article')

class ArticleController {

  static create(req, res) {
    console.log(req.body)
    let image = ''
    if(req.file) {
      image = req.file.cloudStoragePublicUrl
    }
    console.log(req.file)
    Article.create({
      title: req.body.title,
      content : req.body.content,
      created_at : new Date(),
      image : image
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static findAll(req, res) {
    Article.find({})
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  }

  static update(req, res) {
    console.log(req.body)
    Article.findOneAndUpdate({
      _id : req.body.id
    }, {
      $set : {
        title: req.body.title,
        content : req.body.content,
        created_at : req.body.created_at
      }
    }, {
      new : true
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  }
  static patch(req, res) {
    Article.findOneAndUpdate({
      _id : req.body.id
    }, req.body, {
      new : true
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  }

  static delete(req, res) {
    console.log(req.body.id)
    Article.findOneAndDelete({
      _id : req.body.id
    })
    .then(data => {
      console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({error : 'internal server error'})
      console.log(err)
    })
  }
}

module.exports = ArticleController
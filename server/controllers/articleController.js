const Article = require('../models/article')

class ArticleController {

  static create(req, res) {
    let image = ''
    if(req.file) {
      image = req.file.cloudStoragePublicUrl
    }
    let tags = req.body.tags.split(' ')
    Article.create({
      title: req.body.title,
      content : req.body.content,
      description : req.body.description,
      created_at : new Date(),
      feature_image : image,
      author : req.userAuthenthic._id,
      tags : tags
    })
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static findWhere(req, res) {
    let regex = new RegExp(req.query.search, 'i')
    Article.find({
      $or : [
       { title : { $in : [regex]}},
        {content : { $in : [regex]}},
       { description : { $in : [regex]}},
       { tags : { $in : [regex]}},
      ]
    })
    .then(data=> {
      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }

  static findAll(req, res) {
    Article.find({
    }).sort([['created_at', 'descending']]).limit(10).populate('author')
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  }

  static findByUser(req, res) {
    Article.find({
      author : req.userAuthenthic._id
    }).sort([['created_at', 'descending']])
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
    let image = ''
    if(req.file) {
      image = req.file.cloudStoragePublicUrl
    }
    Article.findOneAndUpdate({
      _id : req.params.id
    }, {
      $set : {
        title: req.body.title,
        content : req.body.content,
        description : req.body.description,
        feature_image : image,
        author : req.userAuthentic._id
      }
    }, {
      new : true
    }).populate('author')
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
      _id : req.params.id
    }, req.body, {
      new : true
    }).populate('author')
    .then(data => {
      // console.log(data)
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  }

  static delete(req, res) {
    Article.findOneAndDelete({
      _id : req.params.id
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
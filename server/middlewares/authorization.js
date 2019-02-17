const Article = require('../models/article')

function authorization(req, res, next) {
  console.log(req.params)
  Article.findOne({
    _id : req.params.id
  })
  .then(data => {
    console.log(data)
    if(data.author == req.userAuthenthic._id) {
      next()
    } else {
      throw '400'
    }
  })
  .catch(err => {
    console.log(err)
    if(err == '400') {
      res.status(400).json({err : 'not authorized'})
    } else {
      res.status(500).json({err : 'internal server error'})
    }
  })
}

module.exports = authorization
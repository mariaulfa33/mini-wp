const router = require('express').Router()

const userController = require('../controllers/userController')
const articleController = require('../controllers/articleController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const images = require('../helpers/images')

router.post('/register', userController.create)
router.post('/login', userController.loginManual)
router.post('/logingoogle', userController.loginGoogle)
router.get('/articles', articleController.findAll) 
router.get('/search', articleController.findWhere)

router.use(authentication)
router.use('/articles/user', articleController.findByUser)
router.post('/articles',  images.multer.single('image') , images.sendUploadToGCS , articleController.create)

router.post('/uploadImage', images.multer.single('image') , images.sendUploadToGCS , (req, res) => {
  let image = ''
  if (req.file) {
    image = req.file.cloudStoragePublicUrl
  }
  res.status(201).json({imageUrl : image})
})

router.patch('/articles/:id',  authorization, articleController.patch)
router.delete('/articles/:id', authorization, articleController.delete)


module.exports = router
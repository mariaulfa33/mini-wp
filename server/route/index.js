const router = require('express').Router()
const articleController = require('../controllers/article')
const images = require('../helpers/image')

router.get('/articles', articleController.findAll)
router.post('/articles',  images.multer.single('image') , images.sendUploadToGCS , articleController.create)
router.put('/articles', articleController.update)
router.patch('/articles', articleController.patch)
router.delete('/articles', articleController.delete)
// router.post('/articles/upload',
//   images.multer.single('image'), 
//   images.sendUploadToGCS,
//   (req, res) => {
//     res.send({
//       status: 200,
//       message: 'Your file is successfully uploaded',
//       link: req.file.cloudStoragePublicUrl
//     })
//   })

module.exports = router
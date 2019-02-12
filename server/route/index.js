const router = require('express').Router()
const articleController = require('../controllers/article')

router.get('/articles', articleController.findAll)
router.post('/articles', articleController.create)
router.put('/articles', articleController.update)
router.patch('/articles', articleController.patch)
router.delete('/articles', articleController.delete)

module.exports = router
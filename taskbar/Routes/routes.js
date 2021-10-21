const express = require('express')
const router = express.Router()

const {findall,remove,findone,update,removeall,create} =require('./mail2')

router.post('/api/tasks/create',create)
router.get('/api/tasks/findall',findall)
router.delete('/api/tasks/remove/:id',remove)
router.delete('/api/tasks/removeall',removeall)
router.get('/api/tasks/findone/:id',findone)
router.patch('/api/tasks/update/:id',update)

module.exports = router

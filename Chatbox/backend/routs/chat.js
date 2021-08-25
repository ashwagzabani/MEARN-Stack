const express = require('express');
const router = express.Router();

const chatController = require('../cotrollers/chatController')

router.post('/', chatController.send)
router.get('/:id', chatController.chatListByUserId)
router.get('/list/:id', chatController.chatById)
router.patch('/:id', chatController.addNewMessageToExistChat)

module.exports = router;

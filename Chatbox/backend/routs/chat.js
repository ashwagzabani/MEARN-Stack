const express = require('express');
const router = express.Router();

const chatController = require('../cotrollers/chatController')

router.post('/', chatController.send)
router.get('/:id', chatController.chatListByUserId)
router.patch('/:id', chatController.addNewMessageToExistChat)
router.get('/list/:id', chatController.chatById)

module.exports = router;

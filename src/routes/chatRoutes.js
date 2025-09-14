// src/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const { handleChat, getSessionHistory, clearSession } = require('../controllers/chatController');

router.post('/', handleChat);
router.get('/:sessionId', getSessionHistory);
router.delete('/:sessionId/clear', clearSession);

module.exports = router;

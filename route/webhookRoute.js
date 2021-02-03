const express = require('express');
const router = express.Router();
const webhookController = require('../controller/webhookController.js');

router.post('/', webhookController.resolveIntent);

module.exports = router;

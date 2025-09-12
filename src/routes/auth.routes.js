const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/profile', authMiddleware, authCtrl.profile);

module.exports = router;

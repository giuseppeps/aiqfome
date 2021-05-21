const express = require('express');
const middleware = require('./middleware/isAdmin');
const UserController = require('./controller/UserController');
const router = express.Router();

router.post("/signup", UserController.register);
router.post("/login", UserController.login, middleware.isAdmin);
router.post("/logout", UserController.logout);
router.get("/post", UserController.post);
router.post("/insertPosts", UserController.insertPosts);
module.exports = router;
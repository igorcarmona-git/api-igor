const express = require('express');
const upload = require('../../infra/multer');
const uploadRoute = express.Router();

const verifyToken = require('../../middlewares/verifyToken');
const { UploadImageUser } = require('../../controllers/imageUserControl');

uploadRoute.post('/users/:username', verifyToken, upload.single('image'), UploadImageUser);

module.exports = uploadRoute
const express = require("express");
const router = express.Router();
const testDao = require("../dao/test.dao")

router.get('/', testDao.getAll);


module.exports = router;
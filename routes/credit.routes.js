const express = require("express");
const router = express.Router();
const creditDao = require("../dao/credit.dao")

router.get('/', creditDao.getAll);
router.get('/:id', creditDao.getById);
router.post('/', creditDao.create);
router.put('/:id', creditDao.update);
router.delete('/:id', creditDao.remove);

module.exports = router;
const express = require("express");
const router = express.Router();
const productDao = require("../dao/product.dao")

router.get('/', productDao.getAll);
router.get('/:id', productDao.getById);
router.post('/', productDao.create);
router.put('/:id', productDao.update);
router.delete('/:id', productDao.remove);

module.exports = router;
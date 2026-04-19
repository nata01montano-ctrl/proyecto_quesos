const express = require("express");
const router = express.Router();
const customerDao = require("../dao/customer.dao")

router.get('/', customerDao.getAll);
router.get('/:id', customerDao.getById);
router.post('/', customerDao.create);
router.put('/:id', customerDao.update);
router.delete('/:id', customerDao.remove);

module.exports = router;
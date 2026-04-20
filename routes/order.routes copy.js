const express = require("express");
const router = express.Router();
const orderDao = require("../dao/order.dao")

router.get('/', orderDao.getAll);
router.get('/:id', orderDao.getById);
router.post('/', orderDao.create);
router.put('/:id', orderDao.update);
router.delete('/:id', orderDao.remove);

module.exports = router;
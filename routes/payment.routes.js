const express = require("express");
const router = express.Router();
const paymentDao = require("../dao/payment.dao")

router.get('/', paymentDao.getAll);
router.get('/:id', paymentDao.getById);
router.post('/', paymentDao.create);
router.put('/:id', paymentDao.update);
router.delete('/:id', paymentDao.remove);

module.exports = router;
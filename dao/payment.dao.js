const db = require('../services/mysql.service');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM payment');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM payment WHERE idpayment = ?',
      [req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ error: 'No encontrado' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const { amount_paid, payment_date, method } = req.body;
    if(!amount_paid || !payment_date || !method) {
        res.status(400).json({ error: "Bad Request" });
    }
    const [result] = await db.query(
      'INSERT INTO payment (amount_paid, payment_date, method) VALUES (?, ?, ?)',
      [amount_paid, payment_date, method]
    );
    res.status(201).json({ id: result.insertId, amount_paid, payment_date, method });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { amount_paid, payment_date, method } = req.body;

    const [result] = await db.query(
      'UPDATE payment SET amount_paid=?, payment_date=?, method=? WHERE idpayment=?',
      [amount_paid, payment_date, method, req.params.id]
    );

    res.json({ message: "Pago actualizado" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {

    await db.query(
      'DELETE FROM customer WHERE id=?',
      [req.params.id]
    );

    res.json({ message: "Pago eliminado" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
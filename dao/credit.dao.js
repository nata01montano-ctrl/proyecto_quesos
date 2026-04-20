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
      'SELECT * FROM payment WHERE idcredit = ?',
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
    const { credit_amount, payment_deadline, credit_status, } = req.body;
    if(!credit_amount || !payment_deadline || !credit_status) {
        res.status(400).json({ error: "Bad Request" });
    }
    const [result] = await db.query(
      'INSERT INTO payment (credit_amount , payment_deadline, credit_status) VALUES (?, ?, ?, ?)',
      [credit_amount, payment_deadline, credit_status]
    );
    res.status(201).json({ id: result.insertId, credit_amount, payment_deadline, credit_status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { credit_amount, payment_deadline, credit_status } = req.body;

    const [result] = await db.query(
      'UPDATE payment SET credit_amount=?, payment_deadline=?, credit_status=?, phone=? WHERE idcredit=?',
      [credit_amount, payment_deadline, credit_status, req.params.id]
    );

    res.json({ message: "Crédito actualizado" });

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
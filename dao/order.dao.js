const db = require('../services/mysql.service');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM customer');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM customer WHERE idorder = ?',
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
    const { order_date, total, quantity } = req.body;
    if(!order_date || !total || !quantity) {
        res.status(400).json({ error: "Bad Request" });
    }
    const [result] = await db.query(
      'INSERT INTO customer (order_date, total, quantity) VALUES (?, ?, ?)',
      [order_date, total, quantity]
    );
    res.status(201).json({ id: result.insertId, order_date, total, quantity });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { order_date, total, quantity,   } = req.body;

    const [result] = await db.query(
      'UPDATE customer SET order_date=?, total=?, quantity=? WHERE idorder=?',
      [order_date, total, quantity, req.params.id]
    );

    res.json({ message: "Pedido actualizado" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {

    await db.query(
      'DELETE FROM customer WHERE idcustomer = ?',
      [req.params.id]
    );

    res.json({ message: "Pedido eliminado" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
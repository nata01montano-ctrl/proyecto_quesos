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
      'SELECT * FROM customer WHERE id = ?',
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
    const { name, business_name, address, phone } = req.body;
    if(!name || !business_name || !address || !phone) {
        res.status(400).json({ error: "Bad Request" });
    }
    const [result] = await db.query(
      'INSERT INTO customer (name, business_name, address, phone) VALUES (?, ?, ?, ?)',
      [name, business_name, address, phone]
    );
    res.status(201).json({ id: result.insertId, name, business_name, address, phone });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const update = async (req, res) => {
  try {
    const { name, business_name, address, phone } = req.body;

    const [result] = await db.query(
      'UPDATE customer SET name=?, business_name=?, address=?, phone=? WHERE id=?',
      [name, business_name, address, phone, req.params.id]
    );

    res.json({ message: "Cliente actualizado" });

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

    res.json({ message: "Cliente eliminado" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
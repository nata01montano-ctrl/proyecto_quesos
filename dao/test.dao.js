const db = require('../services/mysql.service');

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM product');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = { getAll };
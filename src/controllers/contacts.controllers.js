import { pool } from "../db.js";

export const getContacts = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM contacts");
    res.json(rows);
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.toString(),
    });
  }
};

export const getContact = async (req, res) => {
  try {
    const [row] = await pool.query("SELECT * FROM contacts WHERE id = ?", [
      req.params.id,
    ]);
    if (row.length <= 0)
      return res.status(404).json({
        message: "Contact not found",
      });
    res.json(row);
  } catch (e) {
    res.status(500).json({
      error: true,
      message: e.toString(),
    });
  }
};

export const createContact = async (req, res) => {
  try {
    const { fullname, phone, email } = req.body;
    const [rows] = await pool.query(
      "INSERT INTO contacts(fullname, phone, email) VALUES (?,?,?)",
      [fullname, phone, email]
    );

    res.send({
      id: rows.insertId,
      fullname,
      phone,
      email,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.toString(),
    });
  }
};

export const updateContact = async (req, res) => {
  try {
    const id = req.params.id;
    const { fullname, phone, email } = req.body;
    const [rows] = await pool.query(
      "UPDATE contacts SET fullname = IFNULL(?, fullname), phone = IFNULL(?, phone), email = IFNULL(?, email) WHERE id = ?",
      [fullname, phone, email, id]
    );

    if (rows.affectedRows === 0)
      return res.status(404).json({
        message: "Contact not found",
      });

    const result = await pool.query("SELECT * FROM contacts WHERE id = ?", [
      id,
    ]);
    res.json(result[0]);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.toString(),
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const [rows] = await pool.query("DELETE FROM contacts WHERE id =?", [
      req.params.id,
    ]);

    if (rows.affectedRows < 1) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.send({
      id: rows.insertId,
      fullname: "",
      phone: "",
      email: "",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.toString(),
    });
  }
};

import bcryptjs from 'bcryptjs';
import { pool } from './db.jsx';

const User = {};

// Create a new user
User.create = async (username, email, password) => {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, is_admin, created_at',
      [username, email, hashedPassword]
    );

    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Find user by email
User.findByEmail = async (email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Find user by username
User.findByUsername = async (username) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Find user by id
User.findById = async (id) => {
  try {
    const result = await pool.query(
      'SELECT id, username, email, is_admin, created_at, updated_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

// Check if user exists
User.userExists = async (email, username) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1 OR username = $2',
      [email, username]
    );
    return result.rows.length > 0;
  } catch (error) {
    throw error;
  }
};

// Compare passwords
User.comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcryptjs.compare(enteredPassword, hashedPassword);
};

export default User;

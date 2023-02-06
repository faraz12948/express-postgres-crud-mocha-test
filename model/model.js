const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'faraz',
    password: 'faraz12948fab',
    database: 'employee'
    // connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
});
client.connect();
// const Pool = require('pg').Pool
// var pool = new Pool({
//     host: 'localhost',
//     user: 'faraz',
//     password: 'faraz12948fab',
//     port: '5432',
//     database: 'employee'
// });

class Record {
    static async get() {

        const query = 'SELECT * FROM users_v2';
        const res = await client.query(query);
        return res.rows;
    }

    static async create(data) {
        const { name, email } = data;
        const query = 'INSERT INTO users_v2 (name, email) VALUES ($1, $2) RETURNING *';
        const res = await client.query(query, [name, email]);
        return res.rows[0];
    }

    static async retrieve(id) {
        const query = 'SELECT * FROM users_v2 WHERE id = $1';
        const res = await client.query(query, [id]);
        return res.rows[0];

    }

    static async update(id, data) {
        const { name, email } = data;
        const query = 'UPDATE users_v2 SET name = $1, email = $2 WHERE id = $3 RETURNING *';
        const res = await client.query(query, [name, email, id]);
        return res.rows[0];
    }

    static async delete(id) {
        const query = 'DELETE FROM users_v2 WHERE id = $1 RETURNING *';
        const res = await client.query(query, [id]);
        return res.rows[0];
    }
}

module.exports = Record;

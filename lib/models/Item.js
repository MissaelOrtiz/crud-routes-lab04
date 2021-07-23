import pool from '../utils/pool';

export default class Item {
    id;
    name;
    type;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.type = row.type;
    }

    static async insert({ name, type }) {
        const { rows } = await pool.query(
            'INSERT INTO items (name, type) VALUES ($1, $2) RETURNING *', [name, type]
        );
        return new Item(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM items WHERE id=$1', [id]);
        
        return new Item(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM items');

        return rows.map((row) => new Item(row));
    }
}
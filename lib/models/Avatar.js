import pool from '../utils/pool';

export default class Avatar {
    id;
    name;
    type;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.element = row.element;
    }

    static async insert({ name, element }) {
        const { rows } = await pool.query(
            'INSERT INTO avatars (name, element) VALUES ($1, $2) RETURNING *', [name, element]
        );
        return new Avatar(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM avatars WHERE id=$1', [id]);
        
        return new Avatar(rows[0]);
    }
}
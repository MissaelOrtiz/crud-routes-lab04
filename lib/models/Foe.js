import pool from '../utils/pool';

export default class Foe {
    id;
    name;
    level;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.level = row.level;
    }

    static async insert({ name, level }) {
        const { rows } = await pool.query(
            'INSERT INTO foes (name, level) VALUES ($1, $2) RETURNING *', 
            [name, level]
        );
    }
}
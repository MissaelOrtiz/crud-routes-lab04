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
        return new Foe(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM foes WHERE id=$1', [id]);

        return new Foe(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM foes');

        return rows.map((row) => new Foe(row));
    }
    
    static async updateById(id, {name, level}) {
        const existingFoe = await Foe.getById(id);
        const newName = name ?? existingFoe.name;
        const newLevel = level ?? existingFoe.level;

        const { rows } = await pool.query('UPDATE foes SET name=$1, level=$2 WHERE id=$3 RETURNING *', 
        [newName, newLevel, id]);
        return new Foe(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query('DELETE FROM foes WHERE id=$1 RETURNING *', [id]);

        return new Foe(rows[0]);
    }
}
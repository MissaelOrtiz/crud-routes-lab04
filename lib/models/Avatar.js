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

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM avatars');

        return rows.map((row) => new Avatar(row));
    }

    static async updateById(id , {name, element}) {
        const existingAvatar = await Avatar.getById(id);
        const newName = name ?? existingAvatar.name;
        const newElement = element ?? existingAvatar.element;
        
        const { rows } = await pool.query('UPDATE avatars SET name=$1, element=$2 WHERE id=$3 RETURNING *',
        [newName, newElement, id]);
        return new Avatar(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query('DELETE FROM avatars WHERE id=$1 RETURNING *', [id]);

        return new Avatar(rows[0]);
    }
}
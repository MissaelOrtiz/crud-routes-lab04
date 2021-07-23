import pool from '../utils/pool';

export default class Movie {
    id;
    name;
    genre;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.genre = row.genre;
    }

    static async insert({ name, genre }) {
        const { rows } = await pool.query(
            'INSERT INTO movies (name, genre) VALUES ($1, $2) RETURNING *', [name, genre]
        );
        return new Movie(rows[0]);
    }
}
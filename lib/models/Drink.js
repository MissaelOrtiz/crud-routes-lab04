import pool from '../utils/pool';

export default class Drink {
    id;
    name;
    flavor;
    adult;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.flavor = row.flavor;
        this.adult = row.adult;
    }

    static async insert({ name, flavor, adult}) {
        const { rows } = await pool.query('INSERT INTO drinks (name, flavor, adult) VALUES ($1, $2, $3) RETURNING *', [name, flavor, adult]);
        return new Drink(rows[0]);
    }

    static async getById(id) {
        const { rows } = await pool.query('SELECT * FROM drinks WHERE id=$1', [id]);

        return new Drink(rows[0]);
    }

    static async getAll() {
        const { rows } = await pool.query('SELECT * FROM drink');

        return rows.map((row) => new Foe(row));
    }
}
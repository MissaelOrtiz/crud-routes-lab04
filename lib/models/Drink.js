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
        const { rows } = await pool.query('SELECT * FROM drinks');

        return rows.map((row) => new Drink(row));
    }

    static async updateById(id, {name, flavor, adult}) {
        const existingDrink = await Drink.getById(id);
        const newName = name ?? existingDrink.name;
        const newFlavor = flavor ?? existingDrink.flavor;
        const newAdult = adult ?? existingDrink.adult;

        const { rows } = await pool.query('UPDATE drinks SET name=$1, flavor=$2, adult=$3 WHERE id=$4 RETURNING *', 
        [newName, newFlavor, newAdult, id]);
        return new Drink(rows[0]);
    }

    static async deleteById(id) {
        const { rows } = await pool.query('DELETE FROM drinks WHERE id=$1 RETURNING *', [id]);

        return new Foe(rows[0]);
    }
}
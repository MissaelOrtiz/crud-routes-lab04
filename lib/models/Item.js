import pool from '../utils/pool';

export default class Foe {
    id;
    name;
    type;

    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.type = row.type;
    }
}
// import { db } from "../utils/client-db";

import { db } from "../utils/auroradb";
const defaultFields = {
	idField: "id",
	voidField: "pvVoid",
};

export default class Database {
	constructor(tableName, fields = {}) {
		const tempFields = Object.assign({}, defaultFields, fields);
		this.idField = tempFields.idField;
		this.voidField = tempFields.voidField;
		this.tableName = tableName;
	}

	async getAll() {
		return db.raw(
			`SELECT * FROM ${this.tableName} WHERE ${this.voidField} = false ; `
		);
	}

	async getOne(id) {
		let dbResponse = await db.raw(
			`SELECT * FROM ${this.tableName} WHERE ${
				this.idField
			} = '${String(id)}'`
		);
		return dbResponse.records[0]
	}

	async create(body) {
		let dbResponse = db(this.tableName).insert(body);
		return dbResponse.then(rows => {
			item[idField] = rows[0];
			return item;
		});
	}

	async update(body, id) {
		let resp = await db(this.tableName)
			.where({ id })
			.update({ ...body });
		console.log(resp)
		return resp 
	}

	async delete(id) {
		return await db.raw(
			`UPDATE ${this.tableName} SET ${this.voidField} = true  WHERE ${
				this.idField
			} = '${String(id)}' ;`
		);
	}
}

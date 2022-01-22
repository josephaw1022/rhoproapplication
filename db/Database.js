// import { db } from "../utils/client-db";
const knexDataApiClient = require("knex-data-api-client");

export const db = require("knex")({
	client: knexDataApiClient,
	connection: {
		secretArn: process.env.SECRET_ARN,
		resourceArn: process.env.CLUSTER_ARN, // Required
		database: process.env.DB_NAME,
		region: process.env.REGION_APP,
	},
});

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
		let dbResponse = await db.raw(
			`SELECT * FROM ${this.tableName} WHERE ${this.voidField} = false ; `
		);
		return dbResponse.records;
	}

	async getOne(id) {
		let dbResponse = await db.raw(
			`SELECT * FROM ${this.tableName} WHERE ${
				this.idField
			} = '${String(id)}'`
		);
		return dbResponse.records[0];
	}

	async create(body) {
		
	}

	async update(data, id) {
		if (data["id"]) delete data.id;

		let sqlString = "";
		for (let key in data) {
			let objectValue = ` ${key} =${handleType(data[key])}`;
			sqlString += objectValue;
		}

		let sqlString2 = `UPDATE ${this.tableName} SET ${popString(
			sqlString.trim()
		)} WHERE ${String(this.idField)} = '${String(id)}' ;`;

		return db.raw(sqlString2);
	}

	async delete(id) {
		return await db.raw(
			`UPDATE ${this.tableName} SET ${this.voidField} = true  WHERE ${
				this.idField
			} = '${String(id)}' ;`
		);
	}

	async executeSQL(sqlStatement) {
		return await db.raw(sqlStatement);
	}
}

function popString(string) {
	return string.substring(0, string.length - 1);
}

function handleType(variable) {
	return typeof variable == "string"
		? ` '${variable}',`
		: ` ${variable} ,`;
}

// import { db } from "../utils/client-db";
const knexDataApiClient = require("knex-data-api-client");
import AWS from "aws-sdk";

AWS.config.update({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_APP,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP,
	},
});

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
	#handleType(variable) {
		return typeof variable == "string"
			? ` '${variable}',`
			: ` ${variable} ,`;
	}

	#popString(string) {
		return string.substring(0, string.length - 1);
	}

	async getAll() {
		console.log("request:\tgetall");
		let dbResponse = await db.raw(
			`SELECT * FROM ${this.tableName} WHERE ${this.voidField} = false ; `
		);
		return dbResponse.records;
	}

	async getOne(id) {
		console.log("request:\tgetone");
		let dbResponse = await db.raw(
			`SELECT * FROM ${this.tableName} WHERE ${
				this.idField
			} = '${String(id)}'`
		);
		return dbResponse.records[0];
	}

	async create(data) {
		console.log("request:\tcreate");

		let valueString = "";
		Object.keys(data).map(item => {
			valueString += ` ${this.#handleType(data[item])}`;
		});

		valueString = this.#popString(valueString);

		let fieldNames = `( `;
		Object.keys(data).map(item => {
			fieldNames += ` ${item},`;
		});
		fieldNames = this.#popString(fieldNames);
		fieldNames += " )";

		valueString = `( ${valueString} ) ;`;

		let sqlString = `INSERT INTO ${this.tableName} ${fieldNames} VALUES ${valueString}`;

		let dbResponse = await db.raw(sqlString);

		return dbResponse;
	}

	async update(data, id) {
		console.log("request:\tupdate");
		if (data["id"]) delete data.id;

		let sqlString = "";
		for (let key in data) {
			let objectValue = ` ${key} =${this.#handleType(data[key])}`;
			sqlString += objectValue;
		}

		let sqlString2 = `UPDATE ${this.tableName} SET ${this.#popString(
			sqlString.trim()
		)} WHERE ${String(this.idField)} = '${String(id)}' ;`;

		return db.raw(sqlString2);
	}

	async delete(id) {
		console.log("request:\tdelete");
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

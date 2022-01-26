// import { db } from "../utils/client-db";
import AWS from "aws-sdk";
import { v4 as uuid } from "uuid";
const knexDataApiClient = require("knex-aurora-data-api-client");

AWS.config.update({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_APP,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP,
	},
});

const db = require("knex")({
	client: knexDataApiClient.postgres,
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

	#handleType = variable =>
		typeof variable == "string"
			? ` '${variable}',`
			: ` ${variable} ,`;

	#popString = stringVariable =>
		stringVariable.substring(0, stringVariable.length - 1);

	#createID = () => String(uuid());

	#removeEssentials = objectVariable => {
		let data = objectVariable;
		if (["id"]) delete data.id;
		if (data["create_date"]) delete data.create_date;
		if (data["update_date"]) delete data.update_date;
		if (data["deleted"]) delete data.deleted;
		return data;
	};

	#addEssentials = objectValue => {
		let data = objectValue;
		data.id = this.#createID();
		data.create_date = Date();
		data.update_date = Date();
		data.deleted = false;
		return data;
	};

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
		console.log("request:\tcreate", data);

		// Create the uuid for data
		let createObject = this.#removeEssentials(data);
		createObject = this.#addEssentials(createObject);

		let valueString = "";
		Object.keys(createObject).map(item => {
			valueString += ` ${this.#handleType(createObject[item])}`;
		});

		valueString = this.#popString(valueString);

		valueString = `( ${valueString} ) ;`;

		let fieldNames = `( `;
		Object.keys(createObject).map(item => {
			fieldNames += ` ${item},`;
		});

		fieldNames = this.#popString(fieldNames);
		fieldNames += " )";

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

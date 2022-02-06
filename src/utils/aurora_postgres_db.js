const knexDataApiClient = require("knex-aurora-data-api-client");
const AWS = require('aws-sdk')
const {v4:uuid} = require('uuid')
const moment = require('moment')

AWS.config.update({
	region: "us-east-1",
	credentials: {
		accessKeyId: String(process.env.AWS_AK_APP),
		secretAccessKey: String(process.env.AWS_SK_APP),
	},
});


const db = require("knex")({
  client: knexDataApiClient.postgres,
  connection: {
    secretArn: String(process.env.SECRET_ARN),
    resourceArn: String(process.env.CLUSTER_ARN), // Required
    database: String(process.env.DB_NAME),
    region: String(process.env.REGION_APP),
  },
});
const defaultFields = {
	idField: "id",
	voidField: "deleted",
	getField:"id", 
};

export default class Database {
	constructor(tableName, fields = {}) {
		const tempFields = Object.assign({}, defaultFields, fields);
		this.idField = tempFields.idField;
		this.voidField = tempFields.voidField;
		this.getField = tempFields.getField ; 
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

	#formatDateTimeForDB(datestr) {
		if (!datestr) return datestr;
		let date =  moment.utc(datestr, moment.ISO_8601);
		return String(date.format("YYYY-MM-DD HH:mm:ss"));
	  }

	#addEssentials = objectValue => {
		let data = objectValue;
		data.id = this.#createID();
		data.create_date = this.#formatDateTimeForDB(moment())
		data.update_date = this.#formatDateTimeForDB(moment())
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
				this.getField
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
		// console.log(sqlString) 
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



function handleResponse(rdsResponse){
	console.clear();
	console.log("\n\n\nResponse:\t", rdsResponse, "\n\n\n\n\n\n");
	return rdsResponse;
  }
  
  function handleError(rdsErrorResponse){
	console.clear();
	console.log("\n\n\nError:\t", rdsErrorResponse, "\n\n\n\n\n\n");
	return rdsErrorResponse;
  }
  
  export async function handleSQLRequest(sqlString) {
	let response = await db.raw(sqlString)
	  .then(response => response.records)
	  .then(records => handleResponse(records))
	  .catch(error => handleError(error))
	return response;
  }
  
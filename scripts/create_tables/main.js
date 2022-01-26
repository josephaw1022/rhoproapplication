const DbTable = require("./Table");
const Fields = require("./table_constants");
const AWS = require("aws-sdk");
const knexDataApiClient = require("knex-aurora-data-api-client");

let REGION_APP = "us-east-1";
let CLUSTER_ARN =
	"arn:aws:rds:us-east-1:576806815502:cluster:rhoprodb";
let SECRET_ARN =
	"arn:aws:secretsmanager:us-east-1:576806815502:secret:rds-db-credentials/cluster-4TUDEQVHZ3GBUVA4S3PPZKE6SU/josephaw1022-OdBYOJ";
let AWS_ACCESS_KEY_APP = "AKIAYMTC5Q4HB2PEDF7H";
let AWS_SECRET_ACCESS_KEY_APP =
	"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";
let DB_NAME = "backend";

const db = require("knex")({
	client: knexDataApiClient.postgres,
	connection: {
		secretArn: SECRET_ARN,
		resourceArn: CLUSTER_ARN, // Required
		database: DB_NAME,
		region: REGION_APP,
	},
});

AWS.config.update({
	region: "us-east-1",

	credentials: {
		accessKeyId: AWS_ACCESS_KEY_APP,
		secretAccessKey: AWS_SECRET_ACCESS_KEY_APP,
	},
});

const accountDB = new DbTable("accounts", Fields.account_fields);

async function create_table() {
	try {
		let response = await db.raw(accountDB.createSQL());
		console.clear();
		console.log(response);
	} catch (error) {
		console.clear();
		console.log(error);
	}
}

async function delete_table() {
	await db
		.raw(accountDB.deleteTable())
		.then(response => response)
		.then(response => console.log(response))
		.catch(error => console.log(error));
}

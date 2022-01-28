require("dotenv").config();
const AWS = require("aws-sdk");
const knexDataApiClient = require("knex-aurora-data-api-client");

const DbTable = require("./Table");
const Fields = require("./table_constants");

AWS.config.update({
  region: "us-east-1",

  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_APP),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY_APP),
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

const createTable = async dbTableInstance => {
  await db
    .raw(dbTableInstance.createTableSQL())
    .then(response => DbTable.handleResponse(response))
    .catch(error => DbTable.handleError(error));
};

const deleteTable = async dbTableInstance => {
  await db
    .raw(dbTableInstance.deleteTable())
    .then(response => DbTable.handleResponse(response))
    .catch(error => DbTable.handleError(error));
};

const accountDB = new DbTable("accounts", Fields.account_fields);

// createTable(accountDB);
deleteTable(accountDB)

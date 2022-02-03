require("dotenv").config();
const AWS = require("aws-sdk");
const knexDataApiClient = require("knex-aurora-data-api-client");

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

async function handleSQLRequest(sqlString) {
  let response = await db.raw(sqlString)
    .then(response => response.records)
    .then(records => handleResponse(records))
    .catch(error => handleError(error))
  return response;
}




module.exports = { db , handleSQLRequest} 


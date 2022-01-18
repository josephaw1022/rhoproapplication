const knexDataApiClient = require("knex-aurora-data-api-client");

import AWS from "aws-sdk";

AWS.config.update({
	region: "us-east-1",
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_APP,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_APP,
	},
});


export const db = require("knex")({
	client: knexDataApiClient.postgres,
	connection: {
		secretArn: process.env.SECRET_ARN,
		resourceArn: process.env.CLUSTER_ARN, // Required
		database: process.env.DB_NAME,
		region: process.env.REGION_APP,
	},
});

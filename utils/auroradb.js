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

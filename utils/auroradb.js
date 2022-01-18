const knexDataApiClient = require("knex-aurora-data-api-client");

export const db = require("knex")({
	client: knexDataApiClient.postgres,
	connection: {
		secretArn: process.env.SECRET_ARN,
		resourceArn: process.env.CLUSTER_ARN, // Required
		database: process.env.DB_NAME,
		region: process.env.REGION_APP,
	},
});

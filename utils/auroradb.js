const knexDataApiClient = require("knex-aurora-data-api-client");

export const db = require("knex")({
	client: knexDataApiClient.postgres,
	connection: {
		secretArn:
			"arn:aws:secretsmanager:us-east-1:576806815502:secret:rds-db-credentials/cluster-4TUDEQVHZ3GBUVA4S3PPZKE6SU/josephaw1022-OdBYOJ", // Required
		resourceArn:
			"arn:aws:rds:us-east-1:576806815502:cluster:rhoprodb", // Required
		database: "backend",
		region: "us-east-1",
	},
});

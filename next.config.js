module.exports = {
	reactStrictMode: true,

	env: {
		REGION_APP: "us-east-1",
		CLUSTER_ARN:
			"arn:aws:rds:us-east-1:576806815502:cluster:rhoprodb",
		SECRET_ARN:
			"arn:aws:secretsmanager:us-east-1:576806815502:secret:rds-db-credentials/cluster-4TUDEQVHZ3GBUVA4S3PPZKE6SU/josephaw1022-OdBYOJ",
		AWS_ACCESS_KEY_APP: "AKIAYMTC5Q4HB2PEDF7H",
		AWS_SECRET_ACCESS_KEY_APP:
			"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",
		DB_NAME: "backend",
	},
	swcMinify: true,
};

module.exports = {
  env: {
    REGION_APP: "us-east-1",
    CLUSTER_ARN: String(process.env.CLUSTER_ARN),
    SECRET_ARN: String(process.env.SECRET_ARN),
    AWS_AK_APP: String(process.env.AWS_AK_APP),
    AWS_SK_APP: String(
      process.env.AWS_SK_APP
    ),
    DB_NAME: String(process.env.DB_NAME),
  },
};

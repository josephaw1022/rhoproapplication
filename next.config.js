module.exports = {
  env: {
    REGION_APP: "us-east-1",
    CLUSTER_ARN: String(process.env.CLUSTER_ARN),
    SECRET_ARN: String(process.env.SECRET_ARN),
    AWS_ACCESS_KEY_APP: String(process.env.AWS_ACCESS_KEY_APP),
    AWS_SECRET_ACCESS_KEY_APP: String(
      process.env.AWS_SECRET_ACCESS_KEY_APP
    ),
    DB_NAME: String(process.env.DB_NAME),
  },
  swcMinify: true,
};

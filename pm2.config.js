module.exports = {
  apps: [
    {
      name: "trend-io",
      script: "ts-node",
      args: "trend.io.ts",
      interpreter: "none",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "checkkar",
      script: "ts-node",
      args: "checkkar.ts",
      interpreter: "none",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "bhaitalk",
      script: "ts-node",
      args: "bhaitalk.ts",
      interpreter: "none",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "all",
      script: "ts-node",
      args: "allservers.ts",
      interpreter: "none",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

// pm2 start pm2.config.js --only trend-io
// pm2 start pm2.config.js --only checkkar
// pm2 start pm2.config.js --only bhaitalk
// pm2 start pm2.config.js --only all

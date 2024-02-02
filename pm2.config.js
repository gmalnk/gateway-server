module.exports = {
  apps: [
    {
      name: "trend-io",
      script: "node_modules/nodemon/bin/nodemon.js",
      args: "--exec ts-node trend.io.ts",
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
      script: "node_modules/nodemon/bin/nodemon.js",
      args: "--exec ts-node checkkar.ts",
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
      script: "node_modules/nodemon/bin/nodemon.js",
      args: "--exec ts-node bhaitalk.ts",
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
      script: "node_modules/nodemon/bin/nodemon.js",
      args: "--exec ts-node allservers.ts",
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

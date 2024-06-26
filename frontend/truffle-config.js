module.exports = {
  contracts_build_directory: "./public/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.19", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
  migrations: {
    // Specify the migrations directory and use ts-node for TypeScript migrations
    directory: "./migrations",
    // migrator: {
    //   path: "./node_modules/.bin/ts-node", // Path to ts-node binary
    // },
  },
};

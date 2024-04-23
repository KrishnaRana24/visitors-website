interface Artifacts {
  require(name: string): any;
}

declare const artifacts: Artifacts;

const VisitorMigration = artifacts.require("VisitorAuth");

module.exports = function (deployer: any) {
  deployer.deploy(VisitorMigration);
};

// let instance;
// VisitorAuth.deployed()
//   .then(function (contractInstance) {
//     instance = contractInstance;
//     return instance.registerVisitor();
//   })
//   .then(function (result) {
//     console.log(result.getVisitor());
//   });

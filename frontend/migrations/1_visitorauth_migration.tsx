interface Artifacts {
  require(name: string): any;
}

declare const artifacts: Artifacts;

const VisitorMigration = artifacts.require("VisitorAuth");

module.exports = function (deployer: any) {
  deployer.deploy(VisitorMigration);
};

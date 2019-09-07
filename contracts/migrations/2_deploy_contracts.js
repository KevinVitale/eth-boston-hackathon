const TACX = artifacts.require("TACX");

module.exports = function(deployer) {
  deployer.deploy(TACX, 400000);
};

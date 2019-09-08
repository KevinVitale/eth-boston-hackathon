const LOGN = artifacts.require("LOGN");

module.exports = function(deployer) {
  deployer.deploy(LOGN, 400000);
};

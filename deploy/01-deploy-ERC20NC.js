const { deployments, ethers, network } = require("hardhat");

module.exports = async ({ deployments }) => {
  const accounts = await ethers.getSigners();
  const deployer = await accounts[0].getAddress();
  const { deploy, log } = deployments;
  const args = [];

  log("Deploying NC Token....");

  const NCToken = await deploy("NCToken", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
};

module.exports.tags = ["all"];

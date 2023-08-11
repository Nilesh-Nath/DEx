const { deployments, ethers, network } = require("hardhat");

module.exports = async ({ deployments }) => {
  const accounts = await ethers.getSigners();
  const deployer = await accounts[0].getAddress();
  const { deploy, log } = deployments;
  const args = [];

  log("Deploying MultiSwapContract....");

  const swapMultiHop = await deploy("SwapMultiHop", {
    from: deployer,
    log: true,
    args: args,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
};

module.exports.tags = ["all"];

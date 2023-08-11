require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("hardhat-gas-reporter");
require("dotenv").config();
// require("@nomiclabs/hardhat-waffle");

COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: "https://eth-mainnet.g.alchemy.com/v2/hC1N4_yDNwQYJZ7XyfO3B6bJdkWbQ-Yx",
      },
      // accounts: [
      //   `0x${"ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"}`,
      // ],
    },
  },
  gasReporter: {
    enabled: true,
    noColors: true,
    outputFile: "gasReport.txt",
    currency: "USD",
    coinmarketcap: COINMARKETCAP_API_KEY,
  },
};

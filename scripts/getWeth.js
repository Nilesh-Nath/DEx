const { ethers } = require("hardhat");

// Amount of ETH to convert into WETH

async function getWeth(AMOUNT) {
  const accounts = await ethers.getSigners();
  const account = accounts[0];

  // Getting the instance of WETH contract
  const iWeth = await ethers.getContractAt(
    "IWETH",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    account
  );
  const tx = await iWeth.deposit({ value: AMOUNT });
  await tx.wait(1);
  const balance = await iWeth.balanceOf(account);
  console.log(`Balance is ${balance.toString()}WETH....`);
}

module.exports = { getWeth };

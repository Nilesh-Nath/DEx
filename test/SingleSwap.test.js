const { expect, assert } = require("chai");
const { ethers } = require("hardhat");
const { getWeth } = require("../scripts/getWeth");

// const DAI = "0x2bcAE8205a77dabB2479CF2c85ded7d963101B86";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// const WETH9 = "0xEF1DACBce5194C668BEe55f2ca599F366709db0C";
// const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SingleSwapToken", () => {
  let SingleSwapTokenContract;
  let singleSwapToken;
  let account;
  let weth;
  let dai;
  let usdc;

  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    account = await accounts[0].getAddress();

    SingleSwapTokenContract = await ethers.deployContract("SingleSwapToken");
    singleSwapToken = await SingleSwapTokenContract.getAddress();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);
  });

  describe("1.swapExactInputSingle", () => {
    it("It should perform the swap properly!", async () => {
      const amountIn = 10n ** 18n;
      //Convert the ETH into WETH before depositing it
      // Deposite WETH
      await weth.deposit({ value: amountIn });
      await weth.approve(SingleSwapTokenContract, amountIn);

      // SWAP
      // console.log(SingleSwapTokenContract);

      await SingleSwapTokenContract.swapExactInputSingle(amountIn);
    });
  });

  describe("2.swapExactOutputSingle", () => {
    it("It should swap tokens properly!", async () => {
      const wethAmountInMax = 10n ** 18n;
      const daiAmountOut = 100n * 10n ** 18n;

      // DEPOSITE WETH
      await weth.deposit({ value: wethAmountInMax });
      await weth.approve(singleSwapToken, wethAmountInMax);

      // SWAP
      await SingleSwapTokenContract.swapExactOutputSingle(
        daiAmountOut,
        wethAmountInMax
      );
    });
  });
});

const { ethers } = require("hardhat");
const { expect } = require("chai");

// const DAI = "0x2bcAE8205a77dabB2479CF2c85ded7d963101B86";
const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
// const WETH9 = "0xEF1DACBce5194C668BEe55f2ca599F366709db0C";
// const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const WETH9 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

describe("SwapMultiHop", () => {
  let account,
    SwapMultiHopContract,
    SwapMultiHopContractAddress,
    weth,
    usdc,
    dai;
  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    account = await accounts[0].getAddress();

    SwapMultiHopContract = await ethers.deployContract("SwapMultiHop");
    SwapMultiHopContractAddress = await SwapMultiHopContract.getAddress();

    weth = await ethers.getContractAt("IWETH", WETH9);
    usdc = await ethers.getContractAt("IERC20", USDC);
    dai = await ethers.getContractAt("IERC20", DAI);
  });
  describe("1.swapExactInputMultiHop", () => {
    it("It Should perform The Swap Properly!", async () => {
      const amountIn = 10n ** 18n;

      // Deposite amd Approve WETH
      await weth.deposit({ value: amountIn });
      await weth.approve(SwapMultiHopContractAddress, amountIn);

      // SWAP
      await SwapMultiHopContract.swapExactInputMultiHop(amountIn);
    });
  });

  describe("2.swapExactOutputMultiHop", () => {
    it("It should swap tokens properly! ", async () => {
      const wethAmountInMax = 10n ** 18n;
      const daiAmountOut = 100n * 10n ** 18n;
      // DEPOSITE WETH
      await weth.deposit({ value: wethAmountInMax });
      await weth.approve(SwapMultiHopContractAddress, wethAmountInMax);

      // SWAP
      await SwapMultiHopContract.swapExactOutputMultiHop(
        daiAmountOut,
        wethAmountInMax
      );
    });
  });
});

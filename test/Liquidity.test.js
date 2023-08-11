const { ethers, network } = require("hardhat");
const { expect, assert } = require("chai");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const DAI_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";
const USDC_WHALE = "0x97f991971a37D4Ca58064e6a98FC563F03A71E5c";

describe("Liquidity", () => {
  let liquidityAddress;
  let account;
  let dai;
  let usdc;
  let liquidityContract;
  let daiBalance;
  let usdcBalance;
  beforeEach(async () => {
    const accounts = await ethers.getSigners();
    account = await accounts[0].getAddress();

    liquidityContract = await ethers.deployContract("Liquidity");
    liquidityAddress = await liquidityContract.getAddress();

    dai = await ethers.getContractAt(
      "contracts/interfaces/IERC20.sol:IERC20",
      DAI
    );
    usdc = await ethers.getContractAt(
      "contracts/interfaces/IERC20.sol:IERC20",
      USDC
    );

    // Unlock DAI and USDC whales
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAI_WHALE],
    });

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [USDC_WHALE],
    });

    const daiWhale = await ethers.getSigner(DAI_WHALE);
    const usdcWhale = await ethers.getSigner(USDC_WHALE);

    // Send DAI and USDC to account[0]

    // Convert the amount variables to BigInt
    const daiAmount = 10n * 10n ** 18n;
    const usdcAmount = 10n * 10n ** 6n;

    const daiBal = await dai.balanceOf(daiWhale.address);
    const usdcBal = await usdc.balanceOf(usdcWhale.address);

    expect(parseInt(await dai.balanceOf(daiWhale.address))).to.gte(
      Number(daiAmount)
    );
    expect(parseInt(await usdc.balanceOf(usdcWhale.address))).to.gte(
      Number(usdcAmount)
    );
    await dai.connect(daiWhale).transfer(account, daiAmount);
    await usdc.connect(usdcWhale).transfer(account, usdcAmount);
  });

  describe("mintNewPosition", () => {
    it("It should execute the liquidity properly!", async () => {
      const daiAmount = 10n * 10n ** 18n;
      const usdcAmount = 10n * 10n ** 6n;
      // First, approve the liquidity contract to spend the tokens

      await dai.connect(account).transfer(liquidityAddress, daiAmount);
      await usdc.connect(account).transfer(liquidityAddress, usdcAmount);

      // Now, call the mintNewPosition function in the liquidity contract
      await liquidityContract.mintNewPosition();
      // Assert the balances after adding liquidity
      console.log(
        "DAI balance after add liquidity",
        (await dai.balanceOf(account)).toString()
      );
      console.log(
        "USDC balance after add liquidity",
        (await usdc.balanceOf(account)).toString()
      );
    });
  });
});

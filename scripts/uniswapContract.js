const { Contract, ContractFactory, utils, BigNumber } = require("ethers");
const { ethers } = require("hardhat");
const WETH9 = require("../context/WETH9.json");

const artifacts = {
  UniswapV3Factory: require("@uniswap/v3-core/artifacts/contracts/UniswapV3Factory.sol/UniswapV3Factory.json"),
  SwapRouter: require("@uniswap/v3-periphery/artifacts/contracts/SwapRouter.sol/SwapRouter.json"),
  NFTDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/libraries/NFTDescriptor.sol/NFTDescriptor.json"),
  NonFungibleTokenPositionDescriptor: require("@uniswap/v3-periphery/artifacts/contracts/NonfungibleTokenPositionDescriptor.sol/NonfungibleTokenPositionDescriptor.json"),
  NonFungiblePositionManager: require("@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json"),
  WETH9,
};

const linkLibraries = ({ bytecode, linkReferences }, libraries) => {
  Object.keys(linkReferences).forEach((fileName) => {
    Object.keys(linkReferences[fileName]).forEach((contractName) => {
      if (!libraries.hasOwnProperty(contractName)) {
        throw new Error(`Missing link library name ${contractName}`);
      }

      const address = ethers
        .getAddress(libraries[contractName])
        .toLowerCase()
        .slice(2);
        
      linkReferences[fileName][contractName].forEach(({ start, length }) => {
        const start2 = 2 + start * 2;
        const length2 = length * 2;
        bytecode = bytecode
          .slice(0, start2)
          .concat(address)
          .concat(bytecode.slice(start2 + length2, bytecode.length));
      });
    });
  });

  return bytecode;
};

async function main() {
  const [owner] = await ethers.getSigners();
  console.log(owner);

  Weth = new ContractFactory(
    artifacts.WETH9.abi,
    artifacts.WETH9.bytecode,
    owner
  );

  weth = await Weth.deploy();

  Factory = new ContractFactory(
    artifacts.UniswapV3Factory.abi,
    artifacts.UniswapV3Factory.bytecode,
    owner
  );

  factory = await Factory.deploy();

  SwapRouter = new ContractFactory(
    artifacts.SwapRouter.abi,
    artifacts.SwapRouter.bytecode,
    owner
  );

  swapRouter = await SwapRouter.deploy(
    await factory.getAddress(),
    await weth.getAddress()
  );

  NFTDescriptor = new ContractFactory(
    artifacts.NFTDescriptor.abi,
    artifacts.NFTDescriptor.bytecode,
    owner
  );

  nftDescriptor = await NFTDescriptor.deploy();

  const linkedBytecode = linkLibraries(
    {
      bytecode: artifacts.NonFungibleTokenPositionDescriptor.bytecode,
      linkReferences: {
        "NFTDescriptor.sol": {
          NFTDescriptor: [
            {
              length: 20,
              start: 1261,
            },
          ],
        },
      },
    },
    {
      NFTDescriptor: await nftDescriptor.getAddress(),
    }
  );

  NonFungibleTokenPositionDescriptor = new ContractFactory(
    artifacts.NonFungibleTokenPositionDescriptor.abi,
    linkedBytecode,
    owner
  );

  nonFungibleTokenPositionDescriptor =
    await NonFungibleTokenPositionDescriptor.deploy(await weth.getAddress());

  console.log(nonFungibleTokenPositionDescriptor);

  NonFungiblePositionManager = new ContractFactory(
    artifacts.NonFungiblePositionManager.abi,
    artifacts.NonFungiblePositionManager.bytecode,
    owner
  );

  nonFungiblePositionManager = await NonFungiblePositionManager.deploy(
    await factory.getAddress(),
    await weth.getAddress(),
    await nonFungibleTokenPositionDescriptor.getAddress()
  );

  //   console.log("wethAddress =", `${await weth.getAddress()}`);
  //   console.log("factoryAddress =", `${await factory.getAddress()}`);
  //   console.log("swapRouterAddress =", `${await swapRouter.getAddress()}`);
  //   console.log("nftDescriptorAddress =", `${await nftDescriptor.getAddress()}`);
  //   console.log(
  //     "positionDescriptorAddress =",
  //     `${await nonFungibleTokenPositionDescriptor.getAddress()}`
  //   );
  //   console.log(
  //     "positionManagerAddress =",
  //     `${await nonFungiblePositionManager.getAddress()}`
  //   );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

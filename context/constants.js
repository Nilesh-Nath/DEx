// IMPORTS
import lifeToken from "./LifeToken.json";
import ncToken from "./NCToken.json";
import singleSwap from "./SingleSwapToken.json";
import swapMultiHop from "./SwapMultiHop.json";
import IWeth from "./IWETH.json";

// Life Token

export const lifeTokenAddress = "0x12456Fa31e57F91B70629c1196337074c966492a";
export const lifeTokenAbi = lifeToken.abi;

// NC Token

export const NCTokenAddress = "0xce830DA8667097BB491A70da268b76a081211814";
export const NCTokenAbi = ncToken.abi;

// MultiSwap Protocol

export const SwapMultiHopAddress = "0xD5bFeBDce5c91413E41cc7B24C8402c59A344f7c";
export const SwapMultiHopABI = swapMultiHop.abi;

// SingleSwap Protocol

export const SingleSwapTokenAddress =
  "0x77AD263Cd578045105FBFC88A477CAd808d39Cf6";
export const SingleSwapTokenABI = singleSwap.abi;

// IWETH

export const IWethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
export const IWethABI = IWeth.abi;

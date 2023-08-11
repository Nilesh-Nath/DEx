import { AlphaRouter } from "@uniswap/smart-order-router";
import { ethers, BigNumber } from "ethers"; // Import BigNumber from ethers

import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";

// GET DATA RIGHT

const V3_SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";

// GET PRICE

const chainId = 1;

const providerUrl =
  "https://eth-mainnet.g.alchemy.com/v2/hC1N4_yDNwQYJZ7XyfO3B6bJdkWbQ-Yx";

const provider = new ethers.JsonRpcProvider(providerUrl);

console.log(provider);

const name0 = "Wrapped Ether";
const symbol0 = "WETH";
const decimal0 = 18;
const address0 = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";

const name1 = "DAI";
const symbol1 = "DAI";
const decimal1 = 18;
const address1 = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const WETH = new Token(chainId, address0, decimal0, symbol0, name0);
const DAI = new Token(chainId, address1, decimal1, symbol1, name1);

export const swapUpdatePrice = async (
  inputAmount,
  slippageAmount,
  deadline,
  walletAddress
) => {
  const percentSlippage = new Percent(slippageAmount, 100);
  const wei = ethers.parseUnits(inputAmount.toString(), decimal0);
  console.log(inputAmount);
  console.log(wei);
  const weiNumber = parseFloat(ethers.formatUnits(wei, decimal0));

  // Convert BigNumber to BigInt
  const currencyAmount = CurrencyAmount.fromRawAmount(WETH, weiNumber);
  console.log(currencyAmount);

  const router = new AlphaRouter({
    chainId: chainId,
    provider,
  });

  const route = await router.route(currencyAmount, DAI, TradeType.EXACT_INPUT, {
    recipient: walletAddress,
    slippageTolerance: percentSlippage,
    deadline: deadline,
  });

  const transaction = {
    data: route.methodParameters.calldata,
    to: V3_SWAP_ROUTER_ADDRESS,
    value: BigNumber.from(route.methodParameters.value),
    from: walletAddress,
    gasPrice: BigNumber.from(route.gasPriceWei),
    gasLimit: ethers.hexlify(1000000),
  };

  const quoteAmountOut = route.quote.toFixed(6);
  const ratio = (inputAmount / quoteAmountOut).toFixed(3);

  console.log(quoteAmountOut, ratio);

  return [transaction, quoteAmountOut, ratio];
};

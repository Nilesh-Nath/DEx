import React, { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import Web3Modal, { providers } from "web3modal";
import { Token, CurrencyAmount, TradeType, Percent } from "@uniswap/sdk-core";
// INTERNAL IMPORTS

import {
  chechIfWalletIsConnected,
  connectWallet,
  connectingNCToken,
  connectingLifeToken,
  connectingMultiSwapToken,
  connectingSingleSwapToken,
  connectingIWethToken,
  connectingDAIToken,
} from "../Utils/appFeatures";

import { IWethABI } from "./constants";
import ERC20 from "./IERC20.json";

import { getPrice } from "../Utils/fetchingPrice";
import { swapUpdatePrice } from "../Utils/swapUpdatePrice";

export const SwapTokenContext = React.createContext();

export const SwapTokenContextProvider = ({ children }) => {
  // USESTATES
  const [account, setAccount] = useState("");
  const [ether, setEther] = useState("");
  const [networkConnect, setNetworkConnect] = useState("");
  const [weth9, setWeth9] = useState("");
  const [dai, setDai] = useState("");

  const [tokenData, setTokenData] = useState([]);

  const addToken = [
    "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
    "0x68749665FF8D2d112Fa859AA293F07A622782F38",
    "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    "0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9",
    "0x42bBFa2e77757C645eeaAd1655E0911a7553Efbc",
    "0xe3c408BD53c31C085a1746AF401A4042954ff740",
    "0x6982508145454Ce325dDbE47a25d4ec3d2311933",
    "0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3",
    "0xC581b735A1688071A1746c968e0798D642EDE491",
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  ];

  // FETCH DATA
  const fetchingData = async () => {
    try {
      // GET USER ACCOUNT
      const userAccount = await chechIfWalletIsConnected();
      setAccount(userAccount);
      // CREATE PROVIDER
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.BrowserProvider(connection);

      // CHECK BALANCE
      const balance = await provider.getBalance(userAccount);
      const ethValue = ethers.formatEther(balance);
      setEther(ethValue);

      // GET NETWORK NAME
      const network = await provider.getNetwork();
      setNetworkConnect(network.name);
      // console.log(network);

      // ALL TOKEN BALANCE AND DATA
      addToken.map(async (el, i) => {
        // GETTING CONTRACT
        const contract = new ethers.Contract(el, IWethABI, provider);

        // GETTING BALANCE OF TOKEN
        const userBalance = await contract.balanceOf(userAccount);

        const convertedTokenBal = ethers.formatEther(userBalance);

        // GET NAME AND SYMBOL
        const symbol = await contract.symbol();
        const name = await contract.name();

        tokenData.push({
          name: name,
          symbol: symbol,
          tokenBalance: convertedTokenBal,
          tokenAddress: el,
        });

        // console.log(tokenData);
      });

      // WETH Balance
      const weth = await connectingIWethToken();
      const wethBal = await weth.balanceOf(userAccount);
      const convertedWethTokenBal = ethers.formatEther(wethBal);
      setWeth9(convertedWethTokenBal);

      // DAI Balance

      const dai = await connectingDAIToken();
      const daiBal = await dai.balanceOf(userAccount);
      const convertedDaiTokenBal = ethers.formatEther(daiBal);

      setDai(convertedDaiTokenBal);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // SINGLE SWAP TOKEN

  const singleSwapToken = async ({ token1, token2, swapAmount }) => {
    console.log(
      token1.tokenAddress.tokenAddress,
      token2.tokenAddress.tokenAddress,
      swapAmount
    );

    try {
      let singleSwapToken;
      let weth;
      let dai;

      singleSwapToken = await connectingSingleSwapToken();
      weth = await connectingIWethToken();
      dai = await connectingDAIToken();

      const decimal0 = 18;
      const inputAmount = swapAmount;
      const amountIn = ethers.parseUnits(inputAmount.toString(), decimal0);
      console.log(amountIn);

      await weth.deposit({ value: amountIn });
      await weth.approve(await singleSwapToken.getAddress(), amountIn);

      // SWAP
      const transaction = await singleSwapToken.swapExactInputSingle(
        token1.tokenAddress.tokenAddress,
        token2.tokenAddress.tokenAddress,
        amountIn,
        {
          gasLimit: 300000,
        }
      );

      await transaction.wait();
      console.log(transaction);

      const balance = await dai.balanceOf(account);
      const transferAmount = ethers.formatEther(balance);
      setDai(transferAmount);
      console.log("Dai Balance :", transferAmount);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SwapTokenContext.Provider
      value={{
        singleSwapToken,
        connectWallet,
        getPrice,
        swapUpdatePrice,
        account,
        weth9,
        dai,
        networkConnect,
        ether,
        tokenData,
      }}
    >
      {children}
    </SwapTokenContext.Provider>
  );
};

import { ethers } from "ethers";
import Web3Modal from "web3modal";

import {
  lifeTokenAddress,
  lifeTokenAbi,
  NCTokenAddress,
  NCTokenAbi,
  SwapMultiHopAddress,
  SwapMultiHopABI,
  SingleSwapTokenAddress,
  SingleSwapTokenABI,
  IWethAddress,
  IWethABI,
} from "../context/constants";

// CHECK IF WALLET IS CONNECTED

export const chechIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) return console.error("Install Metamask!");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (e) {
    console.error(e);
  }
};

// CONNECT WALLET

export const connectWallet = async () => {
  try {
    if (!window.ethereum) return console.error("Install Metamask!");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (e) {
    console.error(e);
  }
};

// Fetching Contracts

// NC Token Fetching

export const fetchNcContract = (signerOrProvider) =>
  new ethers.Contract(NCTokenAddress, NCTokenAbi, signerOrProvider);

//  CONNECT WITH NC TOKEN CONTRACT

export const connectingNCToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchNcContract(signer);
    return contract;
  } catch (e) {
    console.error(e);
  }
};

/**----------------------------------------------------- */

// Life Token Fetching

export const fetchLifeContract = (signerOrProvider) =>
  new ethers.Contract(lifeTokenAddress, lifeTokenAbi, signerOrProvider);

//  CONNECT WITH Life TOKEN CONTRACT

export const connectingLifeToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchLifeContract(signer);
    return contract;
  } catch (e) {
    console.error(e);
  }
};

/**----------------------------------------------------- */

// Multi Swap Fetching

export const fetchMultiSwapContract = (signerOrProvider) =>
  new ethers.Contract(SwapMultiHopAddress, SwapMultiHopABI, signerOrProvider);

//  CONNECT WITH MultiSwap TOKEN CONTRACT

export const connectingMultiSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchMultiSwapContract(signer);
    return contract;
  } catch (e) {
    console.error(e);
  }
};

/**----------------------------------------------------- */

// Single Swap Fetching

export const fetchSingleSwapContract = (signerOrProvider) =>
  new ethers.Contract(
    SingleSwapTokenAddress,
    SingleSwapTokenABI,
    signerOrProvider
  );

//  CONNECT WITH Single Swap TOKEN CONTRACT

export const connectingSingleSwapToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchSingleSwapContract(signer);
    return contract;
  } catch (e) {
    console.error(e);
  }
};

/**----------------------------------------------------- */

// IWeth Fetching

export const fetchIWethContract = (signerOrProvider) =>
  new ethers.Contract(IWethAddress, IWethABI, signerOrProvider);

//  CONNECT WITH IWeth CONTRACT

export const connectingIWethToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchIWethContract(signer);
    return contract;
  } catch (e) {
    console.error(e);
  }
};

/**----------------------------------------------------- */

// DAI Fetching

const DAIAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

export const fetchDAIContract = (signerOrProvider) =>
  new ethers.Contract(DAIAddress, IWethABI, signerOrProvider);

//  CONNECT WITH DAI CONTRACT

export const connectingDAIToken = async () => {
  try {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.BrowserProvider(connection);
    const signer = await provider.getSigner();
    const contract = fetchDAIContract(signer);
    return contract;
  } catch (e) {
    console.error(e);
  }
};

import { ChainInfo, SupportedChainId } from "../types";

export const CHAIN_INFO: { [chainId in SupportedChainId]: ChainInfo } = {
  [SupportedChainId.MAINNET]: {
    label: "Ethereum",
    appUrl: "https://unemeta.com",
    explorer: "https://etherscan.io",
    rpcUrl: `https://eth-mainnet.alchemyapi.io/v2`,
    osApiUrl: "https://api.opensea.io",
    cdnUrl: "https://static.looksnice.org",
    rewardsSubgraphUrl: "https://api.thegraph.com/subgraphs/name/unemeta/looks-distribution",
    cloudinaryUrl: "https://unemeta.mo.cloudinary.net",
  },
  [SupportedChainId.SEPOLIA]: {
    label: "Sepolia",
    appUrl: "https://test.unemeta.com",
    explorer: "https://sepolia.etherscan.io",
    rpcUrl: `https://rpc.sepolia.org`,
    osApiUrl: "https://testnets-api.opensea.io",
    cdnUrl: "https://static-goerli.looksnice.org",
    rewardsSubgraphUrl: "https://api.thegraph.com/subgraphs/name/0xjurassicpunk/looks-distribution",
    cloudinaryUrl: "https://unemeta.mo.cloudinary.net/goerli",
  },
};

export const isSupportedChain = (chainId: number): chainId is SupportedChainId => {
  return Object.values(SupportedChainId).includes(chainId);
};

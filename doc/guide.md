# SDK Developer guide

## How to create and sign an order

The `signMakerOrder` function is a helper used on UneMeta to trigger an EIP-712 signature on our supported wallets.

```ts
import { BigNumber } from "ethers";
import { signMakerOrder, addressesByNetwork, SupportedChainId, MakerOrder } from "@unemeta/sdk";

const signer = ethersProvider.getSigner();
const signerAddress = await signer.getAddress();
const chainId = SupportedChainId.MAINNET;
const addresses = addressesByNetwork[chainId];
const nonce = await getUserNonce(signerAddress); // Fetch from the api

const now = Math.floor(Date.now() / 1000);
const paramsValue = [];

// Get protocolFees and creatorFees from the contracts
const netPriceRatio = BigNumber.from(10000).sub(protocolFees.add(creatorFees)).toNumber();
// This variable is used to enforce a max slippage of 25% on all orders, if a collection change the fees to be >25%, the order will become invalid
const minNetPriceRatio = 7500;

const makerOrder: MakerOrder = {
  isOrderAsk: true,
  signer: signerAddress,
  collection: "0xcE25E60A89F200B1fA40f6c313047FFe386992c3",
  price: "1000000000000000000", // :warning: PRICE IS ALWAYS IN WEI :warning:
  tokenId: "1", // Token id is 0 if you use the STRATEGY_COLLECTION_SALE strategy
  amount: 1, // Warning: Amount is int
  strategy: addresses.STRATEGY_STANDARD_SALE,
  currency: addresses.WETH,
  nonce: nonce.toNumber(),
  startTime: now,
  endTime: now + 86400, // 1 day validity
  minPercentageToAsk: Math.max(netPriceRatio, minNetPriceRatio),
  params: paramsValue,
};
const signatureHash = await signMakerOrder(signer, chainId, makerOrder);
```

- [full list demo code](https://github.com/Unemeta/unemeta-sdk-demo/blob/main/src/App.tsx#L28-L73)

If for any reason, the `signMakerOrder` doesn't fit your needs (i.e you only have access to an wallet, and not a json rpc provider), you can replace the `signMakerOrder` call with this:

```ts
import { generateMakerOrderTypedData, addressesByNetwork, SupportedChainId } from "@unemeta/sdk";

const chainId = SupportedChainId.MAINNET;
const addresses = addressesByNetwork[chainId];

const signer = new ethers.Wallet(WALLET_PRIVATE_KEY);
const signerAddress = await signer.getAddress();
const { domain, value, type } = generateMakerOrderTypedData(signerAddress, chainId, makerOrder);
const signature = await signer._signTypedData(domain, type, value);
```

- [full private key list demo code](https://github.com/Unemeta/unemeta-sdk-demo/blob/main/src/App.tsx#L78-L132)

## How to retrieve the user nonce

Call the public api endpoint [nonce](https://unemetatest.readme.io/reference/makeorder-1), and use this nonce directly.

## How to retrieve the fees

- **Collection royalties fees**: Call the function [royaltyFeeInfoCollection](https://github.com/Unemeta/unemeta-sdk/blob/master/src/abis/RoyaltyFee.json) on the RoyaltyFee contract.

```ts
const [setter, receiver, fee]: [string, string, BigNumber] = await contract.royaltyFeeInfoCollection(collectionAddress);
```

## How to execute an order

The api provides you with a `MakerOrderWithSignature`, and the contract expect a `MakerOrderWithVRS` and a `TakerOrder`.
Below is an example about how to build them.

```ts
const { encodedParams } = encodeOrderParams(makerOrderWithSignature.params);
const vrs = ethers.utils.splitSignature(makerOrderWithSignature.signature);

const askWithoutHash: MakerOrderWithVRS = {
  ...makerOrderWithSignature,
  ...vrs,
  params: encodedParams,
};

const order: TakerOrder = {
  isOrderAsk: false,
  taker: account,
  price: makerOrderWithSignature.price,
  tokenId: makerOrderWithSignature.tokenId,
  minPercentageToAsk: 7500,
  params: encodedParams,
};
```

- [full take order demo code](https://github.com/Unemeta/unemeta-sdk-demo/blob/main/src/App.tsx#L137-L189)

# Constants

## Addresses

An object containing all the contract addresses for each supported chain. Refer to the [Constant type](https://github.com/Unemeta/unemeta-sdk/blob/master/src/types/constants.ts) to see the complete list of addresses.

```ts
import { addressesByNetwork, SupportedChainId } from "@unemeta/sdk";
const addresses = addressesByNetwork[SupportedChainId.MAINNET];
```

## Chains

An object containing data related to supported chains. Refer to the [Constant type](https://github.com/Unemeta/unemeta-sdk/blob/master/src/types/constants.ts) to see the complete list of chain info.

```ts
import { CHAIN_INFO, SupportedChainId } from "@unemeta/sdk";
const currentChainInfo = CHAIN_INFO[SupportedChainId.MAINNET];
```

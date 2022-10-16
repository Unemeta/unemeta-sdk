# ABIs

The SDK exposes most of the LooksRare contract ABIs. For convenience, some commonly used ABIs are also exported.

```ts
import {
  ERC20Abi,
  ERC721Abi,
  ERC1155Abi,
  IExecutionStrategyAbi,
  UneMetaAirdropAbi,
  UneMetaExchangeAbi,
  RoyaltyFeeManagerAbi,
  RoyaltyFeeAbi,
  WETHAbi,
} from "@unemeta/sdk";
```

You can also export the JSON file directly:

```js
import wethAbi from "@unemeta/sdk/dist/abis/WETHAbi.json";
```

## UneMeta Exchange ABIs

- **UneMetaExchangeAbi**: UneMeta exchange, where all the trading actions are done (execute a trade, cancel orders, etc...).
- **IExecutionStrategyAbi**: Generic interface for Strategies contracts. You can use it to interact with all the strategies (only the implementation changes).
- **RoyaltyFeeAbi**: Allow creators to set their royalties in the registry.
- **RoyaltyFeeManagerAbi**: Compute the royalties for a specific trade, based on the registry information.

## Other ABIs (Not created by LooksRare)

- **ERC20Abi**: Generic ERC20 ABI
- **ERC721Abi**: Generic ERC721 ABI
- **ERC1155Abi**: Generic ERC1155 ABI
- **WETHAbi**: Generic WETH ABI

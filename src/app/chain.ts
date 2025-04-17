import { defineChain } from "thirdweb";

export const chain = defineChain({
  id: 97,
  rpc: "https://data-seed-prebsc-1-s1.binance.org:8545/",
  nativeCurrency: {
    name: "Binance Coin",
    symbol: "BNB",
    decimals: 18,
  },
});
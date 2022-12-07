import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
 coinbasewallet: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "Web 3 Modal Demo",
     infuraId: process.env.INFURA_KEY 
        }
    }
};
build on create-react-app
connect wallet to either metamask or coinbase wallet
Upload nft metadata to ipfs & filecoin

# Troubleshooting coinbase issues

```shell

```

I run into the following error: Module not found: Error: Can't resolve <'buffer'/'util'/...>

Due to the removal of default polyfills in webpack5, you must install the following utilities:
```shell
yarn add buffer
yarn add util
yarn add stream-browserify
yarn add assert
yarn add stream-http
yarn add url
yarn add https-browserify
yarn add os-browserify
````

Then, add the following code snippet to your webpack.config.js:
```shell
    resolve: {
      fallback: {
        'fs': false,
        'stream': require.resolve('stream-browserify'),
        'buffer': require.resolve('buffer/'),
        'util': require.resolve('util/'),
        'assert': require.resolve('assert/'),
        'http': require.resolve('stream-http/'),
        'url': require.resolve('url/'),
        'https': require.resolve('https-browserify/'),
        'os': require.resolve('os-browserify/'),
      },
    }
```
    If you are using an application built on create-react-app locally, you must run npm run eject to be able to customize your webpack configuration.

    The wallet connection does not persist upon refreshing the browser

    Web3Modal provides a built-in option for you to automatically cache the connected provider.

// set cacheProvider parameter as true when instantiating web3modal
```shell
const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions // required
});
```

// hook to automatically connect to the cached provider
```shell
useEffect(() => {
  if (web3Modal.cachedProvider) {
    connectWallet();
  }
}, []);>
```


idToListedToken
contract address="0x103bA2B6f8D325a6cb817d111F35108Dd6E289A0";
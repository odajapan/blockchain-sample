# blockchain-app-template

blockchain-app-template

## setup

1. install [node.js](https://nodejs.org/ja/)
2. create Web3 development environment [https://www.alchemy.com/](https://www.alchemy.com/)
3. send crypt currency from [https://goerlifaucet.com/](https://goerlifaucet.com/)

## setup react and smart contruct templates

```
$ . ./setup.sh
```

- setup client files

  - create react app
    - $npx create-react-app client
  - copy blockchain_react_app_template files
  - install [ethers.js](https://docs.ethers.io/v5/)
    - $npm install --save ethers

- setup smart contract
  - install hardhat
    - $install --save-dev hardhat
  - copy smart_contract_template files

## Deploy Smart Contract

1. edit hardhat.config.js # TODO 自動生成

```
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "goerli",
  solidity: "0.8.9",
  networks: {
    goerli: {
      // alchemy API KEY. https://www.alchemy.com/
      url: "https://eth-goerli.g.alchemy.com/v2/wfI0G...",

      accounts:[
        // MetaMask Private Key
        // **CAUTION!** Must not be public. Must not be committed to GitHub
        "b8d...",
      ]
    }
  }
};
```

2. run deploy.js

```
$ cd smart_contract
$ npx hardhat run scripts/deploy.js --network goerli
```

2. copy Aplication Binary Interface file(ABI) to ./client/utils
3. write deployed address to connect.js

- TODO: connect.js を自動生成

- connect.js

```
/ Applicartion Binary Interface.
// copy from ./smart_contract/artifacts/contract/Transactions.sol/
import abi from "./Transactions.json";

export const contractABI = abi.abi;

// copy and paste deployed address from console
// TODO: Automatically generate connect.js
export const contractAddress = "03a...";
```

## Develop blockchain App

- Start app

```
$ cd ./client
$ npm start
```

- Implement Smart Contract

  - [Transactions.sol](./smart_contract/contracts/Transactions.sol)

- Implement App
  - READ React documents!!

## Deploy to Heroku

- [create heroku app](https://dashboard.heroku.com/apps)
- Deploy
  - connect to Github
- set deploy from subfolder
  1. move to Settings
  - [Automated heroku deploy from subfolder](https://stackoverflow.com/questions/39197334/automated-heroku-deploy-from-subfolder)
  - Buildpacks
    - add [subdir-heroku-buildpack](https://github.com/timanovsky/subdir-heroku-buildpack) to top
    - add heroku/nodejs
  - add Config Vars
    - KEY: PROJECT_PATH, VALUE: Client

# Lisence
- GPL v2
- 商用利用不可♪

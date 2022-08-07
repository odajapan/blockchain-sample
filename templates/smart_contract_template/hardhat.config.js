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

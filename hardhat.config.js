require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    localhost: {},
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.TEST_PRIVATE_KEY],
    },
    mainnet: {
      chainId: 1,
      url: process.env.POLYGON_MAINNET,
      accounts: [process.env.DEV_WALLET_KEY],
    },
  }
};

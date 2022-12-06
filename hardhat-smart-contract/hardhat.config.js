require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: process.env.GOERLI_URL,
      accounts: [process.env.ACCOUNT_SECRET_KEY]
    }
  }
};

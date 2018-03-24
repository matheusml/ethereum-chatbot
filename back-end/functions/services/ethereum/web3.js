const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const { MNEMONIC, NETWORK_URL } = require("../../config/provider");

const provider = new HDWalletProvider(MNEMONIC, NETWORK_URL);

const web3 = new Web3(provider);

module.exports = {
  web3
};

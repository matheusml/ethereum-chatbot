const fetch = require("node-fetch");

const { API_KEY } = require("../../config/apiKey");

const getBalance = (address) => {
  return fetch(`https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${API_KEY}`)
};

module.exports = {
  getBalance
};
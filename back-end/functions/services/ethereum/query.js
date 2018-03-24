const { web3 } = require("./web3");
const { GET_TX, GET_BALANCE } = require("../../utils/constants");

const ethQuery = message => {
  return new Promise((resolve, reject) => {
    if (message.startsWith(GET_TX)) {
      const transactionAddress = message.split(" ")[1];
      return web3.eth.getTransaction(transactionAddress).then(transaction => {
        return resolve({ transaction });
      });
    } else if (message.startsWith(GET_BALANCE)) {
      const walletAddress = message.split(" ")[1];
      return web3.eth.getBalance(walletAddress).then(balance => {
        return resolve({ balance });
      });
    }

    return reject();
  });
};

module.exports = {
  ethQuery
};
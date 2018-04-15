const { web3 } = require("./web3");
const { GET_TX, GET_BALANCE } = require("../../utils/constants");
const { getBalance } = require("./balance");

const ethQuery = message => {
  return new Promise((resolve, reject) => {
    if (message.startsWith(GET_TX)) {
      const transactionAddress = message.split(" ")[1];
      return web3.eth.getTransaction(transactionAddress).then(transaction => {
        return resolve({ transaction });
      }).catch(() => {
        return reject(`Unable to find transaction for address: ${transactionAddress}`);
      });
    } else if (message.startsWith(GET_BALANCE)) {
      const walletAddress = message.split(" ")[1];
      return getBalance(walletAddress).then(response => response.json()).then(response => {
        if (response.status === '1') {
          return resolve({ balance: response.result });
        }
        return reject(`Unable to find balance for wallet: ${walletAddress}`);
      });
    }

    return reject();
  });
};

module.exports = {
  ethQuery
};
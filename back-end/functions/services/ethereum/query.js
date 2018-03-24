const { web3 } = require("./web3");
const { GET_TX, GET_BALANCE } = require("../../utils/constants");

const ethQuery = async message => {
  if (message.startsWith(GET_TX)) {
    const transactionAddress = message.split(" ")[1];
    const transaction = await web3.eth.getTransaction(transactionAddress);

    return { transaction };
  } else if (message.startsWith(GET_BALANCE)) {
    const walletAddress = message.split(" ")[1];
    const balance = await web3.eth.getBalance(walletAddress);

    return { balance };
  }

  return null;
};

module.exports = {
  ethQuery
};

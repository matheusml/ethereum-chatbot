const { ethQuery } = require("./query");
const { web3 } = require("./web3");
const { GET_TX, GET_BALANCE } = require("../../utils/constants");

jest.mock("./web3");

describe("ethQuery", () => {
  it("should reject the promise when the command is invalid", () => {
    ethQuery("")
      .then(() => {})
      .catch(err => {
        expect(err).toBe(undefined);
      });
  });

  it("should return transactions for a valid address", () => {
    web3.eth.getTransaction.mockResolvedValue("transaction");
    const transactionAddress = "123";

    ethQuery(`${GET_TX} ${transactionAddress}`).then(response => {
      expect(response).toEqual({ transaction: "transaction" });
      expect(web3.eth.getTransaction).toHaveBeenCalledWith(transactionAddress);
    });
  });

  it("should return an error for invalid address", () => {
    web3.eth.getTransaction.mockReturnValue(Promise.reject(''));
    const transactionAddress = "123";

    ethQuery(`${GET_TX} ${transactionAddress}`).then().catch(err => {
      expect(err).toEqual('Unable to find transaction for address: ' + transactionAddress);
      expect(web3.eth.getTransaction).toHaveBeenCalledWith(transactionAddress);
    });
  });

  it("should return the balance for a valid wallet address", () => {
    web3.eth.getBalance.mockResolvedValue("balance");
    const walletAddress = "456";

    ethQuery(`${GET_BALANCE} ${walletAddress}`).then(response => {
      expect(response).toEqual({ balance: "balance" });
      expect(web3.eth.getBalance).toHaveBeenCalledWith(walletAddress);
    });
  });

  it("should return an error for invalid wallet address", () => {
    web3.eth.getBalance.mockReturnValue(Promise.reject(''));
    const walletAddress = "456";

    ethQuery(`${GET_BALANCE} ${walletAddress}`).then().catch(err => {
      expect(err).toEqual('Unable to find balance for wallet: ' + 456);
      expect(web3.eth.getBalance).toHaveBeenCalledWith(walletAddress);
    });
  });
});
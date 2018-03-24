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

  it("should return transactions", () => {
    web3.eth.getTransaction.mockResolvedValue("transaction");
    const transactionAddress = "123";

    ethQuery(`${GET_TX} ${transactionAddress}`).then(response => {
      expect(response).toEqual({ transaction: "transaction" });
      expect(web3.eth.getTransaction).toHaveBeenCalledWith(transactionAddress);
    });
  });

  it("should return the balance", () => {
    web3.eth.getBalance.mockResolvedValue("balance");
    const walletAddress = "456";

    ethQuery(`${GET_BALANCE} ${walletAddress}`).then(response => {
      expect(response).toEqual({ balance: "balance" });
      expect(web3.eth.getBalance).toHaveBeenCalledWith(walletAddress);
    });
  });
});

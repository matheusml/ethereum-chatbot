const { ethQuery } = require("./query");
const { web3 } = require("./web3");
const { GET_TX, GET_BALANCE } = require("../../utils/constants");

jest.mock("./web3");
jest.mock("./balance");

const getBalanceMock = require("./balance").getBalance;

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
    getBalanceMock.mockReturnValue(Promise.resolve({
      json: () => ({
        status: "1",
        result: "123"
      })
    }));
    const walletAddress = "456";

    ethQuery(`${GET_BALANCE} ${walletAddress}`).then(response => {
      expect(response).toEqual({ balance: "123" });
      expect(getBalanceMock).toHaveBeenCalledWith(walletAddress);
    });
  });

  it("should return an error for an invalid wallet address", () => {
    getBalanceMock.mockReturnValue(Promise.resolve({
      json: () => ({
        status: "0",
        result: "error"
      })
    }));
    const walletAddress = "456";

    ethQuery(`${GET_BALANCE} ${walletAddress}`).then().catch(error => {
      expect(error).toEqual('Unable to find balance for wallet: ' + 456);
      expect(getBalanceMock).toHaveBeenCalledWith(walletAddress);
    });
  });
});
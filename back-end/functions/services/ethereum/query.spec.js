const { ethQuery } = require("./query");
const { web3 } = require("./web3");
const { GET_TX, GET_BALANCE } = require("../../utils/constants");

jest.mock("./web3");

describe("ethQuery", () => {
  it("should return null when command is invalid", async () => {
    const response = await ethQuery("");
    expect(response).toBe(null);
  });

  it("should return transactions", async () => {
    web3.eth.getTransaction.mockResolvedValue("transaction");
    const transactionAddress = "123";

    const response = await ethQuery(`${GET_TX} ${transactionAddress}`);
    expect(response).toEqual({ transaction: "transaction" });
    expect(web3.eth.getTransaction).toHaveBeenCalledWith(transactionAddress);
  });

  it("should return the balance", async () => {
    web3.eth.getBalance.mockResolvedValue("balance");
    const walletAddress = "456";

    const response = await ethQuery(`${GET_BALANCE} ${walletAddress}`);
    expect(response).toEqual({ balance: "balance" });
    expect(web3.eth.getBalance).toHaveBeenCalledWith(walletAddress);
  });
});

const { getRandomMessage, randomMessages } = require("./randomMessages");

describe("randomMessages", () => {
  it("should be an array of string messages", () => {
    expect(randomMessages).toEqual([
      "Science is not only a disciple of reason but, also, one of romance and passion",
      "Science is a beautiful gift to humanity; we should not distort it",
      "Only two things are infinite, the universe and human stupidity, and I'm not sure about the former",
      "The science of today is the technology of tomorrow",
      "Science is organized knowledge. Wisdom is organized life",
      "Science is a way of thinking much more than it is a body of knowledge.",
      "Success is a science; if you have the conditions, you get the result.",
      "Everything is theoretically impossible, until it is done",
      "Science is the great antidote to the poison of enthusiasm and superstition"
    ]);
  });
});

describe("getRandomMessage", () => {
  it("should return a random message from the messages list", () => {
    const randomMessage = getRandomMessage();
    expect(randomMessages.includes(randomMessage)).toBe(true);
  });
});

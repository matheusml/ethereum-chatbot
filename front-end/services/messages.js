const API = "localhost:5000"; // https://ethereum-chatbot.firebaseapp.com/

export function sendMessage(message) {
  return fetch(`${API}/messages`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  });
}

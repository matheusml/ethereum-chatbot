import { API } from "../config/api";
import { headers } from "../config/headers";

export function sendMessage(message) {
  return fetch(`${API}/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      message
    })
  });
}

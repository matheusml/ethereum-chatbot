import { API } from "../config/api";
import { headers } from "../config/headers";

export function sendMessage() {
  return fetch(`${API}/messages`, {
    method: "POST",
    headers
  });
}

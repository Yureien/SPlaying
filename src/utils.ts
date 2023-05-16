export function generateUserToken(length: number = 32): string {
  return [...crypto.getRandomValues(new Uint8Array(length))].map((m) => ("0" + m.toString(16)).slice(-2)).join("");
}

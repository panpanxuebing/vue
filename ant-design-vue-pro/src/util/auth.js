export function getCurrentAuth() {
  return ["admin"];
}
export function check(authority) {
  return getCurrentAuth().some(item => authority.includes(item));
}
export function isLogin() {
  const current = getCurrentAuth();
  return current && current[0] !== "guest";
}

export function attemptURIDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch(e) {
    console.log(e);
    console.log(str);
    return str;
  }
}
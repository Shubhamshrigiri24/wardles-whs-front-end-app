export default (jwt) => {
  const bits = jwt.split(".");
  let parsed = bits[1].replace(/-/g, "+").replace(/_/g, "/");

  while (parsed.length % 4 !== 0) {
    parsed += "=";
  }
  return JSON.parse(Buffer.from(parsed, "base64").toString("utf8"));
};

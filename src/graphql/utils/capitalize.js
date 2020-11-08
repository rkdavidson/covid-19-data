module.exports = function capitalize(string) {
  return string.replace(/^\w/, (c) => c.toUpperCase());
};

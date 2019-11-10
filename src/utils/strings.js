export function capitalize(str) {
  if (!str) return str;
  return `${str[0].toUpperCase()}${str.substr(1)}`;
}

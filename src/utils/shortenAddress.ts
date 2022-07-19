export const shortenAddress = (address: string | undefined, head = 6, tail = head - 2): string => {
  if (!address) return "";
  return address.slice(0, head) + "..." + address.substring(address.length - tail);
};

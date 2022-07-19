export const getRpcUrl = (): string => {
  if (!process.env.NEXT_PUBLIC_RPC_URL) {
    throw new Error("RPC URL is not defined");
  }
  return process.env.NEXT_PUBLIC_RPC_URL;
};

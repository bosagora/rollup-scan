import { formatEther } from "ethers/lib/utils";

export const Amount = (amount: string | number) => {
  return formatEther(amount);
};

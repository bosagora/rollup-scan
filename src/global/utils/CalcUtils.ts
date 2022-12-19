import { Amount } from "global/config/config";

const bigDecimal = require("js-big-decimal");

export const fixToThree = (value: any) => {
  let temp = value ? value.toString() : "0";
  if (temp) {
    temp = temp.split(".");
  } else {
    return temp;
  }
  let n = temp[1] ? "" + temp[1] : "0";
  let x = n && (n + "000").substring(0, 3);
  return x ? temp[0] + "." + x : "0.000";
};

export const getPriceOfFee = (fee: any, price: any, digits: number = 5) => {
  let temp = fee ? fee : "0";
  const value = bigDecimal.multiply(Amount(temp), price);
  return bigDecimal.round(value, digits);
};

export const getPretty = (val: any) => {
  return bigDecimal.getPrettyValue(val);
};

export const getTransactionType = (type: any) => {
  let temp = "";
  if (type === 0 || type === "Payment") {
    temp = "Payment";
  } else if (type === 1 || type === "Freeze") {
    temp = "Freeze";
  } else if (type === 2 || type === "Coinbase") {
    temp = "Coinbase";
  }
  return temp;
};

export const getTransactionAddressAmount = (
  myAddress: string,
  inputList: any[],
  outputList: any[]
): any => {
  let inputSum = 0,
    outputSum = 0;
  inputList.forEach((input) => {
    if (input.address === myAddress) inputSum += input.amount;
  });
  outputList.forEach((output) => {
    if (output.address === myAddress) outputSum += output.amount;
  });
  const value = outputSum - inputSum;
  const positive = value >= 0 ? true : false;
  return {
    isPositive: positive,
    value: positive
      ? "+" + getPretty(Amount(Math.abs(value)))
      : "-" + getPretty(Amount(Math.abs(value))),
  };
};

export const hashPretty = (hash: string) => {
  if (hash && hash.length > 7) {
    return hash.slice(0, 6) + `…` + hash.slice(-1 * 6);
  }
  return "";
};

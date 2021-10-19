import Web3 from "web3";

// Format time in a readable way
export const timeFormat = (timeStamp) => {
  const date = new Date(timeStamp * 1000);
  const moment = new Date();
  const diffMs = moment - date;

  const diffDays = Math.floor(diffMs / 86400000);
  const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
  const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  if (diffDays > 0) return diffHrs + " days ago";
  else if (diffHrs > 0) return diffMins + " hrs ago";
  else if (diffMins > 0) return diffMins + " min ago";

  return "";
};

// Slice the hashes of transaction
export const txHashUtil = (str) => {
  const strFirstPart = str.slice(0, 20);

  return strFirstPart.concat("...");
};

// Capitalize the first character of a word
export const capitalizeFirstLetter = (string) => {
  console.log({ string });
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Convert from wei unit to eth
export const convertWeiToEth = (value) => {
  return Web3.utils.fromWei(value, "ether") + " Ether";
};

// Get balance of a address by block number
export const getBalanceByBlock = async (address, block) => {
  console.log(process.env.REACT_APP_WEB3_PROVIDER);
  const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER);
  console.log(await web3.eth.getBalance(address, block));
  return await web3.eth.getBalance(address, block);
};

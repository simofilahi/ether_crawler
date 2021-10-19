import Web3 from "web3";

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

export const txHashUtil = (str) => {
  const strFirstPart = str.slice(0, 20);

  return strFirstPart.concat("...");
};

export const capitalizeFirstLetter = (string) => {
  console.log({ string });
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const convertWeiToEth = (value) => {
  return Web3.utils.fromWei(value, "ether") + " Ether";
};

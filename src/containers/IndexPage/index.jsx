import Header from "../../components/Header";
import Search from "../../components/Search";
import TxCard from "../../components/TxCard";
import React, { useState, createContext } from "react";
import { baseUrl } from "../../constants/api";
import axios from "axios";
import CustomDatePicker from "../../components/DatePicker";
import { convertWeiToEth, getBalanceByBlock } from "../../utils";
import BalanceCard from "../../components/BalanceCard";

export const TxContext = createContext({ test: "test" });

const IndexPage = () => {
  const [inputData, updateInputData] = useState({
    address: "0x0000000000000000000000000000000000000000",
    startBlock: 0,
  });
  const [txData, updateTxData] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [pages, addPage] = useState([1, 2, 3]);
  const [balance, setBalance] = useState(0);
  const [timeStamp, setTimeStamp] = useState(0);

  const FetchTx = async (page) => {
    try {
      console.log({ inputData });
      const url = `${baseUrl}/?module=account&action=txlist&address=${inputData.address}&startblock=${inputData.startBlock}\
      &endblock=99999999&page=${page}&offset=18&sort=asc&apiKey=${process.env.REACT_APP_API_KEY}`;

      const data = await axios.get(url);
      console.log(data);
      updateTxData(data.data.result);
    } catch {}
  };

  const FetchBalance = async (address, timestamp) => {
    try {
      console.log({ timestamp });
      const url = `${baseUrl}/?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.REACT_APP_API_KEY}`;

      console.log({ url });
      const data = await axios.get(url);
      const blockNumber = data.data.result;
      const balance = await getBalanceByBlock(address, blockNumber);
      setBalance(balance);
    } catch {}
  };

  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-full h-24 bg-white flex-1 self-start"></div>
      <div className="w-980-px  flex flex-col absolute top-0 self-center">
        <TxContext.Provider
          value={{
            inputData,
            updateInputData,
            FetchTx,
            txData,
            currPage,
            setCurrPage,
            pages,
            addPage,
            balance,
            setBalance,
            FetchBalance,
            setTimeStamp,
            timeStamp,
          }}
        >
          <Header />
          <BalanceCard />
          <Search />
          <TxCard />
        </TxContext.Provider>
      </div>
    </div>
  );
};

export default IndexPage;

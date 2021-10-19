// Header of web app
import Header from "../../components/Header";

import Search from "../../components/Search";
// Transaction card component
import TxCard from "../../components/TxCard";

// State management functions
import React, { useState, createContext } from "react";

// Base url of etherscan api
import { baseUrl } from "../../constants/api";

// Package used for fetching data from web
import axios from "axios";

// Balance Card component
import BalanceCard from "../../components/BalanceCard";

// Get balance by block
import { getBalanceByBlock } from "../../utils";

// Create context for this parent component
export const TxContext = createContext({ test: "test" });

const IndexPage = () => {
  // Defaul address and block number
  const [inputData, updateInputData] = useState({
    address: "0x0000000000000000000000000000000000000000",
    startBlock: 0,
  });

  // Transaction data
  const [txData, updateTxData] = useState([]);

  // Used for pagination to know which current page index
  const [currPage, setCurrPage] = useState(1);

  // Pagination pages
  const [pages, addPage] = useState([1, 2, 3]);

  // Balance of an address
  const [balance, setBalance] = useState(0);

  // Time stamp of date picker used for get an address balance in a specific date
  const [timeStamp, setTimeStamp] = useState(0);

  // Fetch transaction data of an address
  const FetchTx = async (page) => {
    try {
      // Endpoint url used to get trasnaction data
      const url = `${baseUrl}/?module=account&action=txlist&address=${inputData.address}&startblock=${inputData.startBlock}\
      &endblock=99999999&page=${page}&offset=18&sort=asc&apiKey=${process.env.REACT_APP_API_KEY}`;

      // Fetch transaction data by pagination
      const data = await axios.get(url);

      // Update State
      updateTxData(data.data.result);
    } catch {}
  };

  // Fetch Balance of an address
  const FetchBalance = async (address, timestamp) => {
    try {
      // Endpoint url used to to get number of block in specific time
      const url = `${baseUrl}/?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${process.env.REACT_APP_API_KEY}`;

      // Calling etherscan api to get number of block in specific time
      const data = await axios.get(url);
      const blockNumber = data.data.result;

      // Get balance of an address by blockNumber
      const balance = await getBalanceByBlock(address, blockNumber);

      // Update the blance in state
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

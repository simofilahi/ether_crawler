import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/api";
import {
  capitalizeFirstLetter,
  convertWeiToEth,
  timeFormat,
  txHashUtil,
} from "../../utils";
import Web3 from "web3";

const TxCard = () => {
  const [showTxDetails, setShowDetails] = useState(false);
  const [TxDetailsData, setTxDetailsData] = useState({});
  const [inputData, updateInputData] = useState({
    address: "0x0000000000000000000000000000000000000000",
    startBlock: 0,
  });
  const [pages, addPage] = useState([1, 2, 3]);
  const [currPage, setCurrPage] = useState(1);
  const [txData, updateTxData] = useState([]);

  const FetchTx = async (page) => {
    const url = `${baseUrl}/?module=account&action=txlist&address=${inputData.address}&startblock=${inputData.startBlock}\
    &endblock=99999999&page=${page}&offset=18&sort=asc&apiKey=${process.env.REACT_APP_API_KEY}`;

    console.log({ url });
    const data = await axios.get(url);
    updateTxData(data.data.result);
  };

  useEffect(() => {
    FetchTx(currPage);
  }, []);

  const RightArrowIcon = () => {
    return (
      <a
        onClick={() => {
          addPage([...pages, pages[pages.length - 1] + 1]);
          setCurrPage((prevPage) => prevPage + 1);
          FetchTx(currPage + 1);
        }}
        href="#"
        class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    );
  };

  const LeftArrowIcon = () => {
    return (
      <a
        onClick={() => {
          if (currPage > 1) {
            setCurrPage((prevPage) => prevPage - 1);
            FetchTx(currPage - 1);
          }
        }}
        href="#"
        class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
      >
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      </a>
    );
  };

  const Pagination = () => {
    return (
      <div class="bg-white px-4 py-3 flex items-center justify-end border-t border-gray-200 sm:px-6">
        <div className="flex px-2">
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <LeftArrowIcon />
            {pages.map((page) => {
              return (
                <a
                  onClick={() => {
                    setCurrPage(page);
                    FetchTx(page);
                  }}
                  href="#"
                  aria-current="page"
                  class={` ${
                    currPage === page
                      ? "z-10 bg-indigo-50 border-indigo-500 text-indigo-600"
                      : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                  }  relative inline-flex items-center px-4 py-2 border text-sm font-medium`}
                >
                  {page}
                </a>
              );
            })}
            <RightArrowIcon />
          </nav>
        </div>
      </div>
    );
  };

  const TxDetailsRow = (props) => {
    console.log(props);
    return (
      <div className="flex border-b-2 border-gray-100 py-4 px-2">
        <div className="w-1/3">{capitalizeFirstLetter(props.keyName)}:</div>
        <div className="max-w-xl whitespace-pre-line">{props.value}</div>
      </div>
    );
  };

  const TxDetails = () => {
    return (
      <div className=" flex flex-col">
        {Object.keys(TxDetailsData).map((key) => {
          console.log({ key });
          return <TxDetailsRow keyName={key} value={TxDetailsData[key]} />;
        })}
      </div>
    );
  };

  const Rows = () => {
    return (
      <>
        {txData.length > 0 &&
          txData.map((item) => {
            console.log({ item });
            return (
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="">
                      <a
                        class="text-sm font-medium  cursor-pointer text-matisse"
                        onClick={() => {
                          setTxDetailsData(item);
                          setShowDetails(true);
                        }}
                      >
                        {txHashUtil(item.hash)}
                      </a>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{item.blockNumber}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {timeFormat(item.timeStamp)}
                  </div>
                </td>

                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {txHashUtil(item.from)}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{txHashUtil(item.to)}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div class="text-sm text-gray-900">
                    {convertWeiToEth(item.value)}
                  </div>
                </td>
              </tr>
            );
          })}
      </>
    );
  };

  const TableHead = () => {
    return (
      <thead class="bg-gray-50">
        <tr>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Tx hash
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Block
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Age
          </th>

          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            From
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            To
          </th>
          <th
            scope="col"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Quantity
          </th>
        </tr>
      </thead>
    );
  };

  const TableBody = () => {
    return (
      <tbody class="bg-white divide-y divide-gray-200">
        <Rows />
      </tbody>
    );
  };

  const Table = () => {
    return (
      <table class="min-w-full divide-y divide-gray-200">
        <TableHead />
        <TableBody />
      </table>
    );
  };

  const BackBtn = () => {
    if (showTxDetails) {
      return (
        <div className="py-2">
          <a
            onClick={() => {
              setShowDetails(false);
            }}
            href="#"
            class=" whitespace-nowrap inline-flex
           items-center justify-center w-24 h-10 border: ;
            border-transparent rounded-md shadow-sm 
            text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Back
          </a>
        </div>
      );
    } else return <></>;
  };

  return (
    <div class="flex  flex-col">
      <BackBtn />
      <div class="shadow overflow-hidden border-b border-gray-200 w-full h-full bg-white">
        {showTxDetails ? (
          <TxDetails />
        ) : (
          <>
            <Table />
            <Pagination />
          </>
        )}
      </div>
    </div>
  );
};

export default TxCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../constants/api";
import { capitalizeFirstLetter, timeFormat, txHashUtil } from "../../utils";

const TxCard = () => {
  const [showTxDetails, setShowDetails] = useState(false);
  const [TxDetailsData, setTxDetailsData] = useState({});
  const [txData, updateTxData] = useState([]);

  const FetchTx = async (address, startBlock, page) => {
    const url = `${baseUrl}/?module=account&action=txlist&address=${address}&startblock=${startBlock}\
    &endblock=99999999&page=${page}&offset=18&sort=asc&apiKey=${process.env.REACT_APP_API_KEY}`;

    console.log({ url });
    const data = await axios.get(url);
    updateTxData(data.data.result);
  };

  useEffect(() => {
    FetchTx("0xaa7a9ca87d3694b5755f213b5d04094b8d0f0a6f", 9000000, 1);
  }, []);

  const Pagination = () => {
    return (
      <div class="bg-white px-4 py-3 flex items-center justify-end border-t border-gray-200 sm:px-6">
        <div className="flex px-2">
          <nav
            class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Previous</span>

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

            <a
              href="#"
              aria-current="page"
              class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              1
            </a>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              2
            </a>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              3
            </a>
            <span class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
            >
              8
            </a>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              9
            </a>
            <a
              href="#"
              class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
            >
              10
            </a>
            <a
              href="#"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span class="sr-only">Next</span>

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
    // console.log(Object.keys(TxDetailsData));
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
                    <div class="ml-4">
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
                  <div class="text-sm text-gray-900">{item.value}</div>
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

  return (
    <div class="flex ">
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

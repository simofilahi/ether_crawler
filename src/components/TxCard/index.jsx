import React, { useState, useEffect, useContext } from "react";
import { convertWeiToEth, timeFormat, txHashUtil } from "../../utils";
import { TxContext } from "../../containers/IndexPage";
import TxDetails from "../TxDetails";

const TxCard = () => {
  const txData = useContext(TxContext);
  const [showTxDetails, setShowDetails] = useState(false);
  const [TxDetailsData, setTxDetailsData] = useState({});

  useEffect(() => {
    txData.FetchTx(txData.currPage);
  }, []);

  const RightArrowIcon = () => {
    return (
      <a
        onClick={() => {
          txData.addPage([
            ...txData.pages,
            txData.pages[txData.pages.length - 1] + 1,
          ]);
          txData.setCurrPage((prevPage) => prevPage + 1);
          txData.FetchTx(txData.currPage + 1);
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
          if (txData.currPage > 1) {
            txData.setCurrPage((prevPage) => prevPage - 1);
            txData.FetchTx(txData.currPage - 1);
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
            {txData.pages.map((page) => {
              return (
                <a
                  onClick={() => {
                    txData.setCurrPage(page);
                    txData.FetchTx(page);
                  }}
                  href="#"
                  aria-current="page"
                  class={` ${
                    txData.currPage === page
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

  const TxHashCell = (props) => {
    return (
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="flex items-center">
          <div class="">
            <a
              class="text-sm font-medium  cursor-pointer text-matisse"
              onClick={() => {
                setTxDetailsData(props.item);
                setShowDetails(true);
              }}
            >
              {txHashUtil(props.item.hash)}
            </a>
          </div>
        </div>
      </td>
    );
  };

  const TxBlockNumberCell = (props) => {
    return (
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{props.item.blockNumber}</div>
      </td>
    );
  };

  const TxAgeCell = (props) => {
    return (
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">
          {timeFormat(props.item.timeStamp)}
        </div>
      </td>
    );
  };

  const TxFromCell = (props) => {
    return (
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{txHashUtil(props.item.from)}</div>
      </td>
    );
  };

  const TxToCell = (props) => {
    return (
      <td class="px-6 py-4 whitespace-nowrap">
        <div class="text-sm text-gray-900">{txHashUtil(props.item.to)}</div>
      </td>
    );
  };

  const TxValueCell = (props) => {
    return (
      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div class="text-sm text-gray-900">
          {convertWeiToEth(props.item.value)}
        </div>
      </td>
    );
  };

  const Rows = () => {
    return (
      <>
        {txData.txData.length > 0 &&
          txData.txData.map((item) => {
            return (
              <tr>
                <TxHashCell item={item} />
                <TxBlockNumberCell item={item} />
                <TxAgeCell item={item} />
                <TxFromCell item={item} />
                <TxToCell item={item} />
                <TxValueCell item={item} />
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
    <div class=" flex-col">
      <BackBtn />
      <div
        class="shadow overflow-hidden border-b 
      border-gray-200 w-full h-full  "
      >
        {showTxDetails ? (
          <TxDetails TxDetailsData={TxDetailsData} />
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

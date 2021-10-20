import { TxContext } from "../../containers/IndexPage";
import React, { useContext } from "react";
import { GenesisAddress } from "../../constants";

const Search = () => {
  const txData = useContext(TxContext);
  const AddressInput = () => {
    return (
      <div class="flex px-1">
        <div class="flex border-2 rounded">
          <div class="flex items-center justify-center px-3 lg:px-4 border-r text-gray-500">
            Address
          </div>
          <input
            onChange={(e) => {
              txData.updateInputData({
                address: e.target.value,
                startBlock: txData.inputData.startBlock,
              });
            }}
            value={
              txData.inputData.address === GenesisAddress
                ? ""
                : txData.inputData.address
            }
            type="text"
            class="py-2 px-2 ms:w-24 md:w-48 lg:w-62 xl:w-80"
            placeholder={GenesisAddress}
          />
        </div>
      </div>
    );
  };

  const BlockInput = () => {
    return (
      <div class="px-1">
        <div class="flex border-2 rounded">
          <div class="flex items-center justify-center px-3 lg:px-4 border-r text-gray-500">
            Block
          </div>
          <input
            onChange={(e) => {
              txData.updateInputData({
                startBlock: e.target.value,
                address: txData.inputData.address,
              });
            }}
            value={
              txData.inputData.startBlock === 0
                ? ""
                : txData.inputData.startBlock
            }
            type="text"
            class="py-2 px-2 ms:w-24 md:w-48 lg:w-62 xl:w-80"
            placeholder=" Default 0"
          />
        </div>
      </div>
    );
  };

  const SearchBtn = () => {
    return (
      <div class="flex justify-center items-center px-5 ">
        <a
          onClick={() => {
            txData.FetchTx(1);
          }}
          href="#"
          class="ml-2 lg:ml-8 whitespace-nowrap
      inline-flex items-center justify-center 
      sm:px-4 md:px-5 lg:px-6 h-10 border border-transparent rounded-md 
      shadow-sm text-base font-medium text-white bg-indigo-600 
      hover:bg-indigo-700"
        >
          Search
        </a>
      </div>
    );
  };

  const FromTxt = () => {
    return (
      <div className="flex justify-center items-center ms:px-2 md:px-3 lg:px-5">
        From
      </div>
    );
  };

  return (
    <div className="flex bg-white sm:py-6 md:py-8 lg:py-10 items-center justify-center ">
      <AddressInput />
      <FromTxt />
      <BlockInput />
      <SearchBtn />
    </div>
  );
};

export default Search;

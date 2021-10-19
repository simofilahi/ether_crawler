import react, { useContext, useState } from "react";
import { convertWeiToEth } from "../../utils";
import CustomDatePicker from "../DatePicker";
import { TxContext } from "../../containers/IndexPage";

const BalanceCard = () => {
  // Defaul address use to get the balance
  const [address, setAddress] = useState(
    "0x0000000000000000000000000000000000000000"
  );
  const txData = useContext(TxContext);

  // Address input for getting balance
  const AddressInput = () => {
    return (
      <div className="px-4 flex items-center justify-center">
        <div class="flex border-2 rounded">
          <div class="flex items-center justify-center px-3 lg:px-4 border-r text-gray-500">
            Address
          </div>
          <input
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
            class="py-2 h-10  px-2 ms:w-24 md:w-48 lg:w-62 xl:w-80"
            placeholder="0x0000000000000000000000000000000000000000"
          />
        </div>
      </div>
    );
  };

  // Get balance button
  const BalanceBtn = () => {
    return (
      <div class="flex justify-center items-center px-4 ">
        <a
          onClick={() => {
            txData.FetchBalance(address, txData.timeStamp);
          }}
          href="#"
          class="ml-2 lg:ml-8 whitespace-nowrap
        inline-flex items-center justify-center 
        sm:px-4 md:px-5 lg:px-6 h-10 border border-transparent rounded-md 
        shadow-sm text-base font-medium text-white bg-indigo-600 
        hover:bg-indigo-700"
        >
          Get Balance
        </a>
      </div>
    );
  };

  return (
    <div className="bg-white w-full h-24 my-10 flex items-center flex-col">
      <div className=" flex py-2 w-full justify-start items-center">
        <div className="px-4">
          Balance: {convertWeiToEth(txData.balance.toString())}
        </div>
      </div>
      <div className="flex">
        <AddressInput />
        <div className="px-4 flex justify-center items-center">
          <CustomDatePicker />
        </div>
        <BalanceBtn />
      </div>
    </div>
  );
};

export default BalanceCard;

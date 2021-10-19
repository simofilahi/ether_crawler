import { capitalizeFirstLetter } from "../../utils";

const TxDetails = (props) => {
  const TxDetailsRow = (props) => {
    return (
      <div className="flex border-b-2 border-gray-100 py-4 px-2">
        <div className="w-1/3">{capitalizeFirstLetter(props.keyName)}:</div>
        <div className="max-w-xl whitespace-pre-line">{props.value}</div>
      </div>
    );
  };
  return (
    <div className=" flex flex-col bg-white">
      {Object.keys(props.TxDetailsData).map((key) => {
        return <TxDetailsRow keyName={key} value={props.TxDetailsData[key]} />;
      })}
    </div>
  );
};

export default TxDetails;

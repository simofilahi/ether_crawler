import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import React, { useContext } from "react";
import { TxContext } from "../../containers/IndexPage";
import moment from "moment";

const CustomDatePicker = () => {
  const txData = useContext(TxContext);
  return (
    <Space direction="vertical">
      <DatePicker
        className="h-11"
        onChange={async (value, dateString) => {
          const date = moment(dateString).utc();
          const timeStamp = date.unix();
          txData.setTimeStamp(timeStamp);
        }}
      />
    </Space>
  );
};

export default CustomDatePicker;

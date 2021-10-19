import "antd/dist/antd.css";
import { DatePicker, Space } from "antd";
import React, { useContext } from "react";
import { TxContext } from "../../containers/IndexPage";
import moment from "moment";

const CustomDatePicker = (props) => {
  return (
    <Space direction="vertical">
      <DatePicker
        date={"date"}
        className="h-11"
        onChange={async (value, dateString) => {
          const date = moment(dateString).utc();
          const timeStamp = date.unix();
          props.setTimeStamp(timeStamp);
        }}
      />
    </Space>
  );
};

export default CustomDatePicker;

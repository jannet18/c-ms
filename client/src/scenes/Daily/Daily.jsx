import React, { useMemo, useState } from "react";
import Header from "components/Header";
import { Box, useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Daily() {
  const [startData, setStartData] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-02-01"));

  return <div>Daily</div>;
}

export default Daily;

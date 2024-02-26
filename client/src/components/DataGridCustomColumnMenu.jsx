import {
  GridColumnHeaderMenu,
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
  GridFilterMenuItem,
} from "@mui/x-data-grid";
import React from "react";
// import
//   GridColumnMenuContainer,
//     GridFilterMenuItem,
//   HideGridColMenuItem,
//  from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      <GridColumnMenuFilterItem hideMenu={hideMenu}></GridColumnMenuFilterItem>
      <GridColumnMenuFilterItem
        currentColumn={currentColumn}
      ></GridColumnMenuFilterItem>
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;

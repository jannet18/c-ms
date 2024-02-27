import {
  GridColumnMenuContainer,
  GridColumnMenuFilterItem,
} from "@mui/x-data-grid";

const CustomColumnMenu = (props) => {
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      <GridColumnMenuFilterItem
        onClick={hideMenu}
        column={currentColumn}
      ></GridColumnMenuFilterItem>
      <GridColumnMenuFilterItem
        onClick={hideMenu}
        currentColumn={currentColumn}
      ></GridColumnMenuFilterItem>
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;

import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api.js";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [];
    // const { monthlyData } = data;

    const [monthlyData] = data;
    const monthly = monthlyData.monthlyData;
    // console.log(monthly);
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthly ?? []).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data = [
          ...totalSalesLine.data,
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );
    return [[totalSalesLine], [totalUnitsLine]];
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [data, theme.palette.secondary]);

  if (!data || isLoading) return "Loading...";
  return (
    <ResponsiveLine
      data={view === "sales" ? totalSalesLine : totalUnitsLine}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 5,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;

// import React, { useEffect, useMemo, useState } from "react";
// import { ResponsiveLine } from "@nivo/line";
// import { Box, useTheme } from "@mui/material";
// import { useGetSalesQuery } from "../state/api";

// const OverviewChart = ({ view, isDashboard = false }) => {
//   const theme = useTheme();
//   const { data, isLoading, error } = useGetSalesQuery();
//   const [monthlyData, setMonthlyData] = useState(undefined);
//   const [totalSalesLine, setTotalSalesLine] = useState([]);
//   const [totalUnitsLine, setTotalUnitsLine] = useState([]);
//   // console.log(data);
//   useEffect(() => {
//     if (data) {
//       setMonthlyData(data?.monthlyData);
//       // console.log(setMonthlyData.value);
//     }
//   }, [data]);
//   useEffect(() => {
//     if (!monthlyData) return;

//     const salesData = [];
//     const unitsData = [];
//     monthlyData.forEach(({ month, totalSales, totalUnits }) => {
//       const curSales =
//         (salesData.length > 0 ? salesData[salesData.length - 1].y : 0) +
//         totalSales;
//       const curUnits =
//         (unitsData.length > 0 ? unitsData[unitsData.length - 1].y : 0) +
//         totalUnits;
//       salesData.push({ x: month, y: curSales });
//       unitsData.push({ x: month, y: curUnits });
//     });

//     setTotalSalesLine([
//       {
//         id: "totalSales",
//         color: theme.palette.secondary.main,
//         data: salesData,
//       },
//     ]);
//     setTotalUnitsLine([
//       {
//         id: "totalUnits",
//         color: theme.palette.secondary[600],
//         data: unitsData,
//       },
//     ]);
//   }, [monthlyData, theme.palette.secondary.main, theme.palette.secondary[600]]);
//   // const [totalSalesLine, totalUnitsLine] = useMemo(() => {
//   //   if (!monthlyData) return [[], []];

//   //   const totalSalesLine = {
//   //     id: "totalSales",
//   //     color: theme.palette.secondary.main,
//   //     data: [],
//   //   };
//   //   const totalUnitsLine = {
//   //     id: "totalUnits",
//   //     color: theme.palette.secondary[600],
//   //     data: [],
//   //   };
//   //   if (Array.isArray(monthlyData)) {
//   //     (monthlyData || []).reduce(
//   //       (acc, { month, totalSales, totalUnits }) => {
//   //         const curSales = acc.sales + totalSales;
//   //         const curUnits = acc.units + totalUnits;

//   //         totalSalesLine.data = [
//   //           ...totalSalesLine.data,
//   //           { x: month, y: curSales },
//   //         ];
//   //         totalUnitsLine.data = [
//   //           ...totalUnitsLine.data,
//   //           { x: month, y: curUnits },
//   //         ];

//   //         return { sales: curSales, units: curUnits };
//   //       },
//   //       { sales: 0, units: 0 }
//   //     );
//   //   }

//   //   return [[totalSalesLine], [totalUnitsLine]];
//   // }, [monthlyData, theme.palette.secondary.main, theme.palette.secondary[600]]);
//   console.log(monthlyData);
//   if (!!monthlyData || isLoading) return "Loading...";
//   if (!!monthlyData || error) return console.log(error);

//   return (
//     <Box height="70vh">
//       <ResponsiveLine
//         data={view === "sales" ? totalSalesLine : totalUnitsLine}
//         theme={{
//           axis: {
//             domain: {
//               line: {
//                 stroke: theme.palette.secondary[200],
//               },
//             },
//             legend: {
//               text: {
//                 fill: theme.palette.secondary[200],
//               },
//             },
//             ticks: {
//               line: {
//                 stroke: theme.palette.secondary[200],
//                 strokeWidth: 1,
//               },
//               text: {
//                 fill: theme.palette.secondary[200],
//               },
//             },
//           },
//           legends: {
//             text: {
//               fill: theme.palette.secondary[200],
//             },
//           },
//           tooltip: {
//             container: {
//               color: theme.palette.primary.main,
//             },
//           },
//         }}
//         margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: false,
//           reverse: false,
//         }}
//         yFormat=" >-.2f"
//         curve="catmullRom"
//         enableArea={isDashboard}
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           format: (v) => {
//             if (isDashboard) return v.slice(0, 3);
//             return v;
//           },
//           orient: "bottom",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: isDashboard ? "" : "Month",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           orient: "left",
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: isDashboard
//             ? ""
//             : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
//           legendOffset: -60,
//           legendPosition: "middle",
//         }}
//         enableGridX={false}
//         enableGridY={false}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={
//           !isDashboard
//             ? [
//                 {
//                   anchor: "bottom-right",
//                   direction: "column",
//                   justify: false,
//                   translateX: 30,
//                   translateY: -40,
//                   itemsSpacing: 0,
//                   itemDirection: "left-to-right",
//                   itemWidth: 80,
//                   itemHeight: 20,
//                   itemOpacity: 0.75,
//                   symbolSize: 12,
//                   symbolShape: "circle",
//                   symbolBorderColor: "rgba(0, 0, 0, .5)",
//                   effects: [
//                     {
//                       on: "hover",
//                       style: {
//                         itemBackground: "rgba(0, 0, 0, .03)",
//                         itemOpacity: 1,
//                       },
//                     },
//                   ],
//                 },
//               ]
//             : undefined
//         }
//       />
//       <ResponsiveLine
//         data={view === "sales" ? totalSalesLine : totalUnitsLine}
//         margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//         xScale={{ type: "point" }}
//         yScale={{
//           type: "linear",
//           min: "auto",
//           max: "auto",
//           stacked: true,
//           reverse: false,
//         }}
//         yFormat=" >-.2f"
//         curve="catmullRom"
//         axisTop={null}
//         axisRight={null}
//         axisBottom={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "transportation",
//           legendOffset: 36,
//           legendPosition: "middle",
//         }}
//         axisLeft={{
//           tickSize: 5,
//           tickPadding: 5,
//           tickRotation: 0,
//           legend: "count",
//           legendOffset: -40,
//           legendPosition: "middle",
//         }}
//         enableGridX={false}
//         enableGridY={false}
//         pointSize={10}
//         pointColor={{ theme: "background" }}
//         pointBorderWidth={2}
//         pointBorderColor={{ from: "serieColor" }}
//         pointLabelYOffset={-12}
//         useMesh={true}
//         legends={[
//           {
//             anchor: "bottom-right",
//             direction: "column",
//             justify: false,
//             translateX: 100,
//             translateY: 0,
//             itemsSpacing: 0,
//             itemDirection: "left-to-right",
//             itemWidth: 80,
//             itemHeight: 20,
//             itemOpacity: 0.75,
//             symbolSize: 12,
//             symbolShape: "circle",
//             symbolBorderColor: "rgba(0, 0, 0, .5)",
//             effects: [
//               {
//                 on: "hover",
//                 style: {
//                   itemBackground: "rgba(0, 0, 0, .03)",
//                   itemOpacity: 1,
//                 },
//               },
//             ],
//           },
//         ]}
//       />
//     </Box>
//   );
// };

// export default OverviewChart;

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Dashboard from "scenes/Dashboard/Dashboard";
import Layout from "scenes/Layout/Layout";
import Products from "scenes/Products";
import Customers from "scenes/Customers/Customers.js";
import Transactions from "scenes/Transactions/Transactions.js";
import Geography from "scenes/Geography";
import Sales from "scenes/Sales/Sales";
import Daily from "scenes/Daily/Daily";
import Monthly from "scenes/Monthly/Monthly";
import Breakdown from "scenes/Breakdown/Breakdown";
import Admin from "scenes/Admin/Admin";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/overview" element={<Sales />} />
            <Route path="/daily" element={<Daily />} />
            <Route path="/monthly" element={<Monthly />} />
            <Route path="/breakdown" element={<Breakdown />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;

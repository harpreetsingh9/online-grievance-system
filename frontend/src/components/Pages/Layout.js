import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Home from "./Home";

const Layout = () => {
  return <>
    <CssBaseline />
    <Home />
    <Outlet />
  </>;
};

export default Layout;
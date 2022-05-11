import React from "react";
import Cookies from "universal-cookie";
import { Outlet } from "react-router-dom";
import NotFound from "../Pages/NotFound";
import Navibar from "../Navbar";
const cookies = new Cookies();

export default function PrivateRoute() {
  const auth = cookies.get("loginID");
  return auth ? (
    <>
      <Outlet />

      <Navibar />
    </>
  ) : (
    <NotFound />
  );
}

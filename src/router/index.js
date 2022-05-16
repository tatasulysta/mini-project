import React from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "../pages/Menu";
import History from "../pages/History";
import Histories from "../pages/Histories";
import NotFound from "../pages/NotFound";
import Cart from "../pages/Cart/Index";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Register from "../pages/Register/Index";

export default function GlobalRoute() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<Histories />}>
          <Route path=":historyId" element={<History />} />
        </Route>
      </Route>
    </Routes>
  );
}

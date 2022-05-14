import React from "react";
import { Route, Routes } from "react-router-dom";
import Menu from "../components/Pages/Menu";
import History from "../components/Pages/History";
import Histories from "../components/Pages/Histories";
import NotFound from "../components/Pages/NotFound";
import Cart from "../components/Pages/Cart/Index";
import Home from "../components/Pages/Home";
import Login from "../components/Pages/Login";
import PrivateRoute from "./PrivateRoute";
import Register from "../components/Pages/Register/Index";

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

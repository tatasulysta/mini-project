import "./App.css";
import { Route, Routes } from "react-router-dom";
import Menu from "./components/Pages/Menu";
import History from "./components/Pages/History";
import Histories from "./components/Pages/Histories";
import NotFound from "./components/Pages/NotFound";
import Cart from "./components/Pages/Cart/Index";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Register from "./components/Pages/Register/Index";

function App() {
  return (
    <>
      <div className="app">
        <Routes>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

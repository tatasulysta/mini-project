import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navibar from "./components/Navbar";
import Home from "./components/Pages/Home";
import History from "./components/Pages/History";
import Histories from "./components/Pages/Histories";
import NotFound from "./components/Pages/NotFound";
import Cart from "./components/Pages/Cart/Index";

function App() {
  return (
    <>
      <Navibar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<Histories />}>
            <Route path=":historyId" element={<History />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

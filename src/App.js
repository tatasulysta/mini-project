import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navibar from "./components/Navbar";
import Home from "./components/Pages/Home";
import History from "./components/Pages/History";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
      <Navibar />
    </>
  );
}

export default App;

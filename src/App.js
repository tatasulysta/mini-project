import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navibar from "./components/Navbar";
import Home from "./components/Pages/Home";
import History from "./components/Pages/History";
import NotFound from "./components/Pages/NotFound";

function App() {
  return (
    <>
      <div className="App">
        <Navibar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

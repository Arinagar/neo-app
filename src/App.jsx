import { Route, Routes } from "react-router-dom";

import Data from "./pages/DataPage/Data";
import Home from "./pages/HomePage/Home";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/data" element={<Data />} />
    </Routes>
  );
}

export default App;

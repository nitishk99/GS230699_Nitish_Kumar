import { Route, Routes } from "react-router-dom";
import Store from "../pages/Store";
import Sku from "../pages/Sku";
import Planning from "../pages/Planning";
// import Chart from "../pages/Chart";

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/store" element={<Store />} />
      <Route path="/sku" element={<Sku />} />
      <Route path="/planning" element={<Planning />} />
      {/* <Route path="/chart" element={<Chart />} /> */}
    </Routes>
  );
};

export default PageRouter;
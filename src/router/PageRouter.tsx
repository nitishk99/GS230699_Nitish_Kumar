import { Routes, Route } from "react-router-dom";
import Store from "../pages/Store";
import Sku from "../pages/Sku";
import Planning from "../pages/Planning";

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/store" element={<Store />} />
      <Route path="/sku" element={<Sku />} />
      <Route path="/planning" element={<Planning />} />
    </Routes>
  );
};

export default PageRouter;

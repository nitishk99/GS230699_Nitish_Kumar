import { Routes, Route } from "react-router-dom";
import Store from "../pages/Store";
import Sku from "../pages/Sku";

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/store" element={<Store />} />
      <Route path="/sku" element={<Sku />} />
    </Routes>
  );
};

export default PageRouter;

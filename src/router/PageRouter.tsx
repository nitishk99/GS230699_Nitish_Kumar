import { Routes, Route } from "react-router-dom";
import Store from "../pages/Store";

const PageRouter = () => {
  return (
    <Routes>
      <Route path="/store" element={<Store />} />
    </Routes>
  );
};

export default PageRouter;

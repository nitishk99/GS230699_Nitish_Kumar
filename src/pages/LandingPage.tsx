import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchSkus } from "../redux/thunks/skuThunks";
import { fetchStores } from "../redux/thunks/storeThunks";
import Box from "@mui/material/Box";
import Navbar from "../components/Navbar";
import LeftMenu from "../components/LeftMenu";
import Toolbar from "@mui/material/Toolbar";
import PageRouter from "../router/PageRouter";
import SignIn from "./SignIn";

const LandingPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.currentUser);

  // Fetch SKUs and stores from Firebase Database
  useEffect(() => {
    dispatch(fetchSkus());
    dispatch(fetchStores());
  }, [dispatch]);

  // Redirect to login if the user is not authenticated
  if (!currentUser) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SignIn />} />
      </Routes>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100%", overflow: "hidden" }}>
      <Navbar />
      <LeftMenu />
      <Box sx={{ backgroundColor: "#DEDEDE", flexGrow: 1, height: "100vh" }}>
        <Toolbar />
        <PageRouter />
      </Box>
    </Box>
  );
};

export default LandingPage;
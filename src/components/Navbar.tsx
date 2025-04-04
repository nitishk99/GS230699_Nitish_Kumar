import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import logo from "../assets/images/logo.svg";
import Typography from "@mui/material/Typography";
import { signOut, auth } from "../config/FireBase";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slice/authSlice";

const Navbar = () => {
  const dispatch: AppDispatch = useDispatch();

  // Handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      dispatch(clearUser());
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        boxShadow: "none",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <img src={logo} alt="Company Logo" style={{ height: "60px" }} />
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "300",
            color: "grey",
          }}
        >
          Store Manager App
        </Typography>
        <IconButton size="large" onClick={handleSignOut}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AccountCircleOutlinedIcon color="action" />
            <Typography sx={{ fontSize: "12px" }}>Log out</Typography>
          </Box>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

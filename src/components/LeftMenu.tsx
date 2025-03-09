import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Toolbar, Box } from "@mui/material";
// import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { LeftMenuStyles } from "./LeftMenuStyles";

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer sx={LeftMenuStyles.drawer} variant="permanent">
      <Box>
        <Toolbar />
        <List sx={LeftMenuStyles.listContainer}>
          <ListItem
            onClick={() => handleNavigation("/store")}
            sx={{
              cursor: "pointer",
              backgroundColor:
                location.pathname === "/store" ? "#DEDEDE" : "transparent",
            }}
          >
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
              <StoreOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Store" />
          </ListItem>
          <ListItem
            onClick={() => handleNavigation("/sku")}
            sx={{
              cursor: "pointer",
              backgroundColor:
                location.pathname === "/sku" ? "#DEDEDE" : "transparent",
            }}
          >
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
              <CategoryOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="SKU" />
          </ListItem>
          <ListItem
            onClick={() => handleNavigation("/planning")}
            sx={{
              cursor: "pointer",
              backgroundColor:
                location.pathname === "/planning" ? "#DEDEDE" : "transparent",
            }}
          >
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
              <BarChartOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Planning" />
          </ListItem>
          {/* Feature not implemented yet
           <ListItem
            onClick={() => handleNavigation("/chart")}
            sx={{
              cursor: "pointer",
              backgroundColor:
                location.pathname === "/chart" ? "#DEDEDE" : "transparent",
            }}
          >
            <ListItemIcon sx={LeftMenuStyles.iconContainer}>
              <PollOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Charts" />
          </ListItem>  */}
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;

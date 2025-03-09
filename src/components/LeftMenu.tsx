import { useLocation, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Toolbar, Box } from "@mui/material";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { LeftMenuStyles } from "./LeftMenuStyles";

const LeftMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define menu items
  const menuItems = [
    { text: "Store", icon: <StoreOutlinedIcon />, path: "/store" },
    { text: "SKU", icon: <CategoryOutlinedIcon />, path: "/sku" },
    { text: "Planning", icon: <BarChartOutlinedIcon />, path: "/planning" },
  ];

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer sx={LeftMenuStyles.drawer} variant="permanent">
      <Box>
        <Toolbar />
        <List sx={LeftMenuStyles.listContainer}>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              onClick={() => handleNavigation(item.path)}
              sx={{
                cursor: "pointer",
                color:'grey',
                backgroundColor:
                  location.pathname === item.path ? "#DEDEDE" : "transparent",
              }}
            >
              <ListItemIcon sx={LeftMenuStyles.iconContainer}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default LeftMenu;
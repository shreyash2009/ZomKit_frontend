import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { colors } from "../constants/colors";
import { mobileNavLinks } from "../constants/navdata";
import { useUser } from "../constants/userCOntext";
const drawerWidth = 300;

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useUser();
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const renderAvatarOrButtons = () => {
    if (user) {
      return (
        <>
          <Button
            style={{display:"block",  background:colors?.green, margin:"4px", color:colors?.white }}
            onClick={() => logout()}
          >
            LogOut
          </Button>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color={colors?.primaryDark}
          >
            <AccountCircle style={{ color: `${colors?.primaryDark}` }} />
          </IconButton>
          <Button
            style={{  textTransform: "capitalize",  margin:"4px", color:colors?.black }}
          >
            {user?.name}
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button
            style={{  background:colors?.green, margin:"4px", color:colors?.white }}
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            style={{  background:colors?.green, margin:"4px", color:colors?.white }}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </>
      );
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center", p: 4 }}>
      <img
        style={{
          marginInline: "8px",
          width: "100px",
          height: "90px",
          objectFit: "cover",
        }}
        src="https://1000logos.net/wp-content/uploads/2023/01/Zomato-Logo-2010.png"
        alt="logo"
      />
      <Divider />
      <List>
        {mobileNavLinks.map((item) => (
          <ListItem key={item?.id} disablePadding>
            <Link
              sx={{ textAlign: "center" }}
              href={item?.href}
              style={{
                color:colors?.primaryDark,
                display: "block",
                margin: "6px 18px",
                fontSize: "16px",
                fontWeight: "800",
              }}
            >
              <ListItemText primary={item?.name} />
            </Link>
          </ListItem>
        ))}
      </List>
      {renderAvatarOrButtons()}
    </Box>
  );

  return (
    <Box sx={{ display: "flex", background: colors?.background }}>
      <AppBar component="nav" sx={{ background: colors?.background }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            style={{ color: colors?.primaryDark }}
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <img
            style={{
              marginInline: "8px",
              width: "100px",
              height: "80px",
              objectFit: "cover",
            }}
            src="https://1000logos.net/wp-content/uploads/2023/01/Zomato-Logo-2010.png"
            alt="logo"
          />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "space-between",
            }}
          >
            <Link
              style={{
                color: colors?.primaryDark,
                display: "block",
                marginInline: "18px",
                fontSize: "16px",
                fontWeight: "600",
              }}
              to={"/"}
            >
              Home
            </Link>

            {user && (
              <Link
                style={{
                  color: colors?.primaryDark,
                  display: "block",
                  marginInline: "18px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
                to={"/upload"}
              >
                Upload
              </Link>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex" } }}>{renderAvatarOrButtons()}</Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            p: 4,
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            background: colors?.background,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;

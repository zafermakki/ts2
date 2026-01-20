import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const navItems = ["Home", "About Me", "Contact"];

  return (
    <AppBar position="static" elevation={0} sx={{ background: "transparent" }}>
      <Toolbar
        sx={{
          px: { xs: 2, md: 10 },
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1.44px solid rgba(255,255,255,0.15)",
        }}
      >
        <Typography
          fontWeight="bold"
          fontSize={18}
          sx={{ fontFamily: "Oswald, sans-serif" }}
        >
          SaulDesign
        </Typography>

        <Box display={{ xs: "none", md: "flex" }} gap={4}>
          {navItems.map((item) => (
            <Button
              key={item}
              sx={{
                color: "#fff",
                textTransform: "none",
                fontSize: 14,
                opacity: 0.8,
                "&:hover": { opacity: 1 },
              }}
            >
              {item}
            </Button>
          ))}
        </Box>

        <IconButton
          onClick={handleOpenMenu}
          sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
        >
          <MenuIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            sx: {
              backgroundColor: "#1f252f",
              color: "#fff",
              minWidth: 160,
            },
          }}
        >
          {navItems.map((item) => (
            <MenuItem key={item} onClick={handleCloseMenu}>
              {item}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

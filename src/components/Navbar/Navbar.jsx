import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar elevation={0} sx={{ background: "transparent" }}>
      <Toolbar
        sx={{
          px: { xs: 2, md: 10 },
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Typography fontWeight="bold" fontSize={18} sx={{ fontFamily: 'Oswald, sans-serif' }}>
          SaulDesign
        </Typography>

        {/* Links */}
        <Box display="flex" gap={4}>
          {["Home", "About Me", "Contact"].map((item) => (
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

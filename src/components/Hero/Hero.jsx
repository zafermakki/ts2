import { Box, Typography, Button } from "@mui/material";
import heroImg from "../../assets/images/Group 2346.png";
import ArrowDownIcon from "../../assets/icons/ArrowDownIcon/ArrowDownIcon";
import DoodlesMixedRound from "../../assets/decorations/DoodlesMixedRound"

const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        px: { xs: 2, md: 10 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
      }}
    >
      <Box maxWidth={520}>
        <Typography
          variant="h2"
          fontWeight={800}
          lineHeight={1.1}
          sx={{ fontSize: { xs: 42, md: 64 } }}
        >
          CREATIVE UI
        </Typography>

        <Typography
          variant="h2"
          fontWeight={800}
          color="primary"
          lineHeight={1.1}
          sx={{ fontSize: { xs: 42, md: 64 } }}
        >
          DESIGNER
        </Typography>

        <Box mt={4} display="flex" gap={2}>
          <Button
            variant="contained"
            sx={{
              px: 4,
              py: 1.3,
              borderRadius: 5,
              textTransform: "none",
              fontWeight: "bold",
              color:"#fff"
            }}
          >
            Hire me
          </Button>

          <Button
            variant="outlined"
            sx={{
              px: 3,
              py: 1.3,
              borderRadius: 5,
              textTransform: "none",
              borderColor: "#2d3748",
              color: "#fff",
            }}
          >
            Download CV <ArrowDownIcon size={26} style={{ color: "#16c7c3" }} />
          </Button>
        </Box>
      </Box>

      <Box display={{ xs: "none", md: "block" }} sx={{ position: "relative" }}>
        <Box
            sx={{
            position: "absolute",
            top: "-50px",
            left: "-50px",
            width: 500,
            height: 500,
            zIndex: 0,
            pointerEvents: "none",
            }}
        >
            <DoodlesMixedRound width="100%" height="100%" />
        </Box>

        <img
            src={heroImg}
            alt="Designer"
            style={{ width: 420, position: "relative", zIndex: 1 }}
        />
        </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 30,
          left: "50%",
          transform: "translateX(-50%)",
          width: 44,
          height: 44,
          borderRadius: 2,
          background: "rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Typography fontSize={22}>↓</Typography>
      </Box>
    </Box>
  );
};

export default Hero;

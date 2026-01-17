import React from "react";
import { Box, Typography, Button } from "@mui/material";
import aboutImg from "../../assets/images/Group 62.png";
import VectorMusic from "../../assets/decorations/VectorMusic";

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "800px",
        px: { xs: 2, md: 10 },
        py: { xs: 8, md: 12 },
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
      }}
    >
      {/* LEFT CONTENT */}
      <Box maxWidth={520} position="relative">
        {/* Decoration */}
        <Box sx={{ position: "absolute", top: -30, left: -40 }}>
          <VectorMusic />
        </Box>

        <Typography
          variant="h3"
          fontWeight={800}
          mb={2}
        >
          About{" "}
          <Box component="span" color="primary.main">
            me
          </Box>
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          lineHeight={1.8}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nunc vulputate libero et velit interdum, ac aliquet odio
          mattis. Class aptent taciti sociosqu ad litora torquent
          per conubia nostra, per inceptos himenaeos.
        </Typography>

        <Button
          sx={{
            mt: 3,
            px: 0,
            color: "#fff",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": { color: "primary.main" },
          }}
        >
          Read more
        </Button>
      </Box>

      {/* RIGHT IMAGE */}
      <Box display={{ xs: "none", md: "block" }}>
        <img
          src={aboutImg}
          alt="About illustration"
          style={{ width: 420 }}
        />
      </Box>
    </Box>
  );
};

export default About;

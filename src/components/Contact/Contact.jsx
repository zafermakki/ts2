import React, { useState } from "react";
import { Box, Typography,TextField,Button } from "@mui/material";
import contactImg from "../../assets/images/Group 2372.png";

const Contact = () => {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        px: { xs: 2, md: 10 },
        py: { xs: 8, md: 12 },
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 6,
        flexDirection: { xs: "column", md: "row" },
        position: "relative",
      }}
    >
      {/* IMAGE AREA - moved to the left */}
      <Box
        position="relative"
        display={{ xs: "none", md: "flex" }}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width={450}
        sx={{
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          mb={2}
          sx={{ fontSize: "64px", lineHeight: 1.1 }}
        >
          Got a project in{" "}
          <Box component="span" color="primary.main">
            mind?
          </Box>
        </Typography>
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <img
            src={contactImg}
            alt="Contact illustration"
            style={{ width: "100%", maxWidth: 420, height: "auto", display: "block" }}
          />
        </Box>
      </Box>

      {/* CONTENT - moved to the right */}
      <Box maxWidth={520} mx="auto" px={{ xs: 2, sm: 4 }}  py={4}>
      <Box display="flex" flexDirection="column" gap={3} ml={{ xs: 0, sm: 4 }}>
        {/* Name & Email Fields */}
        <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
          {/* Name Field */}
          <Box flex={1} display="flex" flexDirection="column" gap={1}>
            <Typography variant="subtitle2" fontWeight={600}>
              Your name
            </Typography>
            <TextField
              name="name"
              fullWidth
              placeholder="Name"
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  backgroundColor: "#393E4680",
                  borderRadius: 2,
                  paddingX: 2,
                  "& input": { color: "#fff" },
                },
              }}
            />
          </Box>

          {/* Email Field */}
          <Box flex={1} display="flex" flexDirection="column" gap={1}>
            <Typography variant="subtitle2" fontWeight={600}>
              Your email
            </Typography>
            <TextField
              name="email"
              type="email"
              fullWidth
              placeholder="Email"
              variant="filled"
              InputProps={{
                disableUnderline: true,
                sx: {
                  backgroundColor: "#393E4680",
                  borderRadius: 2,
                  paddingX: 2,
                  "& input": { color: "#fff" },
                },
              }}
            />
          </Box>
        </Box>

        {/* Message Field */}
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="subtitle2" fontWeight={600}>
            Your message
          </Typography>
          <TextField
            name="message"
            fullWidth
            multiline
            minRows={6}
            maxRows={10}
            placeholder="Message"
            variant="filled"
            InputProps={{
              disableUnderline: true,
              sx: {
                backgroundColor: "#393E4680",
                borderRadius: 2,
                paddingX: 2,
                "& input, & textarea": { color: "#fff" },
              },
            }}
          />
        </Box>

        {/* Send Button */}
            <Button
            variant="contained"
            sx={{
                textTransform: "none",
                backgroundColor: "#393E4680",
                color: "#fff",
                borderRadius: 2,
                py: 1.5,
                "&:hover": { backgroundColor: "#2F333E" },
                alignSelf: "flex-start", // يبقي الزر على نفس اتجاه الحقول
            }}
            >
             Send Message
            </Button>
            </Box>
        </Box>
    </Box>
  );
};

export default Contact;

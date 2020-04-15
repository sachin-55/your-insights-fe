import React from "react";
import { Box, Text } from "theme-ui";

const Banner = () => (
  <Box
    sx={{
      backgroundColor: "rgba(200,20,20,0.7)",
      color: "accent",
      paddingTop: "7",
      paddingBottom: "7",
      textAlign: "center"
    }}
  >
    <Text sx={{ fontSize: 3 }}>Share Your's </Text>
    <Text sx={{ fontSize: 6 }}>Views, Ideas, Thoughts, Knowledge</Text>
  </Box>
);

export default Banner;

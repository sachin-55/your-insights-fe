import React from "react";
import { Box, Text } from "theme-ui";
import './banner.scss';

const Banner = () => (
  <Box
    sx={{
      backgroundColor: 'rgba(255, 153, 0,0.7)',
      color: "accent",
      // paddingTop: "7",
      // paddingBottom: "7",
      textAlign: "center",
    }}
    className="banner"
  >
    <Text sx={{ fontSize: 5,color:'primary',textShadow:'2px 2px 3px black',marginBottom:4 }}>Share Your's </Text>
    <Box className="banner-wrapper">
      <div><div>Ideas</div></div>     
      <div><div>Knowledge</div></div>     
      <div><div>Views</div></div>     
      <div><div>Experience</div></div>     
    </Box>
  </Box>
);

export default Banner;

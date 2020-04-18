import React from "react";
import { Box, Text } from "theme-ui";
import './banner.scss';

const Banner = () => (
  <Box
    sx={{
      backgroundColor: 'highlight',
      color: "accent",
      // paddingTop: "7",
      // paddingBottom: "7",
      textAlign: "center",
    }}
    className="banner"
  >
    <Text sx={{ fontSize: 5,color:'primary',textShadow:'2px 2px 3px black',marginBottom:4 }}>Share Your's </Text>
    <Box className="banner-wrapper">
      <div>
        <div className="side-card ">Knowledge</div>
        <div className='mirror side-card'>Experience</div>

      </div>
      <div>
      <div  className="side-card">Views</div>
      <div className='mirror side-card'>Ideas</div>

      </div>
    </Box>
  
  </Box>
);

export default Banner;

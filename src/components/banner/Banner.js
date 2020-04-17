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
    <Text sx={{ fontSize: 4,color:'wheat',marginBottom:4 }}>Share Your's </Text>
    <Box className="banner-wrapper">
      <div>
        <div>Knowledge</div>
        <div className='mirror'>Experience</div>

      </div>
      <div>
      <div>Views</div>
      <div className='mirror'>Ideas</div>

      </div>
    </Box>
  
  </Box>
);

export default Banner;

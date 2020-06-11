import React from "react";
import { Box, Text } from "theme-ui";
import './banner.scss';
import '../../../theme/theme';

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
    <Text sx={{
      position:'absolute', top:'50%',left:'50%',transform:'translate(-50%,calc(-50% + 25px))',zIndex:1,
      fontSize: 6,
      color:'primary',
      fontWeight:'900',
      padding:'3',
      borderRadius:'50%',
      textShadow:'2px 2px 3px #000',
      background:"linear-gradient(to bottom, rgba(0,0,0, 0.7),  rgba(0,0,0, 0.7)),url('https://res.cloudinary.com/nihcas/image/upload/v1587222428/zl8q96ehjk2hlpbf9qfc.jpg')",
      }}>Share Your's </Text>
      <div className='banner-wrapper'>
        <div><div>Ideas</div></div>     
        <div><div>Knowledge</div></div>     
        <div><div>Views</div></div>     
        <div><div>Experience</div></div>   
      </div>
  </Box>
);

export default Banner;

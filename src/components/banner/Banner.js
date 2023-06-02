import React from "react";
import { Box, Text, useThemeUI } from "theme-ui";
import './banner.scss';
import '../../../theme/theme';
import BannerBg from '../../assets/banner_bg.jpg';
import DarkBannerBg from '../../assets/night_banner_bg.jpg';
const Banner = () => {
  const { theme,colorMode }=useThemeUI();
  const BannerImage = colorMode !== 'dark'?BannerBg:DarkBannerBg;
   return (
  <Box 
    sx={{
      color: "accent",
      // paddingTop: "7",
      // paddingBottom: "7",
      textAlign: "center",
      backgroundImage:`url(${BannerImage})}})`,
    }}
    className="banner"
  >
    <Text sx={{
      fontSize: 6,
      color:'primary',
      fontWeight:'900',
      textShadow:`2px 2px 3px ${theme.colors.secondary}`,
      }}>Share Your's </Text>
     
     <Box className='banner-content'>
      
      <Text 
      sx={{
              color:'altText',
              textShadow:`0px 0px 3px ${theme.colors.text}`
      }}
      className='banner-subText' >Ideas</Text>
      <Text 
      sx={{
        color:'altText',
        textShadow:`0px 0px 3px ${theme.colors.text}`

      }}
      className='banner-subText'>Knowledge</Text>
      <Text 
      sx={{
        color:'altText',
        textShadow:`0px 0px 3px ${theme.colors.text}`

      }}
      className='banner-subText'>Views</Text>
      <Text 
      sx={{
        color:'altText',
        textShadow:`0px 0px 3px ${theme.colors.text}`

      }}
      className='banner-subText'>Experiences</Text>
     </Box>
  </Box>
)};

export default Banner;

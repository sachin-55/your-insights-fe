import React from "react";
import { Box } from "theme-ui";
import './footer.scss';

const Footer = () => (
  <Box
    sx={{
      backgroundColor: "primary",
      color: "gray",
      textAlign: "center",
      padding: "3",
      position: "sticky",
      top: "80vh",
      height: "150px",
      width: "100%",
    }}
  >
    <Box>
      Created By:
    </Box>
    <Box sx={{fontSize:'5'}} className="footer-creator">
      Sachin Bhattarai
    </Box>
    <Box>
      &copy;2020
    </Box>
  </Box>
);

export default Footer;

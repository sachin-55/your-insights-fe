import React from "react";
import { Box } from "theme-ui";

const DimBackground = ({ onClose }) => (
  <Box
    sx={{
      minHeight: "100vh",
      width: "100vw",
      position: "absolute",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0,0,0,0.7)",
      zIndex: 30,
      position: "fixed"
    }}
    onClick={onClose}
  />
);

export default DimBackground;

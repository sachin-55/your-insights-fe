import React from "react";
import { Button as ButtonThemeUI } from "theme-ui";
import PropTypes from "prop-types";
import ButtonLoading from "./ButtonLoading";

const Button = ({ children,loading=false, ...restProps }) => (
  <ButtonThemeUI {...restProps}>
    {loading?<ButtonLoading/>:children}
  </ButtonThemeUI>
);
export default Button;

Button.prototype = {
  children: PropTypes.any,
  sx: PropTypes.object,
  loading:PropTypes.bool
};

import React from "react";
import { Box, Label, Input } from "theme-ui";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Button from "../button";

const initialState = {
  fullname: "",
  email: "",
  confirmPassword: "",
  password: ""
};

const reducer = (state, { field, value }) => ({
  ...state,
  [field]: value
});

const Signup = ({loggedIn,setUser}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const history = useHistory();
  const [loading,setLoading] = React.useState(false);

  const handleChange = e => {
    const { target } = e;
    dispatch({ field: target.name, value: target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const url = process.env.API_URL;
setLoading(true)
    try {
      const response = await Axios.post(`${url}/api/users/signup`, {
        fullname: state.fullname,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword
      });
      if (response.data.status === "success") {
        localStorage.setItem("jwtToken", response.data.token);
        loggedIn();
        setLoading(false);
        localStorage.setItem('user',JSON.stringify(response.data.data.user));

        history.push({
          pathname:'/home',
          state:{
            user:response.data.data.user  
          }
        });
      }
    } catch (err) {
      setLoading(false)
      alert(err.response.data.message);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      sx={{
        width: "40%",
        margin: "0 auto"
      }}
    >
      <Label htmlFor="fullname">Fullname</Label>
      <Input
        value={state.fullname}
        name="fullname"
        mb={3}
        sx={{
          backgroundColor: "#ed9e6d",
          border: "1px solid transparent",
          outline: "none",
          "&:focus": {
            backgroundColor: "#fff"
          }
        }}
        onChange={handleChange}
      />
      <Label htmlFor="email">Email</Label>
      <Input
        value={state.email}
        name="email"
        mb={3}
        sx={{
          backgroundColor: "#ed9e6d",
          border: "1px solid transparent",
          outline: "none",
          "&:focus": {
            backgroundColor: "#fff"
          }
        }}
        onChange={handleChange}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        value={state.password}
        type="password"
        name="password"
        mb={3}
        sx={{
          backgroundColor: "#ed9e6d",
          border: "1px solid transparent",
          outline: "none",
          "&:focus": {
            backgroundColor: "#fff"
          }
        }}
        onChange={handleChange}
      />
      <Label htmlFor="confirmPassword">Confirm Password</Label>
      <Input
        value={state.confirmPassword}
        type="password"
        name="confirmPassword"
        mb={3}
        sx={{
          backgroundColor: "#ed9e6d",
          border: "1px solid transparent",
          outline: "none",
          "&:focus": {
            backgroundColor: "#fff"
          }
        }}
        onChange={handleChange}
      />
      <Button
        type="submit"
        sx={{
          backgroundColor: "secondary",
          outline: "none"
        }}
        loading={loading}
      >
        Signup
      </Button>
    </Box>
  );
};

export default Signup;

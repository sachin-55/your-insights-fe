import React from "react";
import { Box, Label, Input } from "theme-ui";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import Button from "../button";

const initialState = {
  email: "",
  password: ""
};

const reducer = (state, { field, value }) => ({
  ...state,
  [field]: value
});

const Login = ({loggedIn}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const history = useHistory();
  const [loading,setLoading] = React.useState(false);


  const handleChange = e => {
    const { target } = e;
    dispatch({ field: target.name, value: target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    const url = process.env.API_URL;
    setLoading(true)
    loggedIn();
    

    try {
      const response = await Axios({
        method: "POST",
        url: `${url}/api/users/login`,
        data: {
          email: state.email,
          password: state.password
        },
        headers: {
          "Access-Control-Allow-Credentials": true,
        }
      });

      if (response.data.status === "success") {
        localStorage.setItem("jwtToken", response.data.token);

        loggedIn();
        setLoading(false)
        localStorage.setItem('user':response.data.data.user);

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
      onSubmit={handleLogin}
      sx={{ width: "40%", margin: "0 auto" }}
    >
      <Label htmlFor="email">Email</Label>
      <Input
        type="email"
        name="email"
        value={state.email}
        mb={3}
        sx={{ outline: "none" }}
        onChange={handleChange}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        type="password"
        name="password"
        value={state.password}
        mb={3}
        sx={{ outline: "none" }}
        onChange={handleChange}
      />
      <Button
        type="submit"
        sx={{ backgroundColor: "secondary", outline: "none" }}
        loading={loading}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;

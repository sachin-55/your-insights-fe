import React from 'react';
import { Box, Label, Input } from "theme-ui";
import { useHistory ,useParams} from "react-router-dom";
import axios from "axios";
import Button from "../button";

const initialState = {
    currentPassword: "",
    password: "",
    confirmPassword:""
  };
  
const reducer = (state, { field, value }) => ({
    ...state,
    [field]: value
  });

const _updatePassword = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const history = useHistory();
    const [loading,setLoading] = React.useState(false);
const {userId}=useParams()

    const handleChange = e => {
        const { target } = e;
        dispatch({ field: target.name, value: target.value });
      };

      const handleUpdate = async e => {
        e.preventDefault();
        const url = process.env.API_URL;
        const token = localStorage.getItem('jwtToken');
        setLoading(true)
      
        const config = {
          headers: { 
            'authorization': `Bearer ${token}`
           }
        }
        const userData={
          currentPassword:state.currentPassword,
          password:state.password,
          confirmPassword:state.confirmPassword
        }   
        const id=userId;
        try{
        await axios.patch(`${url}/api/users/updateMyPassword`,userData, config)
        .then((response)=>{
          if(response.data){
            setLoading(false)
            localStorage.setItem('jwtToken',response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.data.user));

            // history.push('/home');
            window.location.reload(true);  
          }
    
        })
        }catch(err){
            setLoading(false);
            alert(err.response.data.message)
            
        }
      }

    return (
        <Box
        as="form"
        onSubmit={handleUpdate}
        sx={{ width: ['90%',"40%"], margin: "0 auto" }}
      >
        <Label htmlFor="currentPassword">Current Password</Label>
        <Input
          type="password"
          name="currentPassword"
          value={state.currentPassword}
          mb={3}
          sx={{ outline: "none" }}
          onChange={handleChange}
        />  
        <Label htmlFor="password">New Password</Label>
        <Input
          type="password"
          name="password"
          value={state.password}
          mb={3}
          sx={{ outline: "none" }}
          onChange={handleChange}
        />  <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          mb={3}
          sx={{ outline: "none" }}
          onChange={handleChange}
        />
      
        <Button
          type="submit"
          sx={{ backgroundColor: "primary", outline: "none" }}
          loading={loading}
        >
          Update
        </Button>
      </Box>
    );
}

export default _updatePassword;

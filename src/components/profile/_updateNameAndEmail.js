import React from 'react';
import { Box, Label, Input } from "theme-ui";
import axios from "axios";
import Button from "../button";
 
// const initialState = {
//     email: "",
//     fullname: ""
//   };
  
  const reducer = (state, { field, value }) => ({
    ...state,
    [field]: value
  });

const _updateNameAndEmail = ({data}) => {
    const [state, dispatch] = React.useReducer(reducer, {email:data.email,fullname:data.fullname});
    const [loading,setLoading] = React.useState(false);

// React.useEffect(()=>{

//     if(localStorage.hasOwnProperty('user')){
//         const user = JSON.parse(localStorage.getItem('user'));
        
//         dispatch({field:'fullname',value:user.fullname});
//         dispatch({field:'email',value:user.email});
        
//     }
// },[]);

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
          fullname:state.fullname,
          email:state.email,
        }   
        // const id=data._id;
        try{
        await axios.patch(`${url}/api/users/updateMyNameAndEmail`,userData, config)
        .then((response)=>{
          if(response.data){
            setLoading(false)
            localStorage.setItem('user',JSON.stringify(response.data.data.user));
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
        <Label htmlFor="fullname">Full Name</Label>
        <Input
          type="text"
          name="fullname"
          value={state.fullname}
          mb={3}
          sx={{ outline: "none" }}
          onChange={handleChange}
        />
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          name="email"
          value={state.email}
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

export default _updateNameAndEmail;

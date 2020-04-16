import React from "react";
import { Box, Text, Avatar,useColorMode } from "theme-ui";
import { Link,useLocation } from "react-router-dom";
import Button from './../button';
import './titlebar.scss'
const Titlebar = ({ loggedIn,userData }) => { 
  const [mode,setMode] = useColorMode();
  const location = useLocation();
  const [name,setName] = React.useState(''); 

React.useEffect(()=>{
  if(userData){
    setName(userData.fullname.split(' ')[0]);
  }else{
    if(localStorage.getItem('user')){
      const user=JSON.parse(localStorage.getItem('user'));
      setName(user.fullname.split(' ')[0]);
      
    }
  }
},[userData])

  const toggleTheme=(e)=>{
    e.preventDefault();
    const theme = mode==='dark'?'light':'dark';
    setMode(theme)
    console.log(loggedIn);
    
  }
  
  return(
  <Box sx={{ display: "flex", flexDirection: "row", position: "relative" }}>
    
    <Box sx={{ width: "100vw" }}>
      <Box
        sx={{
          backgroundColor: "primary",
          color: "gray",
          lineHeight: "1.5",
          display: "flex",
          flexDirection: "column",
          textAlign: "center"
        }}
      >
        <Text sx={{ fontSize: 2 }}>Your's</Text>
        <Text sx={{ fontSize: 5 }}>Insights</Text>
      </Box>
    </Box>
    {loggedIn === true && localStorage.getItem('jwtToken') !== 'looggeeout' ?  (
      <Box
        sx={{
          backgroundColor: "transparent",
          height: "100%",
          position: "absolute",
          right: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "10",
          fontSize: 3
        }}
      >
        <Button style={{ outline:'none' ,cursor:'pointer', color: "#dfe3e8" }} onClick={toggleTheme}>
        {mode === 'dark'? '💡': '⚫️'}
        </Button>
        {/* <Box>{loggedIn}</Box> */}
        <Link to={{
          pathname:'/home',
          state:{
              user:userData
          }
        }} style={{ textDecoration: "none", color: "#dfe3e8" }}>
          Home
        </Link>
        <Box mx="3"  >
          <Link to="/profile/5" className='avatar-name'>
            <Avatar className='avatar' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
          <Box className='name'> {name}</Box>
          </Link>
        </Box>
      </Box>
    ) :  
    <Box
    sx={{
      backgroundColor: "transparent",
      height: "100%",
      position: "absolute",
      right: 0,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      zIndex: "10",
      fontSize: 3
    }}
  >
    <Button style={{ borderRadius : '0',outline:'none' ,cursor:'pointer', color: "#dfe3e8" }} onClick={toggleTheme}>
    {mode === 'dark'? '💡': '⚫️'}
    </Button>
  </Box>}

  </Box>
);
      }
export default Titlebar;

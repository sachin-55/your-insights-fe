import React from "react";
import { Box, Text, Avatar,useColorMode } from "theme-ui";
import { Link,useLocation } from "react-router-dom";
import Button from './../button';
import './titlebar.scss'
const Titlebar = ({ loggedIn,userData,scrollToRef }) => { 
  const [mode,setMode] = useColorMode();
  const location = useLocation();
  const [name,setName] = React.useState(''); 
  const [id,setId] = React.useState(''); 


React.useEffect(()=>{
  if(userData){
    setName(userData.fullname.split(' ')[0]);
  }else{
    if(localStorage.getItem('user')){
      const user=JSON.parse(localStorage.getItem('user'));
      setName(user.fullname.split(' ')[0]);
      setId(user._id);
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
    <Box sx={{width:'100vw'}}>
    <Link to='/' style={{textDecoration:'none'}}>
    <Box sx={{ width: "100%" }}>
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
    </Link>
    </Box>
    {loggedIn === true || (localStorage.getItem('jwtToken') !== 'loggedout' && localStorage.hasOwnProperty("jwtToken")) ?  (
      <Box
        sx={{
          backgroundColor: "transparent",
          height: "100%",
          position: "absolute",
          right: 0,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: "10",
          fontSize: 3
        }}
      >
        <Button style={{ outline:'none' ,cursor:'pointer', color: "#dfe3e8" }} onClick={toggleTheme}>
        {mode === 'dark'? '💡': '⚫️'}
        </Button>
        {/* <Box>{loggedIn}</Box> */}
        <Link to={{
          pathname:'/',
          state:{
              user:userData
          }
        }} style={{ textDecoration: "none" ,marginRight:'8px'}}>
          <Box className='link'>
          All Blogs
          </Box>
        </Link>
        <Link to={{
          pathname:'/home',
          state:{
              user:userData
          }
        }} style={{ textDecoration: "none"}}>
         <Box className='link'>
          Home
         </Box>
        </Link>
        <Box mx="3"  className='avatar-container'>
          <Link to={`/profile/${id}`} className='avatar-name'>
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
    <Button sx={{outline:'none','&:hover':{color:'secondary'}}} onClick={scrollToRef}>Login/SignUp</Button>

  </Box>}

  </Box>
);
      }
export default Titlebar;

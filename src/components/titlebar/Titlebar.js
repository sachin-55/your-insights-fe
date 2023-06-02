import React from "react";
import { Box, Text, Avatar,useColorMode, Image } from "theme-ui";
import { Link,useLocation } from "react-router-dom";
import Button from './../button';
import './titlebar.scss'
import Logo from '../../assets/YoursInsightsLogoTransparent.png';
const Titlebar = ({ loggedIn,scrollToRef}) => { 
  const [mode,setMode] = useColorMode();
  const location = useLocation();
  const [name,setName] = React.useState(''); 
  const [photo,setPhoto] = React.useState('');


React.useEffect(()=>{
  
  if(location.search === '?login'){
    scrollToRef();
  }

    if(localStorage.hasOwnProperty('user')&& localStorage.getItem('user') !=='' ){
      const user=JSON.parse(localStorage.getItem('user'));
      setName(user.fullname.split(' ')[0]);
      setPhoto(user.photo);
    
  }
},[localStorage.getItem('user'),location.search])

  const toggleTheme=(e)=>{
    e.preventDefault();
    const theme = mode==='dark'?'light':'dark';
    setMode(theme)
    console.log(loggedIn);
    
  }
  
  return(
  <Box sx={{ display: "flex", flexDirection: "row", position: "relative",  padding:'20px 0px',
            backgroundColor: "primary",
            alignItems:'center',
            justifyContent:'space-between'
  }} >
    {/* <Box sx={{width:'100vw'}}> */}
      <Link to='/' style={{textDecoration:'none'}}>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              color: "gray",
              lineHeight: "1.5",
              display: "flex",
              flexDirection: "column",
              textAlign: [ "left" ],
              paddingLeft:'50px'
            }}
          >
            <Image src={Logo} sx={{height:'50px' }}  />
            {/* <Text sx={{ fontSize: [3,4] }}>Your's Insights</Text> */}
          </Box>
        </Box>
      </Link>
    {/* </Box> */}
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
        <Button style={{ padding:'0px',marginRight:'15px',outline:'none',backgroundColor:'transparent',transform:'scale(0.9)','&:hover':{transform:'scale(1)'} ,cursor:'pointer', color: "#dfe3e8" }} onClick={toggleTheme}>
        {mode === 'dark'? '💡': '⚫️'}
        </Button>
        {/* <Box>{loggedIn}</Box> */}
        <Link to={{
          pathname:'/',
          state:{
          }
        }} style={{ textDecoration: "none" ,marginRight:'8px'}}>
          <Box className='link'>
          All Blogs
          </Box>
        </Link>
        <Link to={{
          pathname:'/home',
          state:{
          }
        }} style={{ textDecoration: "none"}}>
         <Box className='link'>
          Home
         </Box>
        </Link>
        {localStorage.hasOwnProperty('user') && localStorage.getItem('user') !==''?
        <Box mx={3} className='avatar-container'>
          <Link to={`/profile/${JSON.parse(localStorage.getItem('user'))._id}`} className='avatar-name'>
            <Avatar  className='avatar' src={photo?photo: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} />
          <Box className='name'> {name}</Box>
          </Link>
        </Box>
         :null}
      </Box>
    ) :  
    <Box
    sx={{
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
    <Button className='toggle-button' style={{ padding:'0px',marginRight:'15px',borderRadius : '0',backgroundColor:'transparent',transform:'scale(0.9)','&:hover':{transform:'scale(1)'},outline:'none' ,cursor:'pointer', color: "#dfe3e8",  }} onClick={toggleTheme}>
    {mode === 'dark'? '💡': '⚫️'}
    </Button>
    {location.pathname === '/'?
    <Button sx={{outline:'none', cursor:'pointer', padding:'0px', marginRight:'30px', fontSize:'15px',}}  onClick={scrollToRef}>Login/SignUp</Button>
    :<Link to='/?login' className='link login-link'>Login/SignUp</Link>
  }
  </Box>}

  </Box>
);
      }
export default Titlebar;

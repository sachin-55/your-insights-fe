import React from "react";
import { Box,Container, Text } from "theme-ui";
import Button from "../components/button";
import Login from "../components/login";
import Signup from "../components/signup";
import Banner from "../components/banner";
import Card from '../components/card';
import axios from "axios";

const Landingpage = (props) => {
  const [active, setActive] = React.useState("old");
  const tabColor1 = active === "old" ? "accent" : "transparent";
  const tabColor2 = active === "new" ? "accent" : "transparent";
  const [data,setData] = React.useState('');
  const [loading,setloading]=React.useState(true);

  React.useEffect(()=>{
    if(!data){
  
    const url = process.env.API_URL;
    const token = localStorage.getItem('jwtToken');
  
    const config = {
      headers: { 
        'authorization': `Bearer ${token}`
       }
    }
  
   axios.get(`${url}/api/blogs/public`, config)
    .then((response)=>{
      if(response.data){
        setloading(false);
        setData(response.data.blogs)
      }
    })
  }
  },[]);

  const createBlogCards = ()=>{
    let cards;
      if(data.length>0){
       cards =data.map(el=><Card key={el._id} id={el._id} title={el.title} content={el.content} createdAt={el.createdAt} userData={el.user} viewOnly={true}/>) 
    
    }else{
      cards='No Blogs Found. Create a New Blog'
    }
      return cards;
  }

  return (
    <>
      <Banner />
      {localStorage.getItem('jwtToken')==='loggedout' || !localStorage.hasOwnProperty("jwtToken") ?
      <Box ref={props.loginRef}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            textAlign: "center",
            cursor: "pointer"
          }}
        >
          <Box
            sx={{
              width: "50%",
              backgroundColor: tabColor1,
              padding: 2,
              borderBottom: "1px solid rgba(255,255,255,0.5)"
            }}
            onClick={() => setActive("old")}
          >
            Registered User
          </Box>

          <Box
            sx={{
              width: "50%",
              padding: 2,
              backgroundColor: tabColor2,
              borderBottom: "1px solid rgba(255,255,255,0.5)"
            }}
            onClick={() => setActive("new")}
          >
            New User
          </Box>
        </Box>
        <Box
          sx={{
            textAlign: "center",
            backgroundColor: "accent",
            padding: "4"
          }}
        >
          {active === "old" ? 
          <Login  loggedIn={props.onLogin}/>
          // <Box>Login</Box> 
          :
          // <Box>Signup</Box> 

           <Signup  loggedIn={props.onLogin} />
           }
        </Box>
      </Box>
      :null}

       
    <Container sx={{ width: "90vw",minHeight:'70vh', backgroundColor: "gray",paddingTop:1,paddingBottom:5, marginBottom:6 }}>
    <Box sx={{textAlign:'center',fontSize:6,color:'accent',margin:'25px 0px 10px', marginBottom:4,textShadow:'1px 1px 3px black'}}>All Blogs</Box>
    <Box 
    sx={{
      display:'flex',justifyContent:'space-around',flexWrap:'wrap'
    }}
    >

        {loading === true ?<Text sx={{fontSize:'5'}}>Loading ...</Text>:createBlogCards()}
    </Box>
    </Container>

    </>
  );
};

export default Landingpage;

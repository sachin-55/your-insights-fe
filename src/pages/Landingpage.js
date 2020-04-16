import React from "react";
import { Box } from "theme-ui";
import Button from "../components/button";
import Login from "../components/login";
import Signup from "../components/signup";
import Banner from "../components/banner";

const Landingpage = (props) => {
  const [active, setActive] = React.useState("old");
  const tabColor1 = active === "old" ? "accent" : "transparent";
  const tabColor2 = active === "new" ? "accent" : "transparent";

React.useEffect(()=>{
props.onLogout()
},[])

  return (
    <>

      <Banner />

      <Box>
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
    </>
  );
};

export default Landingpage;
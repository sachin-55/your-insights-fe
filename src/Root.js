import React, { Suspense } from "react";
import "./app.scss";
import "./reset.css";
import { ThemeProvider } from "theme-ui";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import theme from "../theme/theme";
import LandingPage from "./pages/Landingpage";
import HomePage from "./pages/Homepage";
import Footer from "./components/footer";
import Profile from './components/profile';
import Blog from './components/blog';
import Titlebar from './components/titlebar';

const Root = () =>{
const [loggedInStatus,setLoggedInStatus] = React.useState(false);

const loginRef = React.useRef(null);

const scrollToRef=()=>{
  window.scrollTo({behavior:'smooth',top: loginRef.current.offsetTop})
}


 return(
  <ThemeProvider theme={theme}>
    <Router>
      <Titlebar loggedIn={loggedInStatus}  scrollToRef={scrollToRef}/>

      <Switch>
        <Route exact path="/">
          <LandingPage    onLogin={()=>setLoggedInStatus(true)} loginRef={loginRef} />
        </Route>
        <Route exact path="/home">
          <HomePage/>
        </Route>
        <Route exact path="/profile/:userId">
          <Profile onLogout={()=>setLoggedInStatus(false)}/>
        </Route>
        <Route exact path="/blog/:blogId">
          <Blog />
        </Route>
        <Route render={() => <h1>Not Found</h1>} />
      </Switch>
      <Footer />
    </Router>
  </ThemeProvider>
);}

export default Root;

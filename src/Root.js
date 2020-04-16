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
const [user,setUser]=React.useState('');

const setUserData=(data)=>{
  setUser(data)
}

 return(
  <ThemeProvider theme={theme}>
    <Router>
      <Titlebar loggedIn={loggedInStatus} userData={user}/>

      <Switch>
        <Route exact path="/">
          <LandingPage    onLogin={()=>setLoggedInStatus(true)} onLogout={()=>setLoggedInStatus(false)}/>
        </Route>
        <Route exact path="/home">
          <HomePage fillData={(data)=>setUserData(data)} />
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

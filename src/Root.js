import React from 'react';
import './app.scss';
import "./reset.css";
import theme from '../theme/theme';
import { ThemeProvider } from 'theme-ui';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';
import LandingPage from "./pages/Landingpage";

const Root = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <LandingPage />
                    </Route>
                    <Route render={() => <h1>Not Found</h1>} />

                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default Root;

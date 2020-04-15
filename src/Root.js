import React from 'react';
import './app.scss';
import theme from '../theme/theme';
import { ThemeProvider } from 'theme-ui';
import { BrowserRouter as Router } from 'react-router-dom';

const Root = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <div className="match">
                    <h1>Match Finder</h1>
                 Higher Root
                </div>
            </Router>
        </ThemeProvider>
    );
}

export default Root;

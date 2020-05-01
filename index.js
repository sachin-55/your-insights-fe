/** @jsx jsx */
import "@babel/polyfill";
import { hot } from 'react-hot-loader/root';
import React from 'react';
import { jsx } from 'theme-ui';
import ReactDOM from 'react-dom';
import Root from './src/Root';


const Index = hot(() => {
    return (
        <Root />
    );
});


ReactDOM.render(<Index />, document.getElementById('root'))


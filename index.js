/** @jsx jsx */
import "@babel/polyfill";
import React from 'react';
import { jsx } from 'theme-ui';
import ReactDOM from 'react-dom';
import Root from './src/Root';

import { hot } from 'react-hot-loader/root';

const Index = hot(() => {
    return (
        <Root />
    );
});


ReactDOM.render(<Index />, document.getElementById('root'))


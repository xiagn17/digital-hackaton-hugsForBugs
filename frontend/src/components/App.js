import React from 'react';
import Router from './Router';
import { UserContextProvider } from '../context/UserContext';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
    return (
        <UserContextProvider>
            <CssBaseline />
            <Router />
        </UserContextProvider>
    );
}

export default App;

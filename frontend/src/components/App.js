import React from 'react';
import Router from './Router';
import { UserContextProvider } from '../context/UserContext';
import { TaskContextProvider } from '../context/TaskContext';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
    return (
        <UserContextProvider>
            <TaskContextProvider>
                <CssBaseline />
                <Router />
            </TaskContextProvider>
        </UserContextProvider>
    );
}

export default App;

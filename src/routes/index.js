import React from 'react';
import {
    BrowserRouter as Router, Route, Redirect,
} from 'react-router-dom';
import SingUp from '../pages/SignUp'
import Login from '../pages/Login'
import GithubInfo from '../pages/GithubInfo';
import useLocalStorage from '../hooks/UseLocalStorage';

const AppRoutes = function () {
    const [userValid] = useLocalStorage('TokenBuild', null);
        if (!userValid) {
        return (
            <Router>
                <Route path='/sign-up' exact>
                    <SingUp />
                </Route>
                <Route path='/login' exact>
                    <Login />
                </Route>
                <Route path='/githubInfo' exact>
                    <GithubInfo />
                </Route>
                <Redirect to='/sign-up'/>
            </Router>
        )
    }
    return (
        <Router>
            <Route path='/github' exact>
                <GithubInfo />
            </Route>
            <Redirect to='/github' />
        </Router>
    );
}
export default AppRoutes;

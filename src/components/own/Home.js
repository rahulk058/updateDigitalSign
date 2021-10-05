import React from 'react';
import Screen from '../own/Screen';

import Login from '../own/Login';
import App from '../../containers/App'
import Groups from '../own/Groups'
import Playlists from '../own/Playlists'
import SignUp from "./Signup";
import Timeline from "./Timeline";
import store from '../../Redux/store';
import {Switch, Route, HashRouter, BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import Library from "./Library";

function Home() {
    return (
        <>
            <Provider store={store} >
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Login}></Route>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/screen" exact component={Screen}></Route>
                    <Route path="/editor" exact component={App}></Route>
                    <Route path="/group" component={Groups}></Route>
                    <Route path="/playlists" component={Playlists}></Route>
                    <Route path="/library" component={Library}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/schedule" component={Timeline}></Route>
                </Switch>
            </HashRouter>
            </Provider>
        </>
    );
}

export default Home;

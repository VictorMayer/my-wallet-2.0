import React from "react";
import Home from "./components/Home.js"
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import UserContext from "./contexts/UserContext.js";
import NewCashFlow from "./components/NewCashFlow.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./css/reset.css";
import "./css/globalStyles.css";

export default function App() {

    const [user, setUser] = React.useState({});

    return(
        <UserContext.Provider value={{user, setUser}}>
            <BrowserRouter>
                <Switch>
                    <Route path="/sign-in" exact component={Login} />
                </Switch>
                <Switch>
                    <Route path="/sign-up" exact component={Register} />
                </Switch>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
                <Switch>
                    <Route path="/new-cashflow/:type" exact component={NewCashFlow} />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home.js"
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import NewCashFlow from "./components/NewCashFlow.js";
import "./css/reset.css";
import "./css/globalStyles.css";

export default function App() {
    return(
        <>
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
        </>
    );
}
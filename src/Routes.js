import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Alert from "./Alert/Alert";

export default class Routes extends Component {
    render() {
        return (
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/Alert" component={Alert} />
                    {/* <Route path="/Contact" component={Contact} />
                    <Route path="/Products" component={Products} /> */}
                </Switch>
        )
    }
}
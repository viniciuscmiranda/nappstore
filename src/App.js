import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GlobalStyle from "./styles/global";
import {Container} from "./styles";

import Home from './components/Home';

class App extends Component {
    render() {
        return (
            <Router>

                <Container>
                    <Switch>
                        <Route path="/" exact component={Home}/>

                        <Route path="/sales" exact component={Home}/>
                        <Route path="/sales/new"/>
                        <Route path="/sales/:id"/>
                        <Route path="/sales/edit/:id" />

                        <Route path="/products" exact/>
                        <Route path="/products/new"/>
                        <Route path="/products/:id"/>
                        <Route path="/products/edit/:id" />

                        <Route path="/clients" exact/>
                        <Route path="/clients/new"/>
                        <Route path="/clients/:id"/>
                        <Route path="/clients/edit/:id"/>

                    </Switch>
                    <GlobalStyle/>
                </Container>

            </Router>
        );
    }
}

export default App;

import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import GlobalStyle from "./styles/global";
import {Container} from "./styles";

import Clients from './components/Clients';
import NewClient from './components/NewClient';
import Products from './components/Products';
import NewProduct from './components/NewProduct';
import Home from './components/Home';
import NewSale from './components/NewSale';
import Nav from './components/Nav';
import NotFound from './components/NotFound';

class App extends Component {
    render() {
        return (
            <Router>
                <Nav/>

                <Container>
                    <Switch>
                        <Route path="/" exact component={Home}/>

                        <Route path="/sales" exact component={Home}/>
                        <Route path="/sales/new" component={NewSale}/>
                        <Route path="/sales/:id"/>
                        <Route path="/sales/edit/:id" />

                        <Route path="/products" exact component={Products}/>
                        <Route path="/products/new" component={NewProduct}/>
                        <Route path="/products/:id"/>
                        <Route path="/products/edit/:id" />

                        <Route path="/clients" exact component={Clients}/>
                        <Route path="/clients/new" component={NewClient}/>
                        <Route path="/clients/:id"/>
                        <Route path="/clients/edit/:id"/>

                        <Route component={NotFound} />
                    </Switch>
                    <GlobalStyle/>
                </Container>

            </Router>
        );
    }
}

export default App;

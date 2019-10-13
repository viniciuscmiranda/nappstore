import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Components
import GlobalStyle from "./styles/global";
import {Container} from "./styles";

//Routes
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
                {/* Nav bar */}
                <Nav/>

                {/* Main Container */}
                <Container>
                    <Switch>
                        {/* Default Route */}
                        <Route path="/" exact component={Home}/>

                        {/* Sales Routes */}
                        <Route path="/sales" exact component={Home}/>
                        <Route path="/sales/new" component={NewSale}/>
                        <Route path="/sales/:id"/>
                        <Route path="/sales/edit/:id" />

                        {/* Products Routes */}
                        <Route path="/products" exact component={Products}/>
                        <Route path="/products/new" component={NewProduct}/>
                        <Route path="/products/:id"/>
                        <Route path="/products/edit/:id" />

                        {/* Clients Routes */}
                        <Route path="/clients" exact component={Clients}/>
                        <Route path="/clients/new" component={NewClient}/>
                        <Route path="/clients/:id"/>
                        <Route path="/clients/edit/:id"/>

                        {/* Not Found Route */}
                        <Route component={NotFound} />
                    </Switch>
                    {/* Import global styles */}
                    <GlobalStyle/>
                </Container>
            </Router>
        );
    }
}

export default App;

import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

//Components
import GlobalStyle from "./styles/global";
import {Container} from "./styles";

//Routes
import ClientList from './components/ClientList';
import ClientNew from './components/ClientNew';
import ClientPage from './components/ClientPage';
import ClientEdit from './components/ClientEdit';
import ProductList from './components/ProductList';
import ProductNew from './components/ProductNew';
import ProductPage from './components/ProductPage';
import ProductEdit from './components/ProductEdit';
import SaleList from './components/SaleList';
import SaleNew from './components/SaleNew';
import SalePage from './components/SalePage';
import SaleEdit from './components/SaleEdit';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

class App extends Component {
    render() {
        return (
            <Router>
                {/* Nav bar */}
                <NavBar/>

                {/* Main Container */}
                <Container>
                    <Switch>
                        {/* Default Route */}
                        <Route path="/" exact component={SaleList}/>

                        {/* Sales Routes */}
                        <Route path="/sales" exact component={SaleList}/>
                        <Route path="/sales/new" exact component={SaleNew}/>
                        <Route path="/sales/:id" exact component={SalePage}/>
                        <Route path="/sales/edit/:id" exact component={SaleEdit}/>

                        {/* Products Routes */}
                        <Route path="/products" exact component={ProductList}/>
                        <Route path="/products/new" exact component={ProductNew}/>
                        <Route path="/products/:id" exact component={ProductPage}/>
                        <Route path="/products/edit/:id" exact component={ProductEdit}/>

                        {/* Clients Routes */}
                        <Route path="/clients" exact component={ClientList}/>
                        <Route path="/clients/new" exact component={ClientNew}/>
                        <Route path="/clients/:id" exact component={ClientPage}/>
                        <Route path="/clients/edit/:id" exact component={ClientEdit}/>

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

import React, {Component} from 'react';
import { Main } from './styles';
import {MdFace, MdList, MdShoppingCart} from 'react-icons/md'
import {Link} from 'react-router-dom';
import {NoConnection, Loader} from '../../styles/styles';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners';
import Logo from '../Logo/index';


export default class Home extends Component{
    state = {
        cli: "",
        prod: "",
        sale: "",

        loading: true,
        connection: true
    }
    
    async componentDidMount() {
        try{
            const cli = await api.get('/clients');
            const prod = await api.get('/products');
            const sale = await api.get('/sales');

            this.setState({
                cli: Object.keys(cli.data).length,
                prod: Object.keys(prod.data).length,
                sale: Object.keys(sale.data).length,

                loading: false,
                connection: true
            })
            
        } catch{
            this.setState({loading: false, connection: false});
        }
    }

    render() {
        const {connection, loading, cli, prod, sale} = this.state;

        return (
          <Main>
            <Logo/>

            {/* Connection error */}
            {!connection && (<NoConnection/>)}
            {/* While loading */}
            {loading && (<Loader><SyncLoader/></Loader>)}

            {(!loading && connection) && (
                <div className="icons">

                    <div className="item">
                        <Link to="/clients"><MdFace className="icon" /></Link>
                        <Link to="/clients" id="clients" className="link">Clientes ({cli})</Link>
                    </div>

                    <div className="item">
                        <Link to="/products"><MdList className="icon" /></Link>
                        <Link to="/products" id="products" className="link">Produtos ({prod})</Link>
                    </div>

                    <div className="item">
                        <Link to="/sales"><MdShoppingCart className="icon" /></Link>
                        <Link to="/sales" id="sales" className="link">Vendas ({sale})</Link>
                    </div>
                </div>
            )}

          </Main>
        );
      }

}



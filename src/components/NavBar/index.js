//NavBar
import React from 'react';
import {NavContainer} from './styles';
import {MdFace, MdList, MdShoppingCart} from 'react-icons/md'
import {Link} from 'react-router-dom';

export default function NavBar() {
    return (
        <NavContainer>
            <ul>
                <li>
                    <Link to="/clients" title="Clientes"><span>Clientes</span><MdFace/></Link>
                </li>
                <li>
                    <Link to="/products" title="Produtos"><span>Produtos</span><MdList/></Link>
                </li>
                <li>
                    <Link to="/sales" title="Vendas"><span>Vendas</span><MdShoppingCart/></Link>
                </li>
            </ul>
        </NavContainer>
    );
}

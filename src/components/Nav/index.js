//NavBar

import React from 'react';

import {NavContainer, NavList, NavListItem} from './styles';

import {MdFace, MdList, MdShoppingCart} from 'react-icons/md'
import {Link} from 'react-router-dom';

export default function Nav() {
    return (
        <NavContainer>
            <NavList>
                <NavListItem>
                    <Link to="/clients" title="Clientes"><span>Clientes</span><MdFace/></Link>
                </NavListItem>
                <NavListItem>
                    <Link to="/products" title="Produtos"><span>Produtos</span><MdList/></Link>
                </NavListItem>
                <NavListItem>
                    <Link to="/sales" title="Vendas"><span>Vendas</span><MdShoppingCart/></Link>
                </NavListItem>
            </NavList>
        </NavContainer>
    );
}

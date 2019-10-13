import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners'

import {Title, TableLayout, TableHeader} from '../../styles/tableStyles';
import TableContent from './TableContent';
import {NewButton} from '../../styles/styles'


export default class Products extends Component {
    state = {
        productsFromDatabase: [],
        loading: true
    };

    async componentDidMount() {
        const data = await api.get('/products');
        this.setState({productsFromDatabase: data.data, loading: false});
    };

    //Delete client
    deleteProductHandler = async id => {
        api.delete(`/clients/${id}`);
        const item = document.getElementById(id);
        item.parentNode.removeChild(item);
    }

    render() {
        const {productsFromDatabase, loading} = this.state;

        return (
            <section>
                <Title>Produtos</Title>

                <TableLayout>
                    <thead>
                        <tr>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>Preço</TableHeader>
                            <TableHeader>Múltiplo</TableHeader>
                            <TableHeader>Registro</TableHeader>
                            <TableHeader>Ações</TableHeader>
                        </tr>
                        <tr><th><br></br></th></tr>
                    </thead>
                    {loading && ( <tbody className="loader"><tr><td><SyncLoader/></td></tr></tbody> )}
                    <TableContent products={productsFromDatabase} onDelete={this.deleteProductHandler}/>
                </TableLayout>

                <Link to="products/new"><NewButton>Cadastrar Produto</NewButton></Link>
            </section>
        );
    }
}

import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners'

import {TableLayout, TableHeader} from '../../styles/tableStyles';
import TableContent from './TableContent';
import {Title, NewButton, NoConnection, Loader} from '../../styles/styles';

export default class Products extends Component {
    state = {
        productsFromDatabase: [],
        loading: true,
        connection: true
    };

    async componentDidMount() {
        try {
            const data = await api.get('/products');
            this.setState({productsFromDatabase: data.data, loading: false, connection: true});
        } catch {
            this.setState({loading: false, connection: false});
        }
    };

    //Delete product
    deleteProductHandler = async id => {
        api.delete(`/products/${id}`);
        const item = document.getElementById(id);
        item
            .parentNode
            .removeChild(item);
    }

    render() {
        const {productsFromDatabase, loading, connection} = this.state;

        return (
            <section>
                <Title>Produtos</Title>

                {!connection && (<NoConnection/>)}
                {loading && (
                    <Loader><SyncLoader/></Loader>
                )}

                {(connection && !loading) && (
                    <TableLayout>
                        <thead>
                            <tr>
                                <TableHeader>Nome</TableHeader>
                                <TableHeader>Preço</TableHeader>
                                <TableHeader>Múltiplo</TableHeader>
                                <TableHeader>Registro</TableHeader>
                                <TableHeader>Ações</TableHeader>
                            </tr>
                            <tr>
                                <th>
                                    <br></br>
                                </th>
                            </tr>
                        </thead>
                        <TableContent
                            products={productsFromDatabase}
                            onDelete={this.deleteProductHandler}/>
                    </TableLayout>
                )}

                <Link to="products/new">
                    <NewButton>Cadastrar Produto</NewButton>
                </Link>
            </section>
        );
    }
}

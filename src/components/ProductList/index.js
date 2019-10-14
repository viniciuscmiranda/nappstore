import React, {Component} from 'react';
import api from '../../services/api';
import {Link} from 'react-router-dom';
import {SyncLoader} from 'react-spinners'
import {TableLayout, TableHeader} from '../../styles/tableStyles';
import {Title, NewButton, NoConnection, Loader} from '../../styles/styles';
import TableContent from './TableContent';

export default class ProductList extends Component {
    // State
    state = {
        productsFromDatabase: [],
        loading: true,
        connection: true
    };

    // Get prodcuts from api
    async componentDidMount() {
        try {
            const data = await api.get('/products');
            this.setState({productsFromDatabase: data.data, loading: false, connection: true});
        } catch {
            this.setState({loading: false, connection: false});
        }
    };

    //Delete product from database
    deleteProductHandler = async id => {
        api.delete(`/products/${id}`);
        //Remove from table
        const item = document.getElementById(id);
        item.parentNode.removeChild(item);
    }

    render() {
        const {productsFromDatabase, loading, connection} = this.state;

        return (
            <section>
                <Title>Produtos</Title>

                {/* Connection error */}
                {!connection && (<NoConnection/>)}
                {/* While loading */}
                {loading && (<Loader><SyncLoader/></Loader>)}

                {/* If connected and not loading */}
                {(connection && !loading) && (
                    // Render Table
                    <TableLayout>
                    <table>
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
                        {/* Table Content */}
                        <TableContent products={productsFromDatabase} onDelete={this.deleteProductHandler}/>
                    </table>
                    </TableLayout>
                )}

                {/* Go to new product */}
                <Link to="products/new"><NewButton>Cadastrar Produto</NewButton></Link>
            </section>
        );
    }
}

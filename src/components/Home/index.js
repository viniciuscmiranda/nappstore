import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners'

import {TableLayout, TableHeader} from '../../styles/tableStyles';
import TableContent from './TableContent';
import {Title, NewButton, NoConnection, Loader} from '../../styles/styles';

export default class Home extends Component {
    state = {
        salesFromDatabase: [],
        loading: true,
        connection: true
    };

    async componentDidMount() {
        try {
            const data = await api.get('/sales');
            const newData = await this.setClientNames(data.data);
            this.setState({salesFromDatabase: newData, loading: false, connection: true});
        } catch {
            this.setState({loading: false, connection: false});
        }
    };

    //Get client name from database
    setClientNames = async sales => {
        const aux = sales.map(async sale => {
            const c = await api.get(`/clients/${sale.clientId}`);
            if (c.data !== null) 
                sale.clientName = c.data.name;
            else 
                sale.clientName = "Not Found";
            }
        );

        await Promise.all(aux);
        return sales;
    }

    //Delete sale
    deleteSaleHandler = async id => {
        api.delete(`/sales/${id}`);

        const item = document.getElementById(id);
        item
            .parentNode
            .removeChild(item);
    }

    render() {
        const {salesFromDatabase, loading, connection} = this.state;

        return (
            <section>
                <Title>Vendas</Title>

                {!connection && (<NoConnection/>)}
                {loading && (
                    <Loader><SyncLoader/></Loader>
                )}

                {(connection && !loading) && (

                    <TableLayout>
                        <thead>
                            <tr>
                                <TableHeader>Cliente</TableHeader>
                                <TableHeader>Valor</TableHeader>
                                <TableHeader>Data</TableHeader>
                                <TableHeader>Ações</TableHeader>
                            </tr>
                            <tr>
                                <th>
                                    <br></br>
                                </th>
                            </tr>
                        </thead>
                        {loading && (
                            <tbody className="loader">
                                <tr>
                                    <td><SyncLoader/></td>
                                </tr>
                            </tbody>
                        )}
                        <TableContent sales={salesFromDatabase} onDelete={this.deleteSaleHandler}/>
                    </TableLayout>
                )}

                <Link to="sales/new">
                    <NewButton>Cadastrar Venda</NewButton>
                </Link>
            </section>
        );
    }
}

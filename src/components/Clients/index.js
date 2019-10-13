import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners'

import {TableLayout, TableHeader} from '../../styles/tableStyles';
import TableContent from './TableContent';
import {Title, NewButton, NoConnection, Loader} from '../../styles/styles';

export default class Clients extends Component {
    state = {
        clientsFromDatabase: [],
        loading: true,
        connection: true
    };

    async componentDidMount() {
        try {
            const data = await api.get('/clients');
            this.setState({clientsFromDatabase: data.data, loading: false, connection: true});
        } catch {
            this.setState({loading: false, connection: false});
        }
    };

    //Delete client
    deleteClientHandler = async id => {
        api.delete(`/clients/${id}`);
        const item = document.getElementById(id);
        item
            .parentNode
            .removeChild(item);
    }

    render() {
        const {clientsFromDatabase, loading, connection} = this.state;

        return (
            <section>
                <Title>Clientes</Title>

                {!connection && (<NoConnection/>)}
                {loading && (
                    <Loader><SyncLoader/></Loader>
                )}

                {(connection && !loading) && (
                    <TableLayout>
                        <thead>
                            <tr>
                                <TableHeader>Nome</TableHeader>
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
                            clients={clientsFromDatabase}
                            onDelete={this.deleteClientHandler}/>
                    </TableLayout>
                )}

                <Link to="clients/new">
                    <NewButton>Cadastrar Cliente</NewButton>
                </Link>
            </section>
        );
    }
}

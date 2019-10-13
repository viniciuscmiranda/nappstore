import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners'

import {Title, TableLayout, TableHeader} from '../../styles/tableStyles';
import TableContent from './TableContent';
import {NewButton} from '../../styles/styles'


export default class Clients extends Component {
    state = {
        clientsFromDatabase: [],
        loading: true
    };

    async componentDidMount() {
        const data = await api.get('/clients');
        this.setState({clientsFromDatabase: data.data, loading: false});
    };

    //Delete client
    deleteClientHandler = async id => {
        api.delete(`/clients/${id}`);
        const item = document.getElementById(id);
        item.parentNode.removeChild(item);
    }

    render() {
        const {clientsFromDatabase, loading} = this.state;

        return (
            <section>
                <Title>Clientes</Title>

                <TableLayout>
                    <thead>
                        <tr>
                            <TableHeader>Nome</TableHeader>
                            <TableHeader>Registro</TableHeader>
                            <TableHeader>Ações</TableHeader>
                        </tr>
                        <tr><th><br></br></th></tr>
                    </thead>
                    {loading && ( <tbody className="loader"><tr><td><SyncLoader/></td></tr></tbody> )}
                    <TableContent clients={clientsFromDatabase} onDelete={this.deleteClientHandler}/>
                </TableLayout>

                <Link to="clients/new"><NewButton>Cadastrar Cliente</NewButton></Link>
            </section>
        );
    }
}

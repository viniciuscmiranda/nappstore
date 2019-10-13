import React, {Component} from 'react';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners'
import {Link} from 'react-router-dom';
import {TableLayout, TableHeader} from '../../styles/tableStyles';
import {Title, NewButton, NoConnection, Loader} from '../../styles/styles';
import TableContent from './TableContent';


export default class Clients extends Component {
    // State
    state = {
        clientsFromDatabase: [],
        loading: true,
        connection: true
    };

    async componentDidMount() {
        try {
            // Get clients from server
            const data = await api.get('/clients');
            this.setState({clientsFromDatabase: data.data, loading: false, connection: true});
        } catch {
            this.setState({loading: false, connection: false});
        }
    };

    //Delete client from database
    deleteClientHandler = async id => {
        api.delete(`/clients/${id}`);
        //Remove from table
        const item = document.getElementById(id);
        item.parentNode.removeChild(item);
    }

    render() {
        const {clientsFromDatabase, loading, connection} = this.state;

        return (
            <section>
                <Title>Clientes</Title>

                {/* Connection Error */}
                {!connection && (<NoConnection/>)}
                
                {/* While Loading */}
                {loading && (<Loader><SyncLoader/></Loader>)}

                {/* If connected and not Loading */}
                {(connection && !loading) && (
                    // Render Table
                    <TableLayout>
                        <thead>
                            <tr>
                                <TableHeader>Nome</TableHeader>
                                <TableHeader>Registro</TableHeader>
                                <TableHeader>Ações</TableHeader>
                            </tr>
                            <tr><th><br></br></th></tr>
                        </thead>
                        {/* Table Content */}
                        <TableContent clients={clientsFromDatabase} onDelete={this.deleteClientHandler}/>
                    </TableLayout>
                )}

                {/*  Go to new client */}
                <Link to="clients/new"><NewButton>Cadastrar Cliente</NewButton></Link>
            </section>
        );
    }
}

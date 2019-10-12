import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api';


import {Title, TableLayout, TableHeader} from '../../styles/tableStyles';
import TableContent from './TableContent';
import {NewButton} from '../../styles/styles'


export default class Home extends Component {
    state = {
        salesFromDatabase: []
    };

    async componentDidMount() {
        const data = await api.get('/sales');
        const newData = await this.setClientNames(data.data);

        this.setState({salesFromDatabase: newData});
    };

    //Get client name from database
    setClientNames = async sales => {
        const aux = sales.map(async sale => {
            const c = await api.get(`/clients/${sale.clientId}`);
            sale.clientName = c.data.name;
        });

        await Promise.all(aux);
        return sales;
    }

    //Delete sale
    deleteSaleHandler = async id => {
        api.delete(`/sales/${id}`);
        
        const item = document.getElementById(id);
        item.parentNode.removeChild(item);
    }

    render() {
        const {salesFromDatabase} = this.state;

        return (
            <section>
                <Title>Vendas</Title>
                <TableLayout>
                    <thead>
                        <tr>
                            <TableHeader>Cliente</TableHeader>
                            <TableHeader>Valor</TableHeader>
                            <TableHeader>Data</TableHeader>
                            <TableHeader>Ações</TableHeader>
                        </tr>
                    </thead>
                    <TableContent sales={salesFromDatabase} onDelete={this.deleteSaleHandler}/>
                </TableLayout>

                <Link to="sales/new"><NewButton>Cadastrar Venda</NewButton></Link>
            </section>
        );
    }
}

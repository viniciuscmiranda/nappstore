import React, {Component} from 'react';
import {Title, TableLayout, TableHeader} from './styles';
import TableContent from '../TableContent'

import api from '../../services/api';

export default class Home extends Component {
    state = {
        salesFromDatabase: []
    };

    async componentDidMount(){
        const data = await api.get('/sales');
       
        this.setState({
            salesFromDatabase: data.data
        })
    };

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
                    <TableContent sales={salesFromDatabase} />
                </TableLayout>
            </section>
        );
    }
}

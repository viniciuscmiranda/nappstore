//Sales page
import React, {Component} from "react";
import {LinkStyled, LinkButton, ButtonDelete} from '../../../styles/styles';
import {MdDelete, MdEdit, MdLink} from 'react-icons/md';
import {TableData} from "../../../styles/tableStyles";
import {getStringDate, getStringFloat} from '../../../rules';


class TableContent extends Component {
    //Sum prices from all products in the sale
    getPrice = (sale) => {
        let price = 0;
        sale.products.map(product => {
            price += (product.price * product.amount);
            return 0;
        });

        return getStringFloat(price);
    }

    render() {
        return (
            <tbody>
                {this.props.sales.map(sale => (
                    <tr key={sale._id} id={sale._id}>
                        {/* Table content */}
                        <TableData>
                            <LinkStyled to={`/clients/${sale.clientId}`}>{sale.clientName}</LinkStyled>
                        </TableData>
                        <TableData>{this.getPrice(sale)}</TableData>
                        <TableData>{getStringDate(sale.createdAt)}</TableData>

                        {/* Action buttons */}
                        <TableData style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <LinkButton to={`/sales/${sale._id}`} title="Abrir"><MdLink className="TableButton"/></LinkButton>
                            <LinkButton to={`/sales/edit/${sale._id}`} title="Editar"><MdEdit className="TableButton"/></LinkButton>
                            <ButtonDelete onClick={()=>{this.props.onDelete(sale._id)}} title="Excluir"><MdDelete/></ButtonDelete>
                        </TableData>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableContent;
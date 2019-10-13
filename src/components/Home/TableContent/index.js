//Sales page
import React, {Component} from "react";
import {TableData} from "../../../styles/tableStyles";
import {LinkStyled, LinkButton, ButtonDelete} from '../../../styles/styles';
import {MdDelete, MdEdit, MdLink} from 'react-icons/md';


class TableContent extends Component {
    //Sum prices from all products in sale
    getPrice = (sale) => {
        let price = 0;
        sale
            .products
            .map(product => {
                if (price != null){
                    price +=(product.price * product.amount);
                }
                return 0;
            });

        return "$" + price
            .toFixed(2)
            .toString()
            .replace('.', ',');
        }
    


    //Get sale date
    getDate = (sale) => {
        const date = new Date(sale.createdAt);
        let dd = date.getDate();
        let mm = date.getMonth() + 1;
        let yyyy = date.getFullYear();

        if (dd < 10) 
            dd = '0' + dd;
        if (mm < 10) 
            mm = '0' + mm;            
        
        return dd + '/' + mm + '/' + yyyy;  
    }

    render() {
        return (
            <tbody>
                {this.props.sales.map(sale => (
                    <tr key={sale._id} id={sale._id} >

                        <TableData>
                            <LinkStyled to={`/clients/${sale.clientId}`}>{sale.clientName}</LinkStyled>
                        </TableData>
                        <TableData>{this.getPrice(sale)}</TableData>
                        <TableData>{this.getDate(sale)}</TableData>

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
//Sales page
import React, {Component} from "react";
import {TableData} from "../../../styles/tableStyles";
import {LinkButton, ButtonDelete} from '../../../styles/styles';
import {MdDelete, MdEdit, MdLink} from 'react-icons/md';

class TableContent extends Component {
    //Set price
    getPrice = (price) => {
        if(price == null) return "";
        return "$" + price
            .toFixed(2)
            .toString()
            .replace('.', ',');
    }

    //Get product date
    getDate = (product) => {
        const date = new Date(product.createdAt);
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
                {this.props.products.map(product => (
                    <tr key={product._id} id={product._id} >

                        <TableData>{product.name}</TableData>
                        <TableData>{this.getPrice(product.price)}</TableData>
                        <TableData>{product.multiple}</TableData>
                        <TableData>{this.getDate(product)}</TableData>

                        <TableData style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <LinkButton to={`/client/${product._id}`} title="Abrir"><MdLink className="TableButton"/></LinkButton>
                            <LinkButton to={`/client/edit/${product._id}`} title="Editar"><MdEdit className="TableButton"/></LinkButton>
                            <ButtonDelete onClick={()=>{this.props.onDelete(product._id)}} title="Excluir"><MdDelete/></ButtonDelete>
                        </TableData>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableContent;
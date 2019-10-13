//Products page
import React, {Component} from "react";
import {TableData} from "../../../styles/tableStyles";
import {LinkButton, ButtonDelete} from '../../../styles/styles';
import {MdDelete, MdEdit, MdLink} from 'react-icons/md';
import {getStringFloat, getStringDate} from '../../../rules';

class TableContent extends Component {
    render() {
        return (
            <tbody>
                {this.props.products.map(product => (
                    // Set table data from products array
                    <tr key={product._id} id={product._id} >
                        <TableData>{product.name}</TableData>
                        <TableData>{getStringFloat(product.price)}</TableData>
                        <TableData>{product.multiple}</TableData>
                        <TableData>{getStringDate(product.createdAt)}</TableData>

                        {/* Action buttons for product */}
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
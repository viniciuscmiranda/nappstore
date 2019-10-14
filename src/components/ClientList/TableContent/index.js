//Clients page
import React, {Component} from "react";
import {MdDelete, MdEdit, MdLink} from 'react-icons/md';
import {TableData} from "../../../styles/tableStyles";
import {LinkButton, ButtonDelete} from '../../../styles/styles';
import {getStringDate} from '../../../rules';

class TableContent extends Component {
    render() {
        return (
            <tbody>
                {this.props.clients.map(client => (
                    <tr key={client._id} id={client._id} >
                        {/* Table Content */}
                        <TableData>{client.name}</TableData>
                        <TableData>{getStringDate(client.createdAt)}</TableData>

                        {/* Action Buttons */}
                        <TableData style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <LinkButton to={`/clients/${client._id}`} title="Abrir"><MdLink className="TableButton"/></LinkButton>
                            <LinkButton to={`/clients/edit/${client._id}`} title="Editar"><MdEdit className="TableButton"/></LinkButton>
                            <ButtonDelete onClick={()=>{this.props.onDelete(client._id)}} title="Excluir"><MdDelete/></ButtonDelete>
                        </TableData>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableContent;
//Sales page
import React, {Component} from "react";
import {TableData} from "../../../styles/tableStyles";
import {LinkButton, ButtonDelete} from '../../../styles/styles';
import {MdDelete, MdEdit, MdLink} from 'react-icons/md';

class TableContent extends Component {
    //Get client date
    getDate = (client) => {
        const date = new Date(client.createdAt);
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
                {this.props.clients.map(client => (
                    <tr key={client._id} id={client._id} >

                        <TableData>{client.name}</TableData>
                        <TableData>{this.getDate(client)}</TableData>

                        <TableData style={{display: 'flex', justifyContent: 'space-evenly'}}>
                            <LinkButton to={`/client/${client._id}`} title="Abrir"><MdLink className="TableButton"/></LinkButton>
                            <LinkButton to={`/client/edit/${client._id}`} title="Editar"><MdEdit className="TableButton"/></LinkButton>
                            <ButtonDelete onClick={()=>{this.props.onDelete(client._id)}} title="Excluir"><MdDelete/></ButtonDelete>
                        </TableData>
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableContent;
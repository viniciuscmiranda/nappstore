import React from "react";
import {TableData} from "./styles";
import {MdDelete, MdEdit, MdLink} from 'react-icons/md';
import {uniqueId} from 'lodash';
import {Link} from 'react-router-dom';


const TableContent = ({sales}) => (
    <tbody>
        {sales.map(sale => (
            <tr key={uniqueId()}>
                
                <TableData><Link to={`/clients/${sale.clientId}`}>{sale.clientId}</Link></TableData>
                <TableData></TableData>
                <TableData>{sale.createdAt}</TableData>

                <TableData style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Link to={`/sales/${sale._id}`}><MdLink size={24} color="#444" /></Link>
                    <Link to={`/sales/edit/${sale._id}`}><MdEdit size={24} color="#444" /></Link>
                    <button><MdDelete size={24} color="#444" /></button>
                </TableData>
            </tr>
        ))}

    </tbody>
)

export default TableContent;
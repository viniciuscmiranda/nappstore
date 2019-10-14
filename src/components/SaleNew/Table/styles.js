import styled from 'styled-components';

export const TableContainer = styled.div `
    max-width: 100%;
    display: flex;
    overflow-x: auto;
    margin-bottom: 64px;

    table{
        width: 100%;
        td{
            input{
               padding: 2px;
            }
            button{
                margin: auto;
            }
        }
    }
`;

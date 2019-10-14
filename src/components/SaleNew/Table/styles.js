import styled from 'styled-components';

export const TableContainer = styled.div `
    max-width: 100%;
    display: flex;
    overflow-x: auto;
    margin-bottom: 64px;

    table{
        td{
            input{
                text-align: center;
                padding: 2px;
            }
        }
    }
`;

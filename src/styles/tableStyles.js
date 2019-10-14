import styled from 'styled-components';

//Table styles
export const TableLayout = styled.table`
    width: 100%;
    padding: 4px;
    margin-bottom: 32px;
    position: relative;
    min-height: 100px;
`;

export const TableHeader = styled.th`
    font-weight: bold;
    text-align: center;
    padding: 4px;
    width: 25%;
    max-width: 25%;
`;

export const TableData = styled.td `
    padding: 4px;
    text-align: center;
    word-wrap: break-word;
  
`;

export const TableAction = styled.td `
    display: flex;
    justify-content: space-evenly;

    @media (max-width: 960px){
        flex-direction: column;
        margin: 16px 0;

        *{
            text-align: center;
        }
    }
`
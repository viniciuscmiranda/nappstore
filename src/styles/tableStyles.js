import styled from 'styled-components';

export const Title = styled.h1`
    width: 100%;
    font-size: 16px;
    text-align: center;
    margin-bottom: 16px;
`;

export const TableLayout = styled.table`
    width: 100%;
    padding: 4px;
    table-layout: fixed;
    margin-bottom: 32px;
    position: relative;
    min-height: 100px;

    .loader{
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
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
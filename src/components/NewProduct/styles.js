import styled from 'styled-components';


export const LabelItem = styled.span`
    display: flex;
    flex-direction: column;

    span{
        margin-bottom: 8px;
    }

    input{
        width: 100%;
        background: none;
        border: none;
        border-bottom: 1px solid lightgray;
        font-size: 18px;
        color: black;
        margin-bottom: 32px;
    }
`;

import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

// Loading component
export const Loader = styled.div `
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// Success message
export const Success = styled.div `
    width: 100%;
    display: flex;
    margin: 32px auto;
    color: darkgreen;
    text-align: center;
    font-size: 16px;
    padding: 16px;
    background: lightgreen;
    justify-content: center;

    &::before{
        content: "Cadastrado com sucesso!";
    }
    
    .link{
        text-decoration: none;
        &:hover, &:focus, &:focus-within{
            text-decoration: underline;
        }

        &::before{
            content: "Visualizar";
            color: darkgreen;
            font-style: italic;
            font-weight: bold;
        }
    }

`;

//Error message layout
const errorMessage = css ` 
    width: 100%;
    display: flex;
    margin: 32px auto;
    &::before, span{
        color: darkred;
        text-align: center;
        font-size: 16px;
        width: 100%;
        padding: 16px;
        background: lightpink;
    }
`

//No connection error message
export const NoConnection = styled.div `
    ${errorMessage}
    &::before{
        content: "Ocorreu um erro ao conectar  :(";
    }
`;

//Missing fileds error message
export const Missing = styled.div `
    ${errorMessage}
    &::before{
        content: "Preencha os campos obrigatórios!";
    }
`;

//Custom error message
export const CustomError = styled.div `
    ${errorMessage}
`;

//Section title style
export const Title = styled.h1 `
    width: 100%;
    font-size: 16px;
    text-align: center;
    margin-bottom: 16px;
`;

//Custom link
export const LinkStyled = styled(Link)`
    color: black;
    text-decoration: none;

    &:hover, &:focus, &:focus-within{
      font-weight: bold;
    }
`;

//Link layout
const buttonLinkStyle = css `
    color: rgba(0,0,0,.3);
    *{
        color: rgba(0,0,0,.3);
        font-size: 24px;
    }
    &:hover, &:focus, &:focus-within{
        color: black;
        *{
            color: black;
            transition: color .2s ease-in;
        }
}`

//Delete button Style
export const ButtonDelete = styled.button `
    ${buttonLinkStyle}
    border:none;
    background: none; 
    cursor: pointer;
`;

export const LinkButton = styled(Link)`${buttonLinkStyle}`;

//Button layout
const button = css `
    padding: 16px 24px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    background-color: darkseagreen;
    cursor: pointer;
    font-weight: bold;
    color: darkgreen;
    transition: background-color .2s ease-in;

    &:hover, &:focus, &:focus-within{
        background-color:  lightgreen;
    }
`;

//Buttons Style
export const NewButton = styled.button `${button}`;
export const SendButton = styled.input `${button}`;

//FormLabelItem
export const FormLabelItem = styled.span`
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

import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

export const Loader = styled.div `
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

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

const errorMessage = css ` 
    width: 100%;
    display: flex;
    margin: 32px auto;
    &::before{
        color: darkred;
        text-align: center;
        font-size: 16px;
        width: 100%;
        padding: 16px;
        background: lightpink;
    }
`

export const NoConnection = styled.div `
    ${errorMessage}
    &::before{
        content: "Ocorreu um erro ao conectar  :(";
    }
`;

export const Missing = styled.div `
    ${errorMessage}
    &::before{
        content: "Preencha os campos obrigatórios!";
    }
`;

export const Title = styled.h1 `
    width: 100%;
    font-size: 16px;
    text-align: center;
    margin-bottom: 16px;
`;

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

export const NewButton = styled.button `${button}`;
export const SendButton = styled.input `${button}`;

export const LinkStyled = styled(Link)`
    color: black;
    text-decoration: none;

    &:hover, &:focus, &:focus-within{
      font-weight: bold;
    }
`;

const buttonLinkStyle = css ` color: rgba(0,0,0,.3);
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

export const ButtonDelete = styled.button `
    ${buttonLinkStyle}
    border:none;
    background: none; 
    cursor: pointer;
`;

export const LinkButton = styled(Link)`${buttonLinkStyle}
   
`;

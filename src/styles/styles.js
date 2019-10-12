import styled, {css} from 'styled-components';
import {Link} from 'react-router-dom';

export const NewButton = styled.button `
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

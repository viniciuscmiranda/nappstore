import styled from 'styled-components';

export const NavContainer = styled.nav `
    width: 100%;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,.2);
`;

export const NavList = styled.ul `
    width: 90%;
    max-width: 960px;
    margin: auto;
    list-style: none;
    display: flex;
    align-items: center;
    padding: 24px 0;
    justify-content: flex-end;

    @media screen and (max-width: 960px){
        justify-content: space-evenly;
    }
`;

export const NavListItem = styled.li `
    margin-left: 32px;

    > * {
        display: flex;
        align-items: center;
        color: black    ;
        text-decoration: none;  

        &:hover, &:focus, &:focus-within{
            font-weight: bold;
        }      

        > *:first-child{
            font-size: 16px;
            margin: 0 8px;
        }
        
        > *:last-child{
            display: none;
            font-size: 24px;
        }
    }

    @media screen and (max-width: 960px) {
        margin-left: 0;

        > * {
            *:first-child{
                display: none;
            }
            
            *:last-child{
                display: initial;
            }
        }
    }
`;

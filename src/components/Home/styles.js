import styled from 'styled-components';

export const Main = styled.main`
    .icons{
        display: flex;
        flex-direction: column;

        .item{
            display: flex;
            align-items: center;
            margin: 16px auto;

            .icon{
                font-size: 48px;
                padding: 16px;
                box-sizing: content-box;
                border-radius: 8px;
                box-shadow: 0 0 4px rgba(0,0,0,.2);
                color: darkgray;
                transition: color .2s ease-in;
                
                &:hover, &:focus, &:focus-within{
                    color: black;
                }
            }

            .link{
                color: black;
                margin-left: 32px;
                font-size: 24px;
                text-decoration: none;

                &:hover, &:focus, &:focus-within{
                    text-decoration: underline;
                }
            }
        }
    }
`;

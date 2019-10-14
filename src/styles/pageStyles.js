import styled from 'styled-components';

export const Profile = styled.div`
    display: flex;

    figure{
        width: 240px;
        height: 240px;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0,0,0,.2);
    
        img{
            position: absolute;
            transform: translate(-50%, -20%);
            top: 20%;
            left: 50%;
            width: 180%;
            min-height: 100%;
            transition: width .2s ease-in;
        }

        &:hover{
            img{
                width: 185%;
            }
        }
    }

    .stats{
        margin-left: 32px;
        display: flex;
        justify-content: center;
        flex-direction: column;

        span{
            margin: 8px 0;
        }

        .actions{
            display: flex;
            margin-top: 16px;

            >*:first-child{
                margin-right: 8px;
            }
        }
    }

    @media (max-width: 960px){
        flex-direction: column;
        width: 100%;

        figure{
            width: 100%;
            margin-bottom: 32px;
        }

        .stats{
            text-align: center;
            margin: 0;

            span{
                margin: 4px 0;
            }

            .actions{
                justify-content: center;

                *{
                    margin: 0;
                }
            }
        }
    }
  
`;

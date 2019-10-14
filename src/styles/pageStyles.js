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
            transform: translate(-50%, -50%);
            top: 50%;
            left: 50%;
            height: 125%;
            transition: height .2s ease-in;
        }

        &:hover{
            img{
                height: 130%;
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
    }
  
`;

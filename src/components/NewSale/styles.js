import styled from 'styled-components';

export const LabelItem = styled.span `
    display: flex;
    flex-direction: column;

    div{
        display: flex;

        button{
            border: none;
            background: none;
            margin-left: 16px;
            font-size: 24px;
            color: gray;
            transition: color .2s ease;
            cursor: pointer;
            text-align: center;
            transform: translateY(-20%);

            &:hover, &:focus, &:focus-within{
                color: black;
            }
        }
    }

    span{
        margin-bottom: 8px;
    }

    select{
        width: 100%;
        background: none;
        border: none;
        border-bottom: 1px solid lightgray;
        font-size: 18px;
        color: black;
        margin-bottom: 32px;
        cursor: pointer;
    }
`;

export const NoSales = styled.span `
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    text-align: center;
    transform: translate(-50%, 200%);
`

export const StatsHolder = styled.div `
    display: flex;
    justify-content: space-between;

    .sale-stats{
        display: flex;
        flex-direction: column;

        label{
            border-bottom: 1px solid lightgray;
            padding-bottom: 4px;
            display: flex;
            justify-content: space-between;
            margin: 8px;

            input{
                text-indent: 8px;
                border: none;
                background: none;
            }
            &:last-of-type{
                input{
                    font-weight: bold;
                }
            }
        }
    }

    *[type="submit"]{
        height: 48px;
        min-width: 155px;
        margin-right: 16px;
        align-self: flex-end;
    }
`;
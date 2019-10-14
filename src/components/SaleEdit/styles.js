import styled from 'styled-components';

//Custom label item
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

    span{ margin-bottom: 8px; }

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

// No items in cart
export const NoSales = styled.p `
    color: black;
    width: 100%;
    margin: 32px 0;
    text-align: center;
`

//Holder for sale status
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

    /* Submit button */
    *[type="submit"]{
        height: 48px;
        min-width: 155px;
        margin-right: 16px;
        align-self: flex-end;
    }

    @media screen and (max-width: 960px){
        flex-direction: column;

        *[type="submit"]{
            width: 100%;
            margin: 0;
            margin-bottom: 32px;
        }
    }
`;
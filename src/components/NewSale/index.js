import React, {Component} from 'react';
import api from '../../services/api';
import {getRentability} from '../../rules';
import {Link} from 'react-router-dom';
import Table from './Table';
import {MdAddCircleOutline as AddButton} from 'react-icons/md';
import {SyncLoader} from 'react-spinners'
import {SendButton, Title, NoConnection, Loader, Success, CustomError} from '../../styles/styles';
import {LabelItem, StatsHolder, NoSales} from './styles';

export default class NewSale extends Component {
    //Component state
    state = {
        clients: [],
        products: [],
        cart: [],
        connection: true,
        loading: true,
        success: false,
        lowrent: false
    }

    //Calculate total price
    handleSetTotalPrice = () => {
        //Get all product's prices and amounts
        const amountHolder = document.querySelectorAll('.prodAmount');
        const priceHolder = document.querySelectorAll('.prodPrice');

        //Set Total Price
        let newPrice = 0;
        //Set Original Price
        let originalPrice = 0;

        //Sum all prices
        amountHolder.forEach((amountItem, index) => {
            //Get product with the same index, then sum
            newPrice += amountItem.value * priceHolder[index].value;
            //Find original price for this product
            let prodPrice = this.state.cart.find(p => {
                return p._id === amountItem.parentElement.parentElement.id
            });
            //Set original price multiplied by amount
            originalPrice += prodPrice.price * amountItem.value;
        });

        //Set total price input, and apply mask
        document.getElementById("total-price").value = 
        "$" + newPrice.toFixed(2).toString().replace('.', ',');
        //Set original price iput, and apply mask
        document.getElementById("diff-price").value =
         "$" + originalPrice.toFixed(2).toString().replace('.', ',');

        //Get rentability input 
        const rentInput = document.getElementById('rent-price');
        //Get new rentability
        const rentability = getRentability(originalPrice, newPrice);
        //Set rentability input value and color
        rentInput.value = rentability.rent;
        rentInput.style.color = rentability.color;
    };

    //Add new product to the cart
    handleAddToCart = async() => {
        //Get selected product
        const selected = document
            .getElementById("selected-prod")
            .value;

        //Check if product's already in the cart
        const prodIsInCart = await this.state.cart.find((p) => { return p._id === selected; });

        if(!prodIsInCart) {
            //If it isn't, then add it
            const prod = this.state.products.find((p) => { return p._id === selected; });
            this.setState(previousState => ({ cart: [...previousState.cart, prod ] }));
        } else {
            //If it is, then add to the amount
            const holder = document.getElementById(selected).querySelector('.prodAmount');
            holder.value = parseInt(holder.value) + parseInt(holder.getAttribute('step'));
        }

        //Recalculate total price
        this.handleSetTotalPrice();
    }

    //Remove product from the cart
    handleDelete = async(id) => {
        this.setState({
            cart: this
                .state
                .cart
                .filter(function (prod) {
                    let keep = prod._id !== id
                    if (!keep) {
                        //Set Total Price
                        let amountHolder = parseInt(document.getElementById(id).querySelector('.prodAmount').value);
                        let priceHolder = parseFloat(document.getElementById(id).querySelector('.prodPrice').value);
                        let totalPriceHolder = document.getElementById('total-price');
                        let oldPrice = parseFloat(totalPriceHolder.value.split('$')[1].replace(',', '.'));
                        let newPriceHolder = oldPrice - (priceHolder * amountHolder).toFixed(2);
                        let newPrice = "$" + newPriceHolder.toFixed(2).toString().replace(".", ",");
                        totalPriceHolder.value = newPrice;

                        //Set Suggested Price
                        let sugPriceHolder = document.getElementById("diff-price");
                        let oldSugPrice = parseFloat(sugPriceHolder.value.split('$')[1].replace(',', '.'));
                        let newSugPriceHolder = oldSugPrice - (prod.price * amountHolder).toFixed(2);
                        let newSugPrice = "$" + newSugPriceHolder.toFixed(2).toString().replace(".", ",");
                        sugPriceHolder.value = newSugPrice;

                        //Set Rentability
                        const rentInput = document.getElementById('rent-price');
                        const rentability = getRentability(newSugPriceHolder, newPriceHolder);
                        rentInput.value = rentability.rent;
                        rentInput.style.color = rentability.color;
                    }
                    return keep;
                })
        });
    }

    //Send form to server
    handleSubmit = async e => {
        //Cancel sending
        e.preventDefault();

        //Set loading
        this.setState({loading: true});

        //Get data from form
        const clientId = e.target.client.value;
        let products = [];

        //Get data from table
        this
            .state
            .cart
            .map(p => {
                //Price from table
                let priceHolder = parseFloat(document.getElementById(p._id).querySelector('.prodPrice').value);
                //Amount from table
                let amountHolder = parseInt(document.getElementById(p._id).querySelector('.prodAmount').value);

                let prod = {};

                //Setting attributes
                prod["productId"] = p._id;
                prod["price"] = priceHolder;
                prod["amount"] = amountHolder;

                //Pushing to products object
                products.push(prod);
                return true;
            });

        //Submit data
        try {
            //Make request
            await api.post('/newsale', {clientId, products});
            this.setState({success: true});
        } catch (e) {
            //Show error message
            this.setState({connection: false});
        } finally {
            //Stop loading
            this.setState({loading: false});
        }
    }

    //Get clients and products from api
    async componentDidMount() {
        try {
            const clients = await api.get('/clients');
            const products = await api.get('/products');

            this.setState({clients: clients.data, products: products.data, loading: false});

            if (!!clients.length || !!products.length) 
                this.setState({connection: false});
            }
        catch {
            this.setState({connection: false, loading: false});
        }
    }

    render() {
        const {
            success,
            clients,
            products,
            cart,
            loading,
            connection,
            lowrent
        } = this.state;

        return (
            <section>
                <Title>Nova Venda</Title>

                {/* Connection Error */}
                {!connection && (<NoConnection/>)}

                {/* While Loading */}
                {loading && ( <Loader><SyncLoader/></Loader>)}

                {/* Request success */}
                {(connection && success) && (
                    <Success>
                        <Link to="/sales" className="link"/>
                    </Success>
                )}

                {/* Low rentaibility found */}
                {lowrent && (<CustomError><span>Um ou mais produtos com baixa rentabilidade!</span></CustomError>)}

                {/* If could get data from database */}
                {(connection && !!products.length && !!clients.length && (
                    <form onSubmit={this.handleSubmit}>
                        <LabelItem>
                            <span>Cliente</span>
                            <select name="client">
                                {/* Set clients */}
                                {clients.map(client => {return (
                                        <option value={client._id} key={client._id}>{client.name}</option>
                                    )})
                                }
                            </select>
                        </LabelItem>

                        <LabelItem>
                            <span>Produto</span>
                            <div>
                                <select id="selected-prod">
                                    {/* Set products */}
                                    {products.map(product => {return (
                                            <option value={product._id} key={product._id}>{product.name}</option>
                                        )})
                                    }
                                </select>

                                {/* Set add to cart button */}
                                <button type="button" onClick={() => {this.handleAddToCart()}}>
                                    <AddButton/>
                                </button>
                            </div>
                        </LabelItem>

                        {/* Render Table  */}
                        <Table cart={cart} onDelete={this.handleDelete} setTotalPrice={this.handleSetTotalPrice}/>

                        {/* If there's no item in the cart... */}
                        {!cart.length && (<NoSales>Clique em "+" para adicionar produtos!</NoSales>)}
                        {/* Else... */}
                        {!!cart.length && (
                            <div>
                                {/* Render Table */}
                                <Table cart={cart} onDelete={this.handleDelete} setTotalPrice={this.handleSetTotalPrice}/>

                                {/* Submit button and Sale stats holder */}
                                <StatsHolder>
                                    <SendButton type="submit" value="Cadastrar"/>

                                    {/* Sale stats */}
                                    <div className="sale-stats">
                                        <label>
                                            <strong>Total:
                                            </strong>
                                            <input type="text" id="total-price" readOnly defaultValue="$0,00"></input>
                                        </label>

                                        <label>
                                            <strong>Sugerido:
                                            </strong>
                                            <input type="text" id="diff-price" readOnly defaultValue="$0,00"></input>
                                        </label>

                                        <label>
                                            <strong>Retabilidade:
                                            </strong>
                                            <input type="text" id="rent-price" readOnly/>
                                        </label>

                                    </div>
                                </StatsHolder>
                            </div>
                        )}
                    </form>
                ))}
            </section>
        );
    }
}

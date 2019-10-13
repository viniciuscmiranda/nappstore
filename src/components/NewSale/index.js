import React, {Component} from 'react';
import {SendButton, Title, NoConnection, Loader, Success} from '../../styles/styles';
import {LabelItem, StatsHolder, NoSales} from './styles';
import api from '../../services/api';
import {SyncLoader} from 'react-spinners'
import {Link} from 'react-router-dom';
import {MdAddCircleOutline as AddButton} from 'react-icons/md';
import Table from './Table';

export default class NewSale extends Component {
    state = {
        clients: [],
        products: [],
        cart: [],
        connection: true,
        loading: true,
        success: false
    }

    //Get total price from all products
    handleSetTotalPrice = () => {
        const amountHolder = document.querySelectorAll('.prodAmount');
        const priceHolder = document.querySelectorAll('.prodPrice');

        //Set Total Price
        let totalPrice = 0;
        //Set Diff
        let diff = 0;
        amountHolder.forEach((a, i) => {
            totalPrice += a.value * priceHolder[i].value;

            let prodPrice = this
                .state
                .cart
                .find(p => {
                    return p._id === a.parentElement.parentElement.id
                });

            diff += prodPrice.price * a.value;
        });

        document
            .getElementById("total-price")
            .value = "$" + totalPrice
            .toFixed(2)
            .toString()
            .replace('.', ',');

        document
            .getElementById("diff-price")
            .value = "$" + diff
            .toFixed(2)
            .toString()
            .replace('.', ',');

        const rentInput = document.getElementById('rent-price');

        if (totalPrice > diff) {
            rentInput.value = "Ótima";
            rentInput.style.color = "green";
        } else if (totalPrice > (diff * 0.9) && totalPrice <= diff) {
            rentInput.value = "Boa";
            rentInput.style.color = "darkblue";
        } else if (totalPrice < diff) {
            rentInput.value = "Ruim";
            rentInput.style.color = "darkred";
        }
    };

    //Get product by Id
    handleAddToCart = async() => {
        const selected = document
            .getElementById("selected-prod")
            .value;

        const prodIsInCart = await this
            .state
            .cart
            .find((p) => {
                return p._id === selected;
            });

        if (!prodIsInCart) {
            const prod = this
                .state
                .products
                .find((p) => {
                    return p._id === selected;
                })

            this.setState(previousState => ({
                cart: [
                    ...previousState.cart,
                    prod
                ]
            }));

        } else {
            let holder = document.getElementById(selected);
            holder = holder.querySelector('.prodAmount');
            holder.value = parseInt(holder.value) + parseInt(holder.getAttribute('step'));
        }

        this.handleSetTotalPrice();
    }

    handleDelete = async(id) => {
        this.setState({
            cart: this
                .state
                .cart
                .filter(function (prod) {
                    let keep = prod._id !== id
                    if (!keep) {

                        let amountHolder = parseInt(document.getElementById(id).querySelector('.prodAmount').value);
                        let priceHolder = parseFloat(document.getElementById(id).querySelector('.prodPrice').value);
                        let totalPriceHolder = document.getElementById('total-price');
                        let oldPrice = parseFloat(totalPriceHolder.value.split('$')[1].replace(',', '.'));
                        let newPriceHolder = oldPrice - (priceHolder * amountHolder).toFixed(2);
                        let newPrice = "$" + newPriceHolder
                            .toFixed(2)
                            .toString()
                            .replace(".", ",");

                        totalPriceHolder.value = newPrice;

                        let diffPriceHolder = document.getElementById("diff-price");
                        let oldDiffPrice = parseFloat(diffPriceHolder.value.split('$')[1].replace(',', '.'));
                        let newDiffPriceHolder = oldDiffPrice - (prod.price * amountHolder).toFixed(2);
                        let newDiffPrice = "$" + newDiffPriceHolder
                            .toFixed(2)
                            .toString()
                            .replace(".", ",");
                        diffPriceHolder.value = newDiffPrice;

                        const rentInput = document.getElementById('rent-price');
                        if (newPriceHolder > newDiffPriceHolder) {
                            rentInput.value = "Ótima";
                            rentInput.style.color = "green";
                        } else if (newPriceHolder > (newDiffPriceHolder * 0.9) && newPriceHolder <= newDiffPriceHolder) {
                            rentInput.value = "Boa";
                            rentInput.style.color = "darkblue";
                        } else if (newPriceHolder < newDiffPriceHolder) {
                            rentInput.value = "Ruim";
                            rentInput.style.color = "darkred";
                        }
                    }
                    return keep;
                })
        });
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({loading: true});

        const clientId = e.target.client.value;
        let products = [];
        this
            .state
            .cart
            .map(p => {
                let priceHolder = parseFloat(document.getElementById(p._id).querySelector('.prodPrice').value);
                let amountHolder = parseInt(document.getElementById(p._id).querySelector('.prodAmount').value);

                let prod = {};

                prod["productId"] = p._id;
                prod["price"] = priceHolder;
                prod["amount"] = amountHolder;

                products.push(prod);

                return true;
            });

        try {
            await api.post('/newsale', {clientId, products});
            this.setState({success: true});
        } catch (e) {
            this.setState({connection: false});
        } finally {
            this.setState({loading: false});
        }

    }

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
            connection
        } = this.state;

        return (
            <section>
                <Title>Nova Venda</Title>

                {!connection && (<NoConnection/>)}
                {loading && (
                    <Loader><SyncLoader/></Loader>
                )}
                {(connection && success) && (
                    <Success>
                        <Link to="/sales" className="link"/>
                    </Success>
                )}

                {(connection && !!products.length && !!clients.length && (

                    <form onSubmit={this.handleSubmit}>
                        <LabelItem>
                            <span>Cliente</span>
                            <select name="client">
                                {clients.map(client => {

                                    return (
                                        <option value={client._id} key={client._id}>{client.name}</option>
                                    )
                                })
}
                            </select>
                        </LabelItem>

                        <LabelItem>
                            <span>Produto</span>
                            <div>
                                <select id="selected-prod">
                                    {products.map(product => {
                                        return (
                                            <option value={product._id} key={product._id}>{product.name}</option>
                                        )
                                    })
}
                                </select>

                                <button
                                    type="button"
                                    onClick={() => {
                                    this.handleAddToCart()
                                }}><AddButton/></button>
                            </div>
                        </LabelItem>

                        <Table
                            cart={cart}
                            onDelete={this.handleDelete}
                            setTotalPrice={this.handleSetTotalPrice}/> {!cart.length && (
                            <NoSales>Clique em "+" para adicionar produtos!</NoSales>
                        )}
                        {!!cart.length && (
                            <StatsHolder>
                                <SendButton type="submit" value="Cadastrar"/>
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
                                        <input type="text" id="rent-price" readOnly defaultValue="Boa"/>
                                    </label>

                                </div>
                            </StatsHolder>
                        )}

                    </form>
                ))}

            </section>
        );
    }
}

import React, {Component} from 'react';
import {
    SendButton,
    Title,
    NoConnection,
    Loader,
    Missing,
    Success
} from '../../styles/styles';
import {LabelItem} from './styles';
import api from '../../services/api';
import {Link} from 'react-router-dom'
import {SyncLoader} from 'react-spinners'

export default class NewProduct extends Component {
    state = {
        loading: false,
        connection: true,
        missing: false,
        success: false
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({connection: true, missing: false});

        if (e.target.name.value === "" || e.target.price.value === "" || e.target.multiple.value === "") {
            this.setState({missing: true, connection: true})
            return;
        }

        this.setState({loading: true});

        api.post('/newproduct', {
            name: e.target.name.value,
            price: parseFloat(e.target.price.value),
            multiple: parseInt(e.target.multiple.value)
        }).then(() => {
            alert("Cadastrado com sucesso!");
            this.setState({success: true, loading: false});
           
            e.target.name.value = "";
            e.target.price.value = "";
            e.target.multiple.value = "";
        }, (e) => {
            this.setState({connection: false, loading: false});
        });
    }

    render() {
        const {loading, connection, success, missing} = this.state;

        return (
            <section>
                <Title>Novo Produto</Title>
                {loading && (
                    <Loader><SyncLoader/></Loader>
                )}
                {success && (
                    <Success>
                        <Link to="/products" className="link"/>
                    </Success>
                )}
                {success && (<Link to='/products'/>)}

                {!connection && (<NoConnection/>)}
                {missing && (<Missing/>)}

                <form onSubmit={this.handleSubmit}>
                    <LabelItem>
                        <span>Nome</span>
                        <input type="text" name="name"/>
                    </LabelItem>

                    <LabelItem>
                        <span>Preço</span>
                        <input type="number" step="0.01" name="price"/>
                    </LabelItem>

                    <LabelItem>
                        <span>Múltiplo</span>
                        <input type="number" step="1" name="multiple"/>
                    </LabelItem>

                    <SendButton type="submit" value="Cadastrar"/>
                </form>
            </section>
        );
    }
}

import React, {Component} from 'react';
import {SendButton, Title, NoConnection, Loader, Missing, Success} from '../../styles/styles';
import {LabelItem} from './styles';
import {SyncLoader} from 'react-spinners'
import api from '../../services/api';
import {Link} from 'react-router-dom'

export default class NewProduct extends Component {
    state = {
        loading: false,
        connection: true,
        missing: false,
        success: false
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({connection: true, missing: false});

        if (e.target.name.value === "") {
            this.setState({missing: true, connection: true});
            return;
        }

        this.setState({loading: true});

        api
            .post('/newclient', {name: e.target.name.value})
            .then(() => {
                alert("Cadastrado com sucesso!");
                this.setState({success: true, loading: false});

                e.target.name.value = "";
            }, (e) => {
                this.setState({connection: false, loading: false});
            });
    }

    render() {
        const {success, loading, connection, missing} = this.state;

        return (
            <section>
                {success && (
                <Success>
                    <Link to="/clients" className="link"/>
                </Success>)}

                <Title>Novo Cliente</Title>
                {loading && (
                    <Loader><SyncLoader/></Loader>
                )}
                {!connection && (<NoConnection/>)}
                {missing && (<Missing/>)}

                <form onSubmit={this.handleSubmit}>
                    <LabelItem>
                        <span>Nome</span>
                        <input type="text" name="name"/>
                    </LabelItem>

                    <SendButton type="submit" value="Cadastrar"/>
                </form>
            </section>
        );
    }
}

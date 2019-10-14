import React, {Component} from 'react'
import api from '../../services/api';
import {getStringDate} from '../../rules';
import {SyncLoader} from 'react-spinners'
import {Title, NoConnection, Loader} from '../../styles/styles';
import {Profile} from '../../styles/pageStyles';


export default class ProductPage extends Component{
    // State
    state = {
        cli: {},
        sales: [],
        connection: true,
        loading: true,
    }

    async componentDidMount(){
        const { match: { params } } = this.props;
        try{
            // Get client data
            const cli = await api.get(`/clients/${params.id}`);
            this.setState({loading: false, cli: cli.data});
        } catch (e){
            this.setState({loading: false, connection: false});
        }
    }

    render(){
        const {cli, loading, connection} = this.state;

        return(
            <section>
                {/* While loading  */}
                {loading && (<Loader><SyncLoader/></Loader>)}

                {/* Connection error */}
                {!connection && (<NoConnection/>)}

                {/* If not loading and connected */}
                {(!loading && connection) && (
                    <div>
                        <Title>{cli.name}</Title>

                        {/* Render profile */}
                        <Profile>
                            <figure>
                                <img src={cli.picture} alt={cli.name}></img>
                            </figure>
        
                            <div className="stats">
                                <span>
                                    <strong>Id: </strong>{cli._id}
                                </span>
                                <span>
                                    <strong>Registro: </strong>{getStringDate(cli.createdAt)}
                                </span>
                            </div>
                        </Profile>
                     </div>
                )}
            </section>
        );
    }
}

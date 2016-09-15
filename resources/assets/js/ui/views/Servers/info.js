import React from 'react';
import Portlet from '../../components/portlet'
import Icon from '../../components/Icon'

export default class ServerView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            server: {
                HostName: 'pending',
                Map: 'pending',
                ModDesc: 'pending',
                Players: 0,
                MaxPlayers: 0,
                Bots: 0,
                Password: false,
                Secure: false,
                GamePort: 0
            }
        };
        $.get('/api/gs/info', {id: this.props.params.id}, function (data) {
            this.setState({server: data});
        }.bind(this));
    }
    getServerInfo(){
        $('.fa-refresh').addClass('fa-spin');
        $.get('/api/gs/info', {id: this.props.params.id}, function (data) {
            this.setState({server: data});
            $('.fa-refresh').removeClass('fa-spin');
        }.bind(this));
    }
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4">
                            <Portlet icon={<Icon name="server"/>} icon2={<a href="#" onClick={this.getServerInfo.bind(this)}><Icon name="refresh"/></a>} title=" Server info">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p>Hostname</p>
                                        <p>Map</p>
                                        <p>Type</p>
                                        <p>Players</p>
                                        <p>Max Players</p>
                                        <p>Bots</p>
                                        <p>Password</p>
                                        <p>Vac Secure</p>
                                        <p>Port</p>
                                    </div>
                                    <div className="col-sm-6">
                                        <p>{this.state.server.HostName}</p>
                                        <p>{this.state.server.Map}</p>
                                        <p>{this.state.server.ModDesc}</p>
                                        <p>{this.state.server.Players}</p>
                                        <p>{this.state.server.MaxPlayers}</p>
                                        <p>{this.state.server.Bots}</p>
                                        <p>{this.state.server.Password ? "Yes" : "No"}</p>
                                        <p>{this.state.server.Secure ? "Yes" : "No"}</p>
                                        <p>{this.state.server.GamePort}</p>
                                    </div>
                                </div>
                            </Portlet>
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4"></div>
                    </div>
                </div>
            </div>
        )
    }
}
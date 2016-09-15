import React from 'react';
import {Link} from 'react-router';

class ServerView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            servers: [],
            modalHidden: true
        };
        $.get('/api/server', this.onGetServers.bind(this));
    }
    onGetServers(data){
        this.setState({
            servers: data
        });
    }
    render(){
        return(
            <div>
                <div id="wrapper">
                    <div id="sidebar-wrapper">
                        <ul className="sidebar-nav">
                            <li className="sidebar-brand">
                                <Link to="/servers">Server List</Link>
                            </li>
                            {this.state.servers.map(function (server) {
                                return (
                                    <li key={server.id}>
                                        <Link to={"/servers/"+server.id+"/info"}>
                                            {server.name}
                                        </Link>
                                    </li>)
                            })}
                        </ul>
                    </div>
                    <div id="page-content-wrapper">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
export default ServerView;
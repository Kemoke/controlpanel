import React from 'react';
import {Link} from 'react-router'
import {Modal, Button} from 'react-bootstrap'

export default class ServerView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            servers: [],
            modalHidden: true
        };
        $.get('/api/server', this.onGetServers.bind(this))
    }
    onGetServers(data){
        this.setState({
            servers: data
        });
    }
    onSubmit(e){
        e.preventDefault();
        var server = {
            name: this.refs.name.value,
            hostname: this.refs.hostname.value,
            username: this.refs.username.value,
            password: this.refs.password.value,
            rootdir: this.refs.rootdir.value,
            startcmd: this.refs.startcmd.value
        };
        $.post('/api/server', server, this.onSave.bind(this));
    }
    onSave(server){
        var servers = this.state.servers;
        servers.push(server);
        this.setState({
            servers: servers
        });
        this.hideModal();
    }
    hideModal(){
        this.setState({modalHidden: true})
    }
    showModal(){
        this.setState({modalHidden: false})
    }
    startSrw(id){
        $.post('/api/gs/start', {id: id, _token: $("#csrf_token").val()}, function () {
            alert("Server started");
        }).fail(function (data) {
            alert(data);
        });
    }
    stopSrw(id){
        $.post('/api/gs/stop', {id: id, _token: $("#csrf_token").val()}, function () {
            alert("Server stopped");
        }).fail(function (data) {
            alert(data);
        });
    }
    render(){
        return(
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1>Server List</h1>
                            <ul className="list-group">
                                {this.state.servers.map(function (server) {
                                    return(<li key={server.id} className="list-group-item clearfix">
                                        <Link to={"/servers/"+server.id+"/info"} style={{lineHeight: "36px"}}>{server.name}</Link>
                                        <div className="btn-group pull-right">
                                            <button className="btn btn-success" onClick={this.startSrw.bind(this, server.id)}>Start</button>
                                            <button className="btn btn-info" onClick={this.stopSrw.bind(this, server.id)}>Stop</button>
                                            <Link className="btn btn-info" to={"/servers/"+server.id+"/ftp"}>Ftp</Link>
                                            <button className="btn btn-danger">Delete</button>
                                        </div>
                                    </li>)
                                }.bind(this))}
                            </ul>
                            <button className="btn btn-default" onClick={this.showModal.bind(this)}>Add new server</button>
                        </div>
                    </div>
                </div>
                <Modal bsSize="large" show={!this.state.modalHidden}>
                    <Modal.Header closeButton>
                        Add new server
                    </Modal.Header>
                    <form ref="form" onSubmit={this.onSubmit.bind(this)}>
                    <Modal.Body>
                            <input className="form-control" ref="name" type="text" placeholder="Server Name"/>
                            <input className="form-control" ref="hostname" type="text" placeholder="Hostname"/>
                            <input className="form-control" ref="username" type="text" placeholder="Username"/>
                            <input className="form-control" ref="password" type="text" placeholder="Password"/>
                            <input className="form-control" ref="rootdir" type="text" placeholder="Root dir"/>
                            <input className="form-control" ref="startcmd" type="text" placeholder="Start command"/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="submit" className="btn btn-primary">Add</button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}
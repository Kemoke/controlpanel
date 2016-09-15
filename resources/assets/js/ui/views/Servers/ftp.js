import React from 'react';
import Spinner from 'react-spinkit'
import {Modal, Button} from 'react-bootstrap'
import Icon from '../../components/Icon'
import FormUpload from '../../components/FormUpload'

function nl2br (str) {
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ "<br>" +'$2');
}

class FtpView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: true,
            path: '/',
            dirs: [],
            modal: {
                title: '',
                body: '',
                hidden: true
            }
        };
        this.tempPath = '/';
        this.onDirDone = this.onDirDone.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.onPostFail = this.onPostFail.bind(this);
        this.onFileDone = this.onFileDone.bind(this);
        this.modalHide = this.modalHide.bind(this);

        $.post('/api/ftp/list', {id: this.props.params.id, _token: $("#csrf_token").val()}, this.onDirDone).fail(this.onPostFail);
    }
    onDirDone(data){
        this.setState({
            loading: false,
            path: this.tempPath,
            dirs: data
        });
    }
    onFileDone(data){
        var file = data;
        var modal = {
            title: file.name,
            body: file.content,
            hidden: false
        };
        this.setState({
            loading: false,
            modal: modal
        });
    }
    onPostFail(request, status, error){
        this.setState({
            loading: false
        });
        var alert = $('#alert');
        alert.html(request.responseText);
        alert.fadeIn().delay(5000).fadeOut();
    }
    onBackClick(){
        this.tempPath = this.state.path.substr(0, this.state.path.lastIndexOf('/'));
        this.setState({
            loading: true
        });
        if(this.tempPath == ""){
            this.tempPath = "/";
        }
        $.post('/api/ftp/list', {path: this.tempPath, id: this.props.params.id, _token: $("#csrf_token").val()}, this.onDirDone).fail(this.onPostFail);
    }
    onItemClick(file){
        if(this.state.path != "/"){
            this.tempPath = this.state.path + "/" + file.name;
        } else {
            this.tempPath = this.state.path + file.name;
        }
        this.setState({
            loading: true,
        });
        var url;
        var cb;
        if(file.perms[0] == 'd'){
            url = '/api/ftp/list';
            cb = this.onDirDone;
        } else {
            url = '/api/ftp/open';
            cb = this.onFileDone;
        }
        $.post(url, {path: this.tempPath, id: this.props.params.id, _token: $("#csrf_token").val()}, cb).fail(this.onPostFail);
    }
    modalHide(){
        var modal = {
            title: '',
            body: '',
            hidden: true
        };
        this.setState({
            modal: modal
        });
    }
    saveFile(){
        var content = this.refs.fileContent.value;
        var path = this.state.path + "/" + this.state.modal.title;
        $.post('/api/ftp/edit', {content: content, id: this.props.params.id, path: path, _token: $("#csrf_token").val()}, function (data) {
            var alert = $("#alertNice");
            alert.html("File updated");
            alert.fadeIn().delay(5000).fadeOut();
            this.modalHide();
        }.bind(this)).fail(this.onPostFail);
    }
    onItemDelete(file){
        var path = this.state.path + "/" + file.name;
        $.post('/api/ftp/delete', {path: path, id: this.props.params.id, _token: $("#csrf_token").val()}, function (data) {
            var alert = $("#alertNice");
            alert.html("File deleted");
            alert.fadeIn().delay(5000).fadeOut();
            var dirs = this.state.dirs;
            dirs.splice(dirs.indexOf(file), 1);
            this.setState({
                dirs: dirs
            });
        }.bind(this)).fail(this.onPostFail);
    }
    uploadFileDone(data){
        $.post('/api/ftp/list', {id: this.props.params.id, _token: $("#csrf_token").val()}, this.onDirDone).fail(this.onPostFail);
    }
    render(){
        return(
            <div className="container-fluid">
                {this.state.loading ? <Spinner spinnerName='three-bounce' noFadeIn/> : null}
                <div id="alert" className="alert alert-danger" style={{display: 'none'}}></div>
                <div id="alertNice" className="alert alert-success" style={{display: 'none'}}></div>
                <h1>{this.state.path}</h1>
                <div className="row">
                    <div className="col-md-9">
                        <table className="table table-bordered">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Permissions</th>
                                <th>Owner</th>
                                <th>Group</th>
                                <th>Size</th>
                                <th>Date modified</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.path != "/" ?
                                <tr>
                                    <td><Icon name="folder-o"/> <a href="#" onClick={this.onBackClick.bind(this)}>..</a></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr> : null}
                            {this.state.dirs.map(function (dir) {
                                return(
                                    <tr key={dir.id}>
                                        <td>{dir.dir ? <Icon name="folder-o"/> : <Icon name="file-o"/> } {dir.name.match(/.+\.(ini|cfg|txt)/i) || dir.dir ? <a href="#" onClick={this.onItemClick.bind(this, dir)}>{dir.name}</a> : dir.name}</td>
                                        <td>{dir.perms}</td>
                                        <td>{dir.owner}</td>
                                        <td>{dir.group}</td>
                                        <td>{dir.size}</td>
                                        <td>{dir.edited}</td>
                                        <td><button className="btn btn-danger" onClick={this.onItemDelete.bind(this, dir)}>Delete</button></td>
                                    </tr>
                                )
                            }.bind(this))}
                            </tbody>
                        </table>
                    </div>
                    <div className="col-md-3">
                        <FormUpload uploadCB={this.uploadFileDone.bind(this)} id={this.props.params.id} dir={this.state.path}/>
                    </div>
                </div>
                <Modal bsSize="large" show={!this.state.modal.hidden} onHide={this.modalHide}>
                    <Modal.Header closeButton>
                        {this.state.modal.title}
                    </Modal.Header>
                    <Modal.Body>
                        <textarea ref="fileContent" rows="30" className="form-control" defaultValue={this.state.modal.body}/>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" onClick={this.saveFile.bind(this)}>Save</button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default FtpView;
import React from 'react'
import Spinner from 'react-spinkit'

class FormUpload extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading: false
        }
    }
    uploadFile(e) {
        this.setState({loading: true});
        var fd = new FormData();
        fd.append('file', this.refs.file.files[0]);
        fd.append('id', this.props.id);
        fd.append('dir', this.props.dir);
        fd.append('_token', $("#csrf_token").val());
        $.ajax({
            url: '/api/ftp/upload',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function (data) {
                this.props.uploadCB(data);
                this.setState({loading: false});
            }.bind(this)
        });
        e.preventDefault()
    }
    render() {
        return (
            <div>
                <form ref="uploadForm" encType="multipart/form-data" >
                    <input ref="file" type="file" name="file" className="form-control"/>
                    <input className="btn btn-default" type="button" ref="button" value="Upload" onClick={this.uploadFile.bind(this)} />
                </form>
                {this.state.loading ? <Spinner spinnerName='three-bounce' noFadeIn/> : null}
            </div>
        );
    }
}
export default FormUpload;
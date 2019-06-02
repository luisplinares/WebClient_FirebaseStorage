import React from 'react'
import {app} from './tests'
import firebase from 'firebase'

class FileUpload extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fileName: ""
        };

        this.onChange = this.onChange.bind(this);
        this.uploadFile = this.uploadFile.bind(this);
    }

    onChange(e) {
        this.setState({ fileName: e.target.files[0].name });
    }

    uploadFile(e) {
        var file = document.getElementById('uploadBtn').files[0];
        if (file !== undefined) {
            app.storage().ref('images').child(file.name).put(file).on(
                firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
                    var percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                    console.log(percent + "% done");
                },
                null,
                (snapshot) => { alert('File successfully uploaded!') });
        } else {
            alert('Selecciona un archivo!');
        }

    }


    render() {
        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--3-col">
                    <button id="upload-button" className="mdl-button mdl-js-button mdl-js-ripple-effect mdl-button--accent mdl-buton--raised" onClick={this.uploadFile}>
                        Upload
                    </button>
                </div>
                <div className="mdl-cell mdl-cell--9-col">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--file">
                        <input className="mdl-textfield__input" placeholder="File" value={this.state.fileName} type="text" id="uploadFile" readOnly />
                        <div className="mdl-button mdl-button--primary mdl-button--icon mdl-button--file">
                            <i id="upload-file-icon" className="material-icons">attach_file</i><input type="file" id="uploadBtn" onChange={this.onChange} />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default FileUpload;

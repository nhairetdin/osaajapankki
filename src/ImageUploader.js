import React, { Component } from 'react'
import { firebase } from './firebase/firebase'
import FileUploader from 'react-firebase-file-uploader'
import './ImageUploader.css'
import srs from 'secure-random-string'

class ImageUploader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      avatar: "",
      isUploading: false,
      progress: 0,
      avatarURL: "https://firebasestorage.googleapis.com/v0/b/osaajapankki2.appspot.com/o/profileimages%2Favatar.png?alt=media&token=64361396-5e90-428d-a6a4-d72c1d413ea1"
    }
  }

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 })
  
  handleProgress = progress => this.setState({ progress })
  
  handleUploadError = error => {
    this.setState({ isUploading: false })
    console.error(error)
  }

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("profileimages")
      .child(filename)
      .getDownloadURL()
      .then(url => {
        this.setState({ avatarURL: url })
        this.props.returnProfileImageUrl(url)
      });
  }

  render() {
    return (
      <div>
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        <FileUploader
          accept="image/*"
          name="avatar"
          filename={() => srs({length: 16, alphanumeric: true})}
          maxHeight="256"
          maxWidth="256"
          storageRef={firebase.storage().ref("profileimages")}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
        <div className="imageWrapper">
          {this.state.avatarURL && <img src={this.state.avatarURL} />}
        </div>
      </div>
    )
  }
}

export default ImageUploader
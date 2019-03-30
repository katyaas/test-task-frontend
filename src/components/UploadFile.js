import React from 'react';
import { inject, observer } from 'mobx-react';
import Spinner from 'react-bootstrap/Spinner';

import Dropzone from './Dropzone';

class UploadFile extends  React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

  uploadFile = async (files) => {
    if (!files.length) {
      return;
    }
    this.setState({
      isLoading: true,
    });
    const { fileStore } = this.props;
    await fileStore.uploadFiles(files);
    this.setState({
      isLoading: false,
    });
  };

  render() {
    const { isLoading } = this.state;
    return isLoading ?
      <Spinner animation="border" /> :
      <Dropzone onDrop={this.uploadFile} />;
  }
}

export default inject('fileStore')(observer(UploadFile));

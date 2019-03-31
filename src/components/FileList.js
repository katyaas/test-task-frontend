import React from 'react';
import { inject, observer } from 'mobx-react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import filesize from 'filesize';
import moment from 'moment';
import { FaTrash } from 'react-icons/fa';

import ViewButton from './ViewButton';

class FileList extends  React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  async componentDidMount() {
    const { fileStore } = this.props;
    await fileStore.getFiles('files');
    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { fileStore: { files, removeFile } } = this.props;
    const { isLoading } = this.state;
    if(isLoading) {
      return (
        <tr>
          <td colSpan="3">
            <Spinner animation="border" />
          </td>
        </tr>
      );
    }
    return (
      files.map(file => (
        <tr key={file.fileName}>
          <td>{file.fileName}</td>
          <td>{filesize(file.size)}</td>
          <td>{moment(file.updatedAt).format('DD.MM.YYYY HH:mm:ss (Z)')}</td>
          <td>
            <ViewButton file={file}/>
            <Button variant="danger" onClick={removeFile(file.fileName)}>
              <FaTrash />
            </Button>
          </td>
        </tr>
      ))
    );
  }
}

export default inject('fileStore')(observer(FileList));

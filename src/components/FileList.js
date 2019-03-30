import React from 'react';
import { inject, observer } from 'mobx-react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import filesize from 'filesize';
import moment from 'moment';
import { FaTrash, FaEye } from 'react-icons/fa';

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

  static allowView(mime) {
    return mime && (mime.startsWith('image/') || mime.startsWith('text/'));
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
            {
              FileList.allowView(file.mime) &&
              <Button variant="light">
                <FaEye/>
              </Button>
            }
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

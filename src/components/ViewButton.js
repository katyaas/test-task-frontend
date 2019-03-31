import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { FaEye } from "react-icons/fa";

import request from "../util/request";
import config from '../config';

class ViewButton extends React.Component {
  static propTypes = {
    file: PropTypes.shape({
      mime: PropTypes.string,
      fileName: PropTypes.string,
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = { show: false, isLoading: false };
  }

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = async () => {
    const { file: { fileName, mime }} = this.props;
    const { fileContent } = this.state;
    if (fileContent || !mime.startsWith('text/')) {
      this.setState({ show: true });
      return;
    }
    const content = await request(`files/${fileName}`);
    this.setState({ show: true, fileContent: content });
  };

  static allowView(mime) {
    return mime && (mime.startsWith('image/') || mime.startsWith('text/'));
  }

  get fileContent() {
    const { file: { fileName, mime }} = this.props;
    if (mime.startsWith('image/')) {
      return <img className="img-file" src={`http://${config.backend}/files/${fileName}`} />;
    } else if (mime.startsWith('text/')) {
      return <span className="text-file">${this.state.fileContent}</span>;
    }
    return <span>File {mime} not supported</span>;
  }

  render() {
    const {show} = this.state;
    const {file: {fileName, mime}} = this.props;

    return (
      ViewButton.allowView(mime) &&
      <React.Fragment>
        <Button variant="light" onClick={this.handleShow}>
          <FaEye/>
        </Button>
        <Modal
          show={show}
          onHide={this.handleClose}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>View file {fileName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.fileContent}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default observer(ViewButton);

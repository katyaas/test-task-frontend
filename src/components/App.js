import React, { Component } from 'react';
import { Provider } from 'mobx-react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

import FileList from './FileList';
import UploadFile from './UploadFile';
import FileStore from '../util/fileStore';

class App extends Component {
  render() {
    return (
      <Provider fileStore={new FileStore()}>
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>Simple file manager</Navbar.Brand>
        </Navbar>
        <Container>
          <Row>
            <Col>
              <div className="button-panel">
                <UploadFile />
              </div>
              <Table>
                <thead className="App-header">
                  <tr>
                    <th>File name</th>
                    <th>Size</th>
                    <th>Modified at</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <FileList/>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
      </Provider>
    );
  }
}

export default App;

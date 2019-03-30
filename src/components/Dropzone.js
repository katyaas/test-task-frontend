import React from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#6c6';
  }
  return '#666';
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  cursor: pointer;
  border-width: 2px;
  border-radius: 5px;
  border-color: ${props => getColor(props)};
  border-style: ${props => props.isDragActive ? 'solid' : 'dashed'};
  background-color: ${props => props.isDragActive ? '#eee' : ''};
`;

function StyledDropzone(props) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop: props.onDrop
  });

  return (
    <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </Container>
  );
}

export default StyledDropzone;
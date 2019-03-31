import { action, runInAction, extendObservable } from 'mobx';
import request from "./request";

export default class fileStore {
  constructor() {
    extendObservable(this, {
      files: []
    });
  }

  getFiles = action(async () => {
    this.files = [];
    const { files } = await request('files');
    this.addFiles(files);
  });

  async uploadFiles(files) {
    const body = new FormData();
    files.forEach((file) => {
      body.append(file.name, file);
    });
    const { files: newFiles } = await request(
      'files',
      {
        body,
        method: 'POST',
      }
    );
    this.addFiles(newFiles);
  }

  removeFile = fileName => async () => {
    await request(
      'files',
      {
        body: { fileName },
        method: 'DELETE',
      }
    );
    runInAction(() => {
      this.files = this.files.filter(file => file.fileName !== fileName);
    });
  };

  addFiles = action((newFiles) => {
    this.files.forEach((file) => {
      const newFileIndex = newFiles.findIndex(newFile => newFile.fileName === file.fileName);
      if (newFileIndex >= 0) {
        file.size = newFiles[newFileIndex].size;
        file.updatedAt = newFiles[newFileIndex].updatedAt;
        file.mime = newFiles[newFileIndex].mime;
        newFiles.splice(newFileIndex, 1);
      }
    });

    newFiles.forEach((newFile) => {
      this.files.push(newFile)
    });
  });
}
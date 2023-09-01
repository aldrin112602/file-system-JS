class FileSystem {
  async readFileAsDataURL(file) {
    return this.readFile(file, 'blob', (reader, data) => {
      reader.readAsDataURL(data);
    });
  }

  async readFile(file, responseType = 'text', readCallback) {
    return this.readFromSource(file, responseType, readCallback);
  }

  async readFromSource(source, responseType, readCallback) {
    return new Promise(async (resolve, reject) => {
      if (window.fetch) {
        try {
          const response = await fetch(source);
          const data = await response[responseType]();
          resolve(data);
        } catch (error) {
          reject('Failed to read source');
        }
      } else {
        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', source, true);
        xhr.responseType = responseType;
        xhr.onload = function () {
          const reader = new FileReader();
          readCallback(reader, xhr.response);
          reader.onload = function (e) {
            resolve(e.target.result);
          };
          reader.onerror = function () {
            reject('Failed to read source');
          };
        };
        xhr.onerror = function () {
          reject('Failed to read source');
        };
        xhr.send(null);
      }
    });
  }

  createFile(content, type, filename) {
    const blob = new Blob([content], { type });
    const fileURL = this.createObjectURL(blob);
    this.downloadFile(fileURL, filename);
  }

  createObjectURL(blob) {
    const URL_ = window.URL || window.webkitURL;
    return URL_.createObjectURL(blob);
  }

  downloadFile(fileURL, filename) {
    const a = document.createElement('a');
    a.setAttribute('href', fileURL);
    a.setAttribute('download', filename);
    a.click();
    a.remove();
    this.revokeObjectURL(fileURL);
  }

  revokeObjectURL(fileURL) {
    const URL_ = window.URL || window.webkitURL;
    URL_.revokeObjectURL(fileURL);
  }
}

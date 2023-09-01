class FileSystem {
  async readFileAsDataURL(file) {
    return new Promise(async (resolve, reject) => {
      const reader = new FileReader();
      if (file instanceof Blob || file instanceof File) {
        reader.readAsDataURL(file);
      } else {
        if (window.fetch) {
          try {
            const res = await fetch(file);
            const blob = await res.blob();
            reader.readAsDataURL(blob);
          } catch (error) {
            reject('Failed to read file');
          }
        } else {
          const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
          xhr.open('GET', file, true);
          xhr.responseType = 'blob';
          xhr.onload = function () {
            reader.readAsDataURL(xhr.response);
          };
          xhr.onerror = function () {
            reject('Failed to read file');
          };
          xhr.send(null);
        }
      }
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.onerror = function () {
        reject('Failed to read file');
      };
    });
  }

  async readFile(file) {
    return new Promise(async (resolve, reject) => {
      if (window.fetch) {
        try {
          const res = await fetch(file);
          const text = await res.text();
          resolve(text);
        } catch (error) {
          reject(error);
        }
      } else {
        const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', file, true);
        xhr.responseType = 'text';
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject('Failed to read file');
        };
        xhr.send(null);
      }
    });
  }

  createFile(content, type, filename) {
    const blob = new Blob([content], {
      type: type
    });
    const URL_ = window.URL || window.webkitURL;
    const fileURL = URL_.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', fileURL);
    a.setAttribute('download', filename);
    a.click();
    a.remove();
    URL_.revokeObjectURL(fileURL);
  }
}

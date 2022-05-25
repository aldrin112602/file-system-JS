class FileSystem {
  readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()
    if(file == ['object Blob'] || file == '[object File]') {
      reader.readAsDataURL(file)
    } else {
      if(window.fetch) {
       fetch(file).then(res => res.blob())
       .then(res => reader.readAsDataURL(res))
      } else {
        let xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', file, true)
        xhr.responseType = 'blob'
        xhr.onload = () => {
          reader.readAsDataURL(xhr.response)
        }
        xhr.send(null)
      }
    }
    reader.onload = e => {
      resolve(e.target.result)
    }
    reader.onerror = () => {
      reject('Failed to read file')
    }
    })
  }
  
  readFile(file) {
    return new Promise((resolve, reject) => {
      if(window.fetch) {
        window.fetch(file).then(res => res.text())
        .then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      } else {
        let xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP')
        xhr.open('GET', file, true)
        xhr.responseType = 'text'
        xhr.onload = () => {
          resolve(xhr.response)
        }
        xhr.onerror = () => {
          reject('Failed to read file')
        }
        xhr.send(null)
      }
    })
  }
  
  createFile(content, type, filename) {
    var blob = new Blob([content], {
      type: type
    })
    let URL_ = (window.URL || window.webkitURL);
    let fileURL = URL_.createObjectURL(blob);
    let a = document.createElement('a');
    a.setAttribute('href', fileURL);
    a.setAttribute('download', filename);
    a.click();
    a.remove();
      URL_.revokeObjectURL(fileURL);
  }
  
  
}

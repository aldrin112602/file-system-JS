"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }
function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
var FileSystem = function () {
  function FileSystem() {
    _classCallCheck(this, FileSystem);
  }
  _createClass(FileSystem, [{
    key: "readFileAsDataURL",
    value: function readFileAsDataURL(file) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        if (file == ['object Blob'] || file == '[object File]') {
          reader.readAsDataURL(file);
        } else {
          if (window.fetch) {
            fetch(file).then(function (res) {
              return res.blob();
            }).then(function (res) {
              return reader.readAsDataURL(res);
            });
          } else {
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.open('GET', file, true);
            xhr.responseType = 'blob';
            xhr.onload = function () {
              reader.readAsDataURL(xhr.response);
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
  }, {
    key: "readFile",
    value: function readFile(file) {
      return new Promise(function (resolve, reject) {
        if (window.fetch) {
          window.fetch(file).then(function (res) {
            return res.text();
          }).then(function (res) {
            resolve(res);
          }).catch(function (err) {
            reject(err);
          });
        } else {
          var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
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
  }, {
    key: "createFile",
    value: function createFile(content, type, filename) {
      var blob = new Blob([content], {
        type: type
      });
      var URL_ = window.URL || window.webkitURL;
      var fileURL = URL_.createObjectURL(blob);
      var a = document.createElement('a');
      a.setAttribute('href', fileURL);
      a.setAttribute('download', filename);
      a.click();
      a.remove();
      URL_.revokeObjectURL(fileURL);
    }
  }]);
  return FileSystem;
}();

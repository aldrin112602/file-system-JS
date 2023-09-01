## Installation

To use file-system-JS, include the `fileSystem.js` script in your HTML file:

```html
<script src="fileSystem.js"></script>
```

### Usage
#### Common Functions
Initialize the file system object:

```javascript
const fs = new FileSystem();
readFileAsDataURL(file)
```

Read a file and return its data as a base64-encoded data URL.

Example:

```javascript
fs.readFileAsDataURL("image.png")
  .then(function(data) {
    console.log(data); // base64 String
  });
```

To read a file from an <input type="file"> element:

```html
<input type="file" id="fileInput">
```

```javascript
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', async function() {
  const data = await fs.readFileAsDataURL(fileInput.files[0]);
  console.log(data); // base64 String
});
```

`readFile(file)`
Read a file and return its content as text.

Example:

```javascript
fs.readFile('main.js')
  .then(function(data) {
    console.log(data);
  });
```
You can also use `async/await`:

```javascript
async function readTextFile() {
  const content = await fs.readFile('sample.txt');
  console.log(content);
}
createFile(content, type, filename)
```

Create a file with the specified content, MIME type, and filename.

Example:

```javascript
fs.createFile("Sample Text", 'text/plain', 'sample.txt');
fs.createFile('console.log("Hello, world!")', 'text/javascript', 'main.js');
License
This project is licensed under the MIT License - see the LICENSE file for details.
````



# file-system-JS 
## Promised based
File System for client side browser 

## Common functions
```javascript

readFileAsDataURL(file);
readFile(file);
createFile(content, type, filename);
```
# Minimal Example 
```html
<script src="fileSystem.js"></script>
<script>
    var fs = new FileSystem();

    //Using readFileAsDataURL(file)
    fs.readFileAsDataURL("image.png")
    .then(function(data) {
       console.log(data); //base64 String
    })
    
    //Reading <input type="file" id="file">
    // example:
    var file = document.getElementById('file');
    file.onchange = function() {
      fs.readFileAsDataURL(file.files[0])
      .then(function(data) {
         console.log(data); //base64 String
      })
    }
</script>

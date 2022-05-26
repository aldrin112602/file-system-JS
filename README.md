# file-system-JS 
## Promised based
File System for client side browser 

## Common functions
```javascript
var fs = new FileSystem();
fs.readFileAsDataURL(file);
fs.readFile(file);
fs.createFile(content, type, filename);
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



    //Want to use async/await function?
    function async fileData() {
       var data = await fs.readFileAsDataURL('image.png');
       return await data;
    }
     
</script>

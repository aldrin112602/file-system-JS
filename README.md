# file-system-JS Promised based
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
    .then(res => {
       console.log(res);  
    })
</script>

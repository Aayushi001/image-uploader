function Custom(){
    this.methods = {
        checkImageSize : function(height, width, file){
            var img = new Image();
            img.src = file.path
            console.log(img.naturalHeight);
            console.log(file);
            console.log(this.width);
            console.log("this");
        }
    }
}

module.exports = Custom;
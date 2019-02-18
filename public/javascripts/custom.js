function previewFile(){
    var file    = document.querySelector('input[type=file]').files[0]; 
    var reader  = new FileReader();

    reader.onloadend = function () {
       var img = new Image();
       img.src = this.result;
       document.getElementById('originalImg').setAttribute("src", img.src);
       img.onload = function(){
           if(this.height == 1200 && this.width == 1200){
               document.getElementById('btn-container').style.display = "block";
           }
           else{
               alert("Please choose image of dimensions 1200 X 1200");
           }      
        }
    }
    if (file) {
       reader.readAsDataURL(file); //reads the data as a URL
    } else {
       console.error("File parsing failed");
    }
}

function cropImage(){
    var $image = $('#originalImg');
    var croppedImage = $image.cropper('getCroppedCanvas').toDataURL('image/jpeg');
    $image.cropper('destroy');
    document.getElementById('cropped-image-container').style.display = "block";
    document.getElementById('croppedImg').setAttribute("src", croppedImage);
}

function cropBoxSelector(width, height){
    console.log("fn called");
    var $image = $('#originalImg');

    $image.cropper({
    cropBoxMovable : true,
    cropBoxResizable : false,
    zoomable : false,
    zoomOnTouch : false,
    dragMode : 'none',
    ready : function(){
        console.log("ready");
    },
    crop: function(event) {
        console.log("crop");
        //console.log(event.detail.x);
        //console.log(event.detail.y);
    }
    });

    $image.cropper('setCropBoxData', {height : height, width : width});
    $image.data('cropper').cropBoxData.height = height;
    $image.data('cropper').cropBoxData.maxHeight = height;
    $image.data('cropper').cropBoxData.width = width;
    $image.data('cropper').cropBoxData.maxWidth = width;
}

function uploadImage(){
    console.log("upload called");
    var imageData = document.getElementById('croppedImg').src;
    $.ajax({
    type: 'POST',
    data: {data : imageData},
    url: 'http://localhost:3000/upload',
    success: function (data) {
        if(data['code'] == "okay"){
            alert("Image uploaded to dropbox successfully!");
        }
        else{
            alert("Oops! Something went wrong.");
        }
    }
    });
}
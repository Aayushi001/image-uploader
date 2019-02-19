var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
var fetch = require('isomorphic-fetch');
var access_token = "xX8wrPHWb9AAAAAAAAAA3r9LPG6YsrewCk3inREC-iP1G8p2TEku4YEB_aTEzdru";
var Dropbox = require('dropbox').Dropbox;
var dbx = new Dropbox({ accessToken: access_token });
var uploadedImages = [];


/* GET home page. */
router.get('/', function(req, res, next) {
  const data = {
    sizes : [
      {name : "horizontal", height : 450, width : 755},
      {name : "vertical", height : 450, width : 365},
      {name : "horizontal-small", height : 212, width : 365},
      {name : "horizontalgallery", height : 380, width : 380}
    ]
  };
  res.render('index', data);
});

router.post('/upload', async function (req, res) {
  var imageData = req.body.data;
  uploadedImages.push({data : imageData});
  let buff = new Buffer(imageData.split(',')[1], 'base64');  
  var fileName = `/${uuidv4()}.png`
  dbx.filesUpload({path: fileName , contents: buff})
          .then(function(response) {
            res.json({code : "okay"});
          })
          .catch(function(error) {
            console.error(error);
          });
 })

 router.get('/viewImages', (req,res,next) => {
   if(uploadedImages.length == 0){
     res.render('image-view');
   }
   const data = { images : uploadedImages};
   res.render('image-view', data);
 });

module.exports = router;

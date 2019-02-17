var express = require('express');
var router = express.Router();
var path = require('path');
const multer = require('multer');
const Resize = require('../resize');
//const Custom = require('../public/javascripts/custom');
var DIR = '../public/images';


//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({
  dest: DIR,  
  limits: {
  fileSize: 4 * 1024 * 1024,
}});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/upload', upload.single('image'), async function (req, res) {
  var fs = require('fs');
  //var custom = new Custom();
  //custom.methods.checkImageSize(1200,1200, req.file);
  const imageDirectory = path.join(__dirname, '../public/images');
  const fileUpload = new Resize(imageDirectory);
  if (!req.file) {
    res.status(401).json({error: 'Please provide an image'});
  }
  var imagePath = req.file.path;
  var bitmap = fs.readFileSync(imagePath);
  imagePath = new Buffer(bitmap)
  const filename = fileUpload.save(imagePath);
  console.log(filename);
  return res.status(200).json({ name: filename });
})

module.exports = router;

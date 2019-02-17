
const sharp = require('sharp');
const uuidv4 = require('uuid/v4');
const path = require('path');

class Resize {
  constructor(folder) {
    this.folder = folder;
  }
  async save(buffer) {
    const filename = Resize.filename();
    //const filepath = this.filepath(filename);
    var promises = [];
    var paths = [];
    var sizes = [
      {name : "horizontal", height : 450, width : 755},
      {name : "vertical", height : 450, width : 365},
      {name : "horizontal-small", height : 212, width : 365},
      {name : "horizontalgallery", height : 380, width : 380}
    ]

    for(var i = 0; i<sizes.length; i++){
      var filepath = this.filepath(filename, sizes[i]['name']);
      promises.push(
        sharp(buffer)
        .resize({height : sizes[i]['height'], width : sizes[i]['width'], fit: sharp.fit.cover,
        position: sharp.strategy.entropy}
      )
      .toFile(filepath));
      paths.push(filepath);
    }
    Promise.all(promises) 
      .then((result) => {
        return paths;
      })

    


    // await sharp(buffer)
    //   .resize(300, 300, {
    //     fit: sharp.fit.inside,
    //     withoutEnlargement: true
    //   })
    //   .toFile(filepath)
    //   .then(() => {
    //     return filename;
    //   })
  }
  static filename() {
    return `${uuidv4()}`;
  }
  filepath(filename, sizeName) {
    var accumulatedName = filename + '_' + sizeName;
    return path.resolve(`${this.folder}/${accumulatedName}.png`)
  }
}
module.exports = Resize;
var ff  = require('ffef/FatFractal');
var common = require('scripts/ImagesCommon');

exports.addThumbnail = function() {
    var updatedNoteData = ff.getUpdateEventHandlerData();
    var note = updatedNoteData["new"];
    print("addThumbnail received note: " + note);
    if (note === null)
        throw {statusCode:400, statusMessage:"Note instance can't be null "};
    var originalImage = ff.getBlob("imageData", note);
    print("addThumbnail received image content: " + originalImage);
    if (originalImage === undefined || originalImage === null)
        throw {statusCode:400, statusMessage:"Image information can't be null"};
    var thumbnailImage = ff.getBlob("thumbnail", note);
    if (thumbnailImage === undefined || thumbnailImage === null ) {
        thumbnailImage = common.resizeImage(originalImage, 50, 50);
        note = ff.saveBlob(note, 'thumbnail', thumbnailImage, 'image/png');
        ff.updateObj(note);
    }
}


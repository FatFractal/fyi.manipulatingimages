var ff  = require('ffef/FatFractal');
var common = require('scripts/ImagesCommon');

exports.addThumbnail = function() {
    var updatedNoteData = ff.getUpdateEventHandlerData();
    print("note is: " + JSON.stringify(updatedNoteData));
    var note = updatedNoteData["new"];
    if (note === null)
        throw {statusCode:400, statusMessage:"Note instance can't be null "};
    var originalImage = ff.getBlob("imageData", note);
    if (originalImage === undefined || originalImage === null)
        throw {statusCode:400, statusMessage:"Image information can't be null"};
    var thumbnailImage = ff.getBlob("thumbnail", note);
    if (thumbnailImage === undefined || thumbnailImage === null ) {
        print("got here");
        thumbnailImage = common.resizeImage(originalImage, 50, 50);
        ff.saveBlob(note, 'thumbnail', thumbnailImage, 'image/png');
        //note.thumbnail = thumbnailImage;
        //ff.updateObj(note);
    }
}


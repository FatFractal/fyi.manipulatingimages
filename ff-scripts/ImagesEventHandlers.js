var ff  = require('ffef/FatFractal');
var io  = require ('io'); // standard CommonJS module
var fs  = require ('fs'); // standard CommonJS module
var bin = require ('binary'); // standard CommonJS module
var hc  = require ('ringo/httpclient'); // not standardised by CommonJS yet, hence ringo prefix. see http://ringojs.org
var common = require('scripts/ImagesCommon');
var Scalr   = Packages.org.imgscalr.Scalr; // import the Scalr Java package
var ImageIO = Packages.javax.imageio.ImageIO; // import the imageIo Java packages

exports.addThumbnail = function() {
    var updatedNoteData = ff.getUpdateEventHandlerData();
    var note = updatedNoteData["new"];
    if (note === null)
        throw {statusCode:400, statusMessage:"Note instance can't be null "};
    var originalImage = ff.getBlob("imageData", note);
    if (originalImage === undefined || originalImage === null)
        throw {statusCode:400, statusMessage:"Image information can't be null"};
    thumbnailImage = ff.getBlob("thumbnail", note);
    if (thumbnailImage === undefined || thumbnailImage === null ) {
        thumbnailImage = common.resizeImage(originalImage, 50, 50);
        ff.saveBlob(note, 'thumbnail', thumbnailImage, 'image/jpeg');
    }
}


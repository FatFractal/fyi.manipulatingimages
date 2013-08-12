// Imports
var ff = require('ffef/FatFractal');
var common = require('scripts/ImagesCommon');

exports.cleanup = function() {
    var notes = ff.getArrayFromUri("/Notes");
    if (notes == null) return;
    for (var i = 0; i < notes.length; i++) {
        ff.deleteObj(notes[i]);
    }
    var r = ff.response();
    r.result = "<h1> Thanks for visiting</h1><p>We have deleted  " + notes.length + " objects from the tests.</p>";
    r.responseCode="200";
    r.statusMessage = "cleanup has deleted " + notes.length + " objects from your backend.";
    r.mimeType = "text/html";
}

exports.flipper = function() {
    var direction = ff.getExtensionRequestData().httpParameters['direction'];
    var originalImage = ff.getExtensionRequestData().httpContent;
    if (originalImage === undefined || originalImage === null)
        throw {statusCode:400, statusMessage:"Image information can't be null"};
    var flippedImage = common.flipImage(originalImage, direction);
    var r = ff.response();
    r.result = flippedImage;
    r.responseCode="200";
    r.statusMessage = "rotated your image";
    r.mimeType = "image/jpeg";
}


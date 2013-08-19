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
    print("flipper received request: " + JSON.stringify(ff.getExtensionRequestData()));
    var direction = ff.getExtensionRequestData().httpParameters['direction'];
    print("flipper received direction param: " + direction);
    //var noteuri = ff.getExtensionRequestData().httpContent.ffUrl;
    //print("flipper received noteuri: " + noteuri);
    //var note = ff.getObjFromUri(noteuri);
    var note = ff.getExtensionRequestData().httpContent;
    print("flipper received note: " + note);
    var r = ff.response();
    if (note === undefined || note === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Did not receive a Note object";
        r.mimeType = "application/json";
        return;
    }
    //var originalImage = ff.getBlob("imageData", note);    
    var originalImage = note.imageData;    
    if (originalImage === undefined || originalImage === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Could not find an image for the Note";
        r.mimeType = "application/json";
        return;
    }
    if (direction != "h" || direction != "v") direction = "h";
    var flippedImage = common.flipImage(originalImage, direction);
    r.result = flippedImage;
    r.responseCode="200";
    r.statusMessage = "flipped your image";
    r.mimeType = "image/png";
}

exports.rotator = function() {
    var direction = ff.getExtensionRequestData().httpParameters['direction'];
    var note = ff.getExtensionRequestData().httpContent;
    var r = ff.response();
    if (note === undefined || note === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Did not receive a Note object";
        r.mimeType = "application/json";
        return;
    }
    var originalImage = ff.getBlob("imageData", note);    
    if (originalImage === undefined || originalImage === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Could not find an image for the Note";
        r.mimeType = "application/json";
        return;
    }
    if (direction != "90" || direction != "180" || direction != "270") direction = "90";
    var rotatedImage = common.rotateImage(originalImage, direction);
    r.result = rotatedImage;
    r.responseCode="200";
    r.statusMessage = "flipped your image";
    r.mimeType = "image/png";
}


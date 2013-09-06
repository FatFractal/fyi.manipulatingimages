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
    //print("flipper received request: " + JSON.stringify(ff.getExtensionRequestData()));
    var direction = ff.getExtensionRequestData().httpParameters['direction'];
    var noteFFUrl = ff.getExtensionRequestData().httpParameters['noteFFUrl'];
    print("flipper received direction param: " + direction);
    print("flipper received noteFFUrl param: " + noteFFUrl);
    var note = ff.getObjFromUri(noteFFUrl);
    var r = ff.response();
    if (note === undefined || note === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Did not receive a Note object";
        r.mimeType = "application/json";
        return;
    }
    print("flipper received note: " + note);
    var originalImage = ff.getBlob("imageData", note);    
    if (originalImage === undefined || originalImage === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Could not find an image for the Note";
        r.mimeType = "application/json";
        return;
    }
    if (direction != "v") direction = "h";
    var flippedImage = common.flipImage(originalImage, direction);
    note = ff.saveBlob(note, 'imageData', flippedImage, 'image/png');
    print ("################### flipper note refs " + JSON.stringify(note.ffRefs));
    //note = ff.updateObj(note);
    r.result = note;
    r.responseCode="200";
    r.statusMessage = "flipped your image";
    r.mimeType = "application/json";
}

exports.rotator = function() {
    //print("rotator received request: " + JSON.stringify(ff.getExtensionRequestData()));
    var degrees = ff.getExtensionRequestData().httpParameters['degrees'];
    var noteFFUrl = ff.getExtensionRequestData().httpParameters['noteFFUrl'];
    print("flipper received degrees param: " + degrees);
    print("flipper received noteFFUrl param: " + noteFFUrl);
    var note = ff.getObjFromUri(noteFFUrl);
    var r = ff.response();
    if (note === undefined || note === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Did not receive a Note object";
        r.mimeType = "application/json";
        return;
    }
    print("rotator received note: " + note);
    var originalImage = ff.getBlob("imageData", note);    
    if (originalImage === undefined || originalImage === null) {
        r.result = null;
        r.responseCode = "400";
        r.statusMessage = "Could not find an image for the Note";
        r.mimeType = "application/json";
        return;
    }
    if (degrees != "180" && degrees != "270") degrees = "90";
    var rotatedImage;
    rotatedImage = null;
    rotatedImage = common.rotateImage(originalImage, degrees);
    note = ff.saveBlob(note, 'imageData', rotatedImage, 'image/png');
    print ("################### rotator note refs " + JSON.stringify(note.ffRefs));
    //note = ff.updateObj(note);
    r.result = note;
    r.responseCode="200";
    r.statusMessage = "rotated your image";
    r.mimeType = "application/json";
}


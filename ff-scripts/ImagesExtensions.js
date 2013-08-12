// Imports
var ff = require('ffef/FatFractal');
var io = require('io'); // standard CommonJS module
var fs = require('fs'); // standard CommonJS module
var bin = require('binary'); // standard CommonJS module
var hc = require('ringo/httpclient'); // not standardised by CommonJS yet, hence ringo prefix. see http://ringojs.org
var common = require('scripts/ImagesCommon');
var Scalr = Packages.org.imgscalr.Scalr; // import the Scalr Java package
var ImageIO = Packages.javax.imageio.ImageIO; // import the imageIo Java packages

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


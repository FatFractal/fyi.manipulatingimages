var ff = require('ffef/FatFractal');
var io  = require ('io'); // standard CommonJS module
var fs  = require ('fs'); // standard CommonJS module
var bin = require ('binary'); // standard CommonJS module
var hc  = require ('ringo/httpclient'); // not standardised by CommonJS yet, hence ringo prefix. see http://ringojs.org
var Scalr   = Packages.org.imgscalr.Scalr; // import the Scalr Java package
var ImageIO = Packages.javax.imageio.ImageIO; // import the imageIo Java packages

exports.cropImage = function(picBytes, width, height) {
    var croppedBytes = null;
    /**
     * We need a BufferedImage for the Scalr processing
     * There are ImageIO read methods for InputStream, File and URL. We've got a
     * ByteArray. So let's create a ByteArrayInputStream.
     */
    try {
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        /**
         * Crop the picture
         */
        var cropped = Scalr.crop(img, width, height);
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (cropped, 'JPG', baos);
        /**
         * Get the bytes from the ByteArrayOutputStream
         */
        croppedBytes = new bin.ByteArray(baos.toByteArray());
    } catch (e) {}
    return croppedBytes;
}

exports.resizeImage = function(picBytes, width, height) {
    var resizedBytes = null;
    /**
     * We need a BufferedImage for the Scalr processing
     * There are ImageIO read methods for InputStream, File and URL. We've got a
     * ByteArray. So let's create a ByteArrayInputStream.
     */
    try {
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        /**
         * Resize the picture
         */
        var resized = Scalr.resize(img, Scalr.Method.SPEED, Scalr.Mode.FIT_EXACT, width, height);
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (resized, 'JPG', baos);
        /**
         * Get the bytes from the ByteArrayOutputStream
         */
        resizedBytes = new bin.ByteArray(baos.toByteArray());
    } catch (e) {}
    return resizedBytes;
}

exports.rotateImage = function(picBytes, degrees) {
    var rotated = null;
    /**
     * We need a BufferedImage for the Scalr processing
     * There are ImageIO read methods for InputStream, File and URL. We've got a
     * ByteArray. So let's create a ByteArrayInputStream.
     */
    if (picBytes === null)
        throw {statusCode:400, statusMessage:"Image can't be null "};
    if (degrees === null)
        throw {statusCode:400, statusMessage:"Rotation value can't be null "};
    try {
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        /**
         * Rotate the picture
         */
        if(degrees == 90) 
            rotated = Scalr.rotate(img, Scalr.Rotation.CW_90);
        else if(degrees == 180) 
            rotated = Scalr.rotate(img, Scalr.Rotation.CW_180);
        else if(degrees == 270) 
            rotated = Scalr.rotate(img, Scalr.Rotation.CW_270);
        else 
            throw {statusCode:400, statusMessage:"No clue what the rotation value is"};
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (resized, 'JPG', baos);
        /**
         * Get the bytes from the ByteArrayOutputStream
         */
        rotated = new bin.ByteArray(baos.toByteArray());
    } catch (e) {}
    return rotated;
}

exports.flipImage = function(picBytes, direction) {
    var flipped = null;
    /**
     * We need a BufferedImage for the Scalr processing
     * There are ImageIO read methods for InputStream, File and URL. We've got a
     * ByteArray. So let's create a ByteArrayInputStream.
     */
    if (picBytes === null)
        throw {statusCode:400, statusMessage:"Image can't be null "};
    if (direction === null)
        throw {statusCode:400, statusMessage:"Rotation value can't be null "};
    try {
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        /**
         * Rotate the picture
         */
        if(direction.toLowerCase() == "h") 
            flipped = Scalr.rotate(img, Scalr.Rotation.FLIP_HORZ);
        else if(direction.toLowerCase() == "v") 
            flipped = Scalr.rotate(img, Scalr.Rotation.FLIP_VERT);
        else 
            throw {statusCode:400, statusMessage:"No clue what the rotation value is"};
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (resized, 'JPG', baos);
        /**
         * Get the bytes from the ByteArrayOutputStream
         */
        flipped = new bin.ByteArray(baos.toByteArray());
    } catch (e) {}
    return flipped;
}


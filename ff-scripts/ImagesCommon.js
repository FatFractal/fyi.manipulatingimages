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
        print("cropImage received image content: " + picBytes);
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        print("cropImage original image width: " + img.width + " height: " + img.height);
        print("cropImage original image content: " + img);
        /**
         * Crop the picture
         */
        var cropped = Scalr.crop(img, width, height);
        print("cropImage cropped image width: " + cropped.width + " height: " + cropped.height);
        print("cropImage cropped image content: " + resized);
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (cropped, 'PNG', baos);
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
        print("resizeImage received image content: " + picBytes);
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        print("resizeImage original image width: " + img.width + " height: " + img.height);
        print("resizeImage original image content: " + img);
        /**
         * Resize the picture
         */
        var resized = Scalr.resize(img, Scalr.Method.SPEED, Scalr.Mode.FIT_EXACT, width, height);
        print("resizeImage resized image width: " + resized.width + " height: " + resized.height);
        print("resizeImage resized image content: " + resized);
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (resized, 'PNG', baos);
        /**
         * Get the bytes from the ByteArrayOutputStream
         */
        resizedBytes = new bin.ByteArray(baos.toByteArray());
    } catch (e) {}
    return resizedBytes;
}

exports.rotateImage = function(picBytes, degrees) {
    var rotatedBytes = null;
    /**
     * We need a BufferedImage for the Scalr processing
     * There are ImageIO read methods for InputStream, File and URL. We've got a
     * ByteArray. So let's create a ByteArrayInputStream.
     */
    if (picBytes === null)
        throw {statusCode:400, statusMessage:"Image can't be null "};
    if (degrees === null)
        throw {statusCode:400, statusMessage:"Rotation value can't be null "};
    print("rotateImage received image content: " + picBytes);
    try {
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        print("rotateImage original image width: " + img.width + " height: " + img.height);
        print("rotateImage original image content: " + img);
        /**
         * Rotate the picture
         */
       var rotated = null;
       if(degrees == "90") 
            rotated = Scalr.rotate(img, Scalr.Rotation.CW_90);
        else if(degrees == "180") 
            rotated = Scalr.rotate(img, Scalr.Rotation.CW_180);
        else if(degrees == "270") 
            rotated = Scalr.rotate(img, Scalr.Rotation.CW_270);
        else 
            throw {statusCode:400, statusMessage:"No clue what the rotation value is"};
        print("rotateImage rotated image width: " + rotated.width + " height: " + rotated.height);
        print("rotateImage rotated image content: " + rotated);
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (rotated, 'PNG', baos);
        /**
         * Get the bytes from the ByteArrayOutputStream
         */
        rotatedBytes = new bin.ByteArray(baos.toByteArray());
    } catch (e) {
        print("rotateImage error: " + e);
        return;
    }
    return rotatedBytes;
}

exports.flipImage = function(picBytes, direction) {
    var flippedBytes = null;
    /**
     * We need a BufferedImage for the Scalr processing
     * There are ImageIO read methods for InputStream, File and URL. We've got a
     * ByteArray. So let's create a ByteArrayInputStream.
     */
    if (picBytes === null)
        throw {statusCode:400, statusMessage:"Image can't be null "};
    if (direction === null)
        throw {statusCode:400, statusMessage:"Rotation value can't be null "};
    print("flipImage received image content: " + picBytes);
    try {
        var bais = new java.io.ByteArrayInputStream(picBytes);
        var img  = ImageIO.read(bais);
        print("flipImage original image width: " + img.width + " height: " + img.height);
        print("flipImage original image content: " + img);
        /**
         * Rotate the picture
         */
        var flipped = null;
        if(direction.toLowerCase() == "h") 
            flipped = Scalr.rotate(img, Scalr.Rotation.FLIP_HORZ);
        else if(direction.toLowerCase() == "v") 
            flipped = Scalr.rotate(img, Scalr.Rotation.FLIP_VERT);
        else 
            throw {statusCode:400, statusMessage:"No clue what the rotation value is"};
        print("flipImage flipped image width: " + flipped.width + " height: " + flipped.height);
        print("flipImage flipped image content: " + flipped);
        var baos    = new java.io.ByteArrayOutputStream();
        ImageIO.write (flipped, 'PNG', baos);
        /**
         * Get the bytes from the ByteArrayOutputStream
         */
        flippedBytes = new bin.ByteArray(baos.toByteArray());
    } catch (e) {
        print("flipImage error: " + e);
        return;
    }
    return flippedBytes;
}


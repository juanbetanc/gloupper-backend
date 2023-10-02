const path = require("path");
const { v4: uuidv4 } = require("uuid");

const fileUpload = (files, destinyPath = '', allowedExtensions = ["png", "jpg", "jpeg"]) => {
  return new Promise((resolve, reject) => {
    const { image } = files;
    const fileShortedName = image.name.split(".");
    const extension = fileShortedName[fileShortedName.length - 1];

    // Validar extensión
    if (!allowedExtensions.includes(extension)) {
      return reject(
        `${extension} format is not allowed / Just ${allowedExtensions}`
      );
    } else {
      const newFileName = uuidv4() + "." + extension;
      const uploadPath = path.join(
        __dirname,
        "../uploads/",
        destinyPath,
        newFileName
      );
      image.mv(uploadPath, (err) => {
        if (err) {
          reject(err)
        }else{
            resolve(newFileName)
        }
      });
    }
  });
};


module.exports =  fileUpload 
'use strict';
const SingleFile = require('../models/singlefile');
const MultipleFile = require('../models/multiplefile');

//moves the $file to $dir2
var moveFile = (file, dir2)=>{
    //include the fs, path modules
    var fs = require('fs');
    var path = require('path');
  
    //gets file name and adds it to dir2
    var f = path.basename(file);
    var dest = path.resolve(dir2, f);
  
    fs.rename(file, dest, (err)=>{
      if(err) throw err;
      else console.log('Successfully moved');
    });
  };
  
const singleFileUpload = async (req, res, next) => {
    console.log(req.body);
    try{
        const file = new SingleFile({
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            collec: req.body.collection,
            listing_id: req.body.id,
            fileSize: fileSizeFormatter(req.file.size, 2) // 0.00
        });
        await file.save();
        moveFile('./'+file.filePath, './uploads/'+req.body.collection);
        res.status(201).send('File Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const multipleFileUpload = async (req, res, next) => {
    try{
        let filesArray = [];
        req.files.forEach(element => {
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            files: filesArray,
            collec: req.body.collection,
            item_id: req.body.item_id,
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const getallSingleFiles = async (req, res, next) => {
    try{
        const files = await SingleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}
const getallMultipleFiles = async (req, res, next) => {
    try{
        const files = await MultipleFile.find();
        res.status(200).send(files);
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = {
    singleFileUpload,
    multipleFileUpload,
    getallSingleFiles,
    getallMultipleFiles
}
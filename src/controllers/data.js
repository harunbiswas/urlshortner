/*
** title: data
** description: deta ralated operation like read, write, update, delete file
** author: Harun Biswas Rubel
** Date: 05-12-2021
*/

// dependenciess
const fs = require('fs');
const path = require('path');


// module scaffolding
const lib = {};


// body
lib.basedir = path.join(__dirname, '/../.data/');

// write data to file
lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir+dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if(!err && fileDescriptor) {
            const stringData = JSON.stringify(data);

            // write data to file and then close it
            fs.writeFile(fileDescriptor, stringData, (err1) => {
                if(!err1){
                    // closeing file
                    fs.close(fileDescriptor, (err2) => {
                        if(!err2){
                            callback(false)
                        }else {
                            callback('error: colising file!')
                        }
                    })
                }else{
                    callback('Error writing a new file!')
                }
            })
        }else {
            callback('There is a error : file may alrady exists!')
        }
    })
}


// read file from file 
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf-8', (err, data) => {
        callback(err, data);
    })
}


// update file from file
lib.update = (dir, file, data, callback) => {
    // file open for updateing
    fs.open(`${lib.basedir+dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if(!err && fileDescriptor){
            // conver the data to string
            const stringData  = JSON.stringify(data); 

            // write file and close it
            fs.writeFile(fileDescriptor, stringData, (err1) => {
                if(!err1){
                    // close the file
                    fs.close(fileDescriptor, (err2) => {
                        if(!err2){
                            callback(false)
                        }else{
                            callback('Error: file closing!')
                        }
                    })
                }else{
                    callback('error: updating file!')
                }
            })
        }else {
            callback('error: opening file!')
        }
    })
}

// delete file
lib.delete = (dir,file, callback) => {
    // unlink file
    fs.unlink(`${lib.basedir+dir}/${file}.json`, (err) => {
        if(!err){
            callback(false)
        }else {
            callback('error: deleting file')
        }
    })
}


// list the all items in a directtory
lib.list = (dir, callback) => {
    fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) => {
        if(!err && fileNames){
            let trimmedFileNames = [];
            fileNames.forEach((fileName) => {
                trimmedFileNames.push(fileName.replace('.json', ''))
            })
            callback(false, trimmedFileNames)
        }else{
            callback('error: reading directory!')
        }
    })
}


// export module
module.exports = lib;
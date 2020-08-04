var vorpal = require('vorpal')();
var fs = require('fs');
const prompt = require('prompt-sync')();
var path = require('path');
const { triggerAsyncId } = require('async_hooks');

vorpal
  .command('contact', 'Reach me at dante.testgame@gmail.com')
  .action(function (args, callback) {
    this.log('Reach me at dante.testgame@gmail.com');
    callback();
  });


//Rename feature
vorpal
  .command('rename', 'Rename a file')
  .action(function (args, callback) {
    let inputPathFile = prompt('Please input the file path:');
    let inputSuffix = prompt('Please input the suffix:');
    let fileName = path.basename(inputPathFile);
    let inputPath = path.dirname(inputPathFile);
    let addedSuffix = fileName.split('').slice(0, fileName.lastIndexOf('.')).join('') + '_' + inputSuffix + fileName.split('').slice(fileName.lastIndexOf('.')).join('');
    //check if file exists or not
    
    fs.stat(inputPathFile, (error, stats) => {
      // if (error) {
      //   this.log("Your file is not found, please try again!");
      //   callback();
      // }
      // else {
      //   // this.log("Stats object for:" + inputPathFile); 
      //   // console.log(stats); 
      //   if (!stats.isDirectory) {
      //     if (inputSuffix != "") {
      //       if (stats.isFile()) {
      //         fs.renameSync(inputPath + '/' + fileName, inputPath + '/' + addedSuffix);
      //         this.log('File Renamed Successfuly.');
      //         this.log("Your file is existed and renamed as: " + addedSuffix);
      //         callback();
      //       }
      //     }
      //     else
      //       this.log("Your suffix is empty, please try again!");
      //       callback();
      //   }
      //   else
      //     this.log("Your input is not a file, please try again!");
      //     callback();
      // }
      function checkFileExist() {
        if (stats.isFile())
          this.log('Your file is found and ready to be renamed!');
      };
      
      function checkFileDirectory() {
        if (!stats.isDirectory)
          this.log('Your input is a file!');
      };

      function checkSuffix() {
        if (inputSuffix != "")
          this.log("Your suffix is not empty");
      };

      function renameFile(inputPath, fileName, addedSuffix) {
        fs.renameSync(inputPath + '/' + fileName, inputPath + '/' + addedSuffix);
        this.log('File Renamed Successfuly.');
        this.log("Input path: " + inputPath);
        this.log("File name: " + fileName);
        this.log("Your file is existed and renamed as: " + addedSuffix);
      };
      async function tryRename(){
        try {
          await checkFileExist();
          await checkFileDirectory();
          await checkSuffix();
          await renameFile(inputPath, fileName, addedSuffix);
          callback();
        }
        catch (err) {
          this.log('Something is wrong! Please recheck')
          callback();
        };
      };
    });
    tryRename();
  });
    vorpal
      .delimiter('dante_cli$')
      .show();

// function getFileName (path){
//   return path.split('\\').pop().split('/').pop();
// }



// Happy case
// Given input correct file path
// Then rename correct

// File not found
// Given input incorrect file path (missing)
// Then print friendly error

// Input folder
// Given input folder path
// Then print friendly error

// Input empty suffix
// Given input empy sufix
// Then print friendly error




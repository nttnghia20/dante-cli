var vorpal = require('vorpal')();
var fs = require('fs');
const prompt = require('prompt-sync')();
var path = require('path');

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
      if (error) {
        this.log("Your file is not found, please try again!");
        callback();
      }
      else {
        // this.log("Stats object for:" + inputPathFile); 
        // console.log(stats); 
        if (!stats.isDirectory) {
          if (inputSuffix != "") {
            if (stats.isFile()) {
              fs.renameSync(inputPath + '/' + fileName, inputPath + '/' + addedSuffix);
              // Using methods of the Stats object 
              this.log('File Renamed Successfuly.');
              this.log("Your file is existed and renamed as: " + addedSuffix);
              callback();
            }
          }
          else
            this.log("Your suffix is empty, please try again!");
            callback();
        }
        else
          this.log("Your input is not a file, please try again!");
          callback();
      }
    });
    this.log("Input path: " + inputPath);
    this.log("File name: " + fileName);
    callback();
  });

vorpal
  .delimiter('dante_cli$')
  .show();

// function getFileName (path){
//   return path.split('\\').pop().split('/').pop();
// }







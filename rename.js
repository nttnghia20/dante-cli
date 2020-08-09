var vorpal = require('vorpal')();
var fs = require('fs');
const prompt = require('prompt-sync')();
var path = require('path');
const { triggerAsyncId } = require('async_hooks');
const { Console } = require('console');

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


    function statPromise(path) {
      return new Promise((resolve, reject) => {
        fs.stat(path, (err, stats) => {
          if (err) return reject(err)
          resolve(stats)
        })
      })
    };

    function checkFileExist(fileStats) {
      if (fileStats.isFile())
        vorpal.log('Your file is valid');
      else
        throw (new Error('Your input is not a file!'));

    };

    function checkFileDirectory(fileStats) {
      if (!fileStats.isDirectory)
        vorpal.log('Your input is a file!');
    };

    function checkSuffix() {
      if (inputSuffix != "")
        vorpal.log("Suffix is valid");
      else
        throw (new Error('Your suffix is empty!'));
    };

    function renameFile(inputPath, fileName, addedSuffix) {
      fs.renameSync(inputPath + '/' + fileName, inputPath + '/' + addedSuffix);
      vorpal.log("Input path: " + inputPath);
      vorpal.log("File name: " + fileName);
      vorpal.log("Your file is renamed as: " + addedSuffix);
    };
    async function doRename() {
      
      try {
        const statsFile = await statPromise(inputPathFile);
        await checkFileExist(statsFile);
        await checkFileDirectory(statsFile);
        await checkSuffix();
        await renameFile(inputPath, fileName, addedSuffix);
        callback();
      }
      catch (err) {
        vorpal.log('Something is wrong! Please recheck!\n', err)
        callback();
      };
    };
    doRename();

  });
vorpal
  .delimiter('dante_cli$')
  .show();
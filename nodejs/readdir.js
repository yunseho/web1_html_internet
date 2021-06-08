var testFolder = './syntax';
var fs = require('fs');

fs.readdir(testFolder, function(err,fileList){
    
        console.log(fileList);
    });

    //배열로 만들어서 전달하는 기능이다
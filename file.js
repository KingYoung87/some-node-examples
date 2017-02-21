var fs = require("fs");

function createFolder(dir) {
  var dirArray = new Array();
  dirArray = dir.split("/");
  var dirPath = "";
  for (var i = 0; i < dirArray.length; i ++) {
    dirPath = dirPath + dirArray[i] + "/";
    checkFolder(dirPath);
  }
}

function checkFolder(dir) {
  fs.stat(dir, function (err, stat) {
    if (err == null){
      if (stat.isDirectory()) {
        //是文件夹，而且存在
        console.log("文件夹存在");
        return;
      }
    } else if (err.code == "ENOENT") {
      //文件夹不存在，进行创建
      console.log("createFolder" + dir);
      fs.mkdir(dir, function(err) {
        console.log(err);
      });
    }
  });
}

createFolder("king/yang");

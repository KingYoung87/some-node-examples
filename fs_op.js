var exec = require('child_process').exec;

exec('ssh root@123.59.138.106',function(err,stdout,stderr){
    console.log(err,stdout,stderr);
});
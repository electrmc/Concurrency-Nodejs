'use strict'
var request = require('request-promise');


var options = {
    method : 'POST',
    url : 'http://127.0.0.1:3000/'
};

var i=0;
function test(){
    i++;
    options.url = 'http://127.0.0.1:3000/?a='+i;
    request(options)
    .then(function(res){
        console.log(res);
    }).catch(function(err){

    });

    if (i < 10){
        setTimeout(test,200);
    }
}
test();
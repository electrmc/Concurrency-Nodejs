
/**
 * 验证：
 * 在上一个请求的异步处理的时候，可以同时处理下一个请求。
 * 全局性的数据问题很容易出问题：即在处理过程中被其他的请求影响
 * 比如：下方的x变量，yield返回时，x已经被其他请求修改过
 * 让变量跟随方法可以避免该问题，比如下方的y，y只收yield处理的影响
 *
 */
var Koa = require('koa');
var app = new Koa();

var x = 0;
var y = 0;
function test (num) {
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            x++;
            num++;
            resolve(num);
        },1000);
    });
}

app.use(function*(){
    x++;
    y++;
    console.log(this.request.url +' x : '+ x + ' y: ' + y);
    var r =  yield test(y);
    console.log(this.request.url +' x : '+ x + ' y: ' + r);
});

app.listen(3000);
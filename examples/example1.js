//Clearing the misconception that setImmediate() runs before setTimeout().
setTimeout(function(){
    console.log("Inside SETTIMEOUT");
});
setImmediate(function(){
    console.log("Inside SETIMMEDIATE");
});


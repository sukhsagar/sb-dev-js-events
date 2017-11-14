//Clearing the misconception that setImmediate() runs before setTimeout().
setTimeout(function(){
    console.log("Inside the SETTIMEOUT");
});
setImmediate(function(){
    console.log("Inside the SETIMMEDIATE");
});


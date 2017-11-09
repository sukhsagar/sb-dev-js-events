//Calling the setImmediate() inside the body of setTimeout()
setTimeout(function() {
    console.log("TIMEOUT 1");
    setImmediate(function() {
        console.log("SETIMMEDIATE 1");
    });
}, 0);
setTimeout(function() {
    console.log("TIMEOUT 2");
    setImmediate(function() {
        console.log("SETIMMEDIATE 2");
    });
}, 0);
setTimeout(function() {
    console.log("TIMEOUT 3");
}, 0);

//Expected Output:
// TIMEOUT 1
// TIMEOUT 2
// TIMEOUT 3
// SETIMMEDIATE 1
// SETIMMEDIATE 2

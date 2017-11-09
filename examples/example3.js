//Functioning of nested setImmediate()
setImmediate(function() {
	setImmediate(function() {
	    console.log("a");
	    setImmediate(function() { 
	    	console.log("b"); 
	    });
	    setImmediate(function() { 
	    	console.log("c"); 
	    });
	});
	setImmediate(function() {
	    console.log("d");
	    setImmediate(function() {
	    	console.log("e");
	    });
	    setImmediate(function() {
	    	console.log("f"); 
	    });
  	});
});

//Expected output:
// a
// b
// c
// d
// e
// f
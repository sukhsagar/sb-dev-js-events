//Functioning of nested process.nextTick()
process.nextTick(function() {
	process.nextTick(function() {
	    console.log("a");
	    process.nextTick(function() { 
	    	console.log("b"); 
	    });
	    process.nextTick(function() { 
	    	console.log("c"); 
	    });
	});
	process.nextTick(function() {
	    console.log("d");
	    process.nextTick(function() {
	    	console.log("e");
	    });
	    process.nextTick(function() {
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
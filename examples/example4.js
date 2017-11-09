//Functioning of nested setTimeout()
setTimeout(function() {
	setTimeout(function() {
	    console.log("a");
	    setTimeout(function() { 
	    	console.log("b"); 
	    });
	    setTimeout(function() { 
	    	console.log("c"); 
	    });
	});
	setTimeout(function() {
	    console.log("d");
	    setTimeout(function() {
	    	console.log("e");
	    });
	    setTimeout(function() {
	    	console.log("f"); 
	    });
  	});
});

//Expected output:
// a
// d
// b
// c
// e
// f
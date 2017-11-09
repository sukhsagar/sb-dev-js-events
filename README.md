# sb-dev-js-events

#Research on behaviour of nextTick, setTimeout and setImmediate.
This project aims at providing a quick overview on how the functions like nextTick(), setTimeout() and setImmediate() manipulate the event loop in node js. The order of their execution will be specified with the help of a program. Refer to the file event_loop.js for the same. 

#Brief Overview of the 3 functions
	#NextTick()
	will be processed after the current operation completes, regardless of the current phase of the event loop.

	#setTimeout()
	schedules a script to be run after a minimum threshold in ms has elapsed.

	#setImmediate()
	is designed to execute a script once the current poll phase completes.

#Detailed Discussion
To understand the working of the three functions, let's first learn about the event loop. The event loop is Node.js to perform non-blocking I/O operations. In a single-threaded environment of javascript, this is made possible by offloading operations to the system kernel whenever possible.

When Node.js starts, it initializes the event loop, processes the provided input script which may make async API calls, schedule timers, or call process.nextTick(), then begins processing the event loop.

   ┌───────────────────────┐
┌─>│        timers         │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     I/O callbacks     │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
│  │     idle, prepare     │
│  └──────────┬────────────┘      ┌───────────────┐
│  ┌──────────┴────────────┐      │   incoming:   │
│  │         poll          │<─────┤  connections, │
│  └──────────┬────────────┘      │   data, etc.  │
│  ┌──────────┴────────────┐      └───────────────┘
│  │        check          │
│  └──────────┬────────────┘
│  ┌──────────┴────────────┐
└──┤    close callbacks    │
   └───────────────────────┘

A little description about the phases we are concerned with, are as below:
	Timer: It handles the callbacks assigned by setTimeout & setInterval after the given time threshold is completed. 
 	Check: Here the callbacks of setImmediate() is handled. 
	nextTickQueue: Holds the callbacks of process.nextTick(); but not a part of the event loop.

setImmediate() 
This function is not exactly immediate, but the queue containing the callbacks of this, will be executed once in every iteration i.e. when event loop is in Check phase.

setTimeout()
This function invokes the callback, but will not be executed till the event loop enters the Timer phase. So, any setTimeout(fn, 0) along with setImmediate() in the Close callback phase will guarantee the execution of setTimeout 0 before the setImmediate. 

process.nextTick() will start being executed right after the current operation is completed, irrespective of the current phase of the event loop. So, if the event loop is in Timer and there were 10 callbacks in the timer queue already; and event loop is busy executing the third one. By that time if few process.nextTick() callbacks are pushed to nextTickQueue, the event loop will execute all of them synchronously after completing the current callback execution (say 'n') and will resume the Timer callback execution again from the 'n+1' callback.

#CAUTION:
Any time process.nextTick() is called in a given phase, all callbacks passed to process.nextTick() will be resolved before the event loop continues. This can create some bad situations because it allows you to "starve" your I/O by making recursive process.nextTick() calls, which prevents the event loop from reaching the poll phase.

Then the question arises why is such a function allowed in node.js?
There are two main reasons (as per the official documentation of node.js)
	1. Allow users to handle errors, cleanup any then unneeded resources, or perhaps try the request again before the event loop continues.
	2. At times it's necessary to allow a callback to run after the call stack has unwound but before the event loop continues.

#Order Of Execution
The order of execution depends upon the arrangement of the functions in a program.

#Examples
The javascript programs are given in the "examples" folder which will clear the doubt regarding the functionality of these three functions. (if any)

#Prerequisites
Node JS
Text Editor [like Sublime] - (Optional)

#Observations and Understanding
	1. setTimeout queues its callbacks in the time callbacks.
	2. setImmediate() queues its callbacks in the event queue after I/O and timer callbacks.
	3. process.nextTick() queues its callbacks before I/O and timer callbacks.

	It appears from the name that setImmediate() will always be executed before setTimeout() but this is a misconception. This has been illustrated in the example1.js file. 
	Moreover, I personallly feel that both process.nextTick() and setImmediate() are named wrongly. If we swap the names of these two, then the names will match their respective functionalities.

#Author
Sukhsagar Singh
2015CSB1051
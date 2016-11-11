export * from './app.component';
export * from './app.module';


var exitHandler = function() {
  console.log("Exiting......");
}

//do something when app is closing
process.on('exit', exitHandler.bind(null));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null));
process.on('SIGINT', function () {
  console.log('Got SIGINT.  Press Control-D to exit.');
});
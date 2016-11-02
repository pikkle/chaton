
module.exports = function(app){

    app.get('/', function(req, res) {
    	console.log("Got a request !");
    	res.json({"timestamp" : new Date()});
    });

    //other routes..
}

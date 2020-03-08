const version = "1.0.0";

const http = require('http');
const os = require('os');

console.log("Who-Am-I server starting...");
console.log("Who-Am-I received following arguments:");
console.log(process.argv);

var port = 8888;
if (process.argv.length > 2) {
	console.log("Setting port to " + process.argv[2]);
	port = process.argv[2];
}
else {
	console.log("No port was configured. Setting to default port 8888.");
}

var appName = "whoami-app";
if (process.argv.length > 3) {
	console.log("Setting application name as " + process.argv[3]);
	appName = process.argv[3];
}
else {
	console.log("No port was configured. Setting to default application name 'whoami-app'.");
}

var includeDetails = false;
if (process.argv.length > 4) {
	console.log("Setting application name as " + process.argv[3]);
	includeDetails = process.argv[4].toLowerCase() === "describe";
}
else {
	console.log("No application name was configured. Setting to default application name 'whoami-app'.");
}

var handler = function(request, response) {
	console.log("Received request from " + request.connection.remoteAddress);
	response.writeHead(200);
	
	var result = {
		client: request.connection.remoteAddress,
		host: os.hostname(),
		timestamp: new Date()
	};
	
	if (includeDetails) {
		result.argv = process.argv;
		result.app = {
			name: appName,
			version: version,
			platform: "Node.Js"
		}
	}
	
	response.end(JSON.stringify(result));
}

var www = http.createServer(handler);
console.log("Who-Am-I listening on " + port);
www.listen(port);
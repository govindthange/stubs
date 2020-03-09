# WHOAMI
WHOAMI is a basic stub created for the purpose of testing an application's reachability inside a cluster-node. It can be used for understanding the interplay of conjoined microservices in a clustered environment.

The server is created using Node.js and by default listens on 9999 port.

## Request

```
curl http://ip-address:9999/
```

## Response

```
{
  "client": "::1",
  "host": "winsoft-47",
  "timestamp": "2020-03-09T06:47:39.939Z"
}
```

## Tips
* Change port by passing required port number as the 1st parameter.
* Label the application by providing a string as 2nd parameter.
* Enable detailed output by passing "describe" as 3rd parameter.
* Updated response:
	```
	{
	  "client": "::1",
	  "host": "winsoft-47",
	  "timestamp": "2020-03-09T06:52:46.755Z",
	  "argv": [
		"C:\\Program Files\\nodejs\\node.exe",
		"E:\\projects-poc\\bag\\whoami\\app.js",
		"9999",
		"Panda",
		"describe"
	  ],
	  "app": {
		"name": "Panda",
		"version": "1.0.0",
		"platform": "Node.Js"
	  }
	}
	```

**Image Ref:** https://hub.docker.com/repository/docker/thange/whoami

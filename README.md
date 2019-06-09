# Urban Survival Guide

## Getting Started
to start the application:
```
cd washroom-catalog
docker-compose up
```

* backend url access: http://localhost:5000/ 
* frontend url access: http://localhost:8080/


if you need to rebuild your images:
```
docker-compose build
```

if you need access to a container for debugging purposes, the following command will allow you to run an interactive bash shell within your chosen container:

```
docker exec -it <container name> bash
```

### Database
```
$ mysql --host=127.0.0.1 --port=32000 -u root -p
```



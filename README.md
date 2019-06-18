# 🚽 Urban Survival Guide
_**for the hydrated, the thristy, and the dirty**_

Built using React and Flask

## Getting Started
to start the application:
```
cd washroom-catalog
docker-compose build # rebuilds from docker files
docker-compose up # starts resources using the docker-compose file
```

if you need access to a container for debugging purposes, the following command will allow you to run an interactive bash shell within your chosen container:

```
docker exec -it <container name> /bin/bash
```

* backend url: http://localhost:5000/ 
* frontend url: http://localhost:8080/

##  Development

### Additional Frontend Packages
* [semantic-ui](https://react.semantic-ui.com/) - for prebuilt ui components and styling
* [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) - for redirecting the user to different pages on the front end
* [axios](https://github.com/axios/axios) - used to make api requests to the backend

### Additional Backend Packages



### Database
```
$ mysql --host=127.0.0.1 --port=32000 -u root -p
```



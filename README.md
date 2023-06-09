# Dipay Test

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [MongoDB](https://www.mongodb.com/atlas/database)
- [Postman](https://www.postman.com/downloads/)
- [Docker](https://www.docker.com/products/docker-desktop/)

### Pre-requesited
- Create `.env` and change the mongodb config (`<username>`, `<password>`, `<host>`)
```bash
$ cp .env.example .env
```

### Getting started
There are two ways to run the project:
#### Via Local
- Before we run the project please install project's dependencies:
```bash
$ make install
```
- To Build this project:
```bash
$ make build
```
and then run:
```bash
$ make start
```

- For development case:
```bash
$ make dev
```
- Hit http://localhost:3000 to see if it works

#### Via Docker Run
- You have installed Docker on your PC.
- Build docker image first with following command:
```bash
$ docker build . -t <your_username>/dipay-test # please change <your_username>
```
- Run the docker
```bash
$ docker run -p 4000:3000 -d <your_username>/dipay-test
```
- Hit http://localhost:4000 to see if it works


### API Testing using Jest:
- Please install your dependencies first on your local environment (`make install`):
```bash
$ make test
```

### API Documentation
- https://documenter.getpostman.com/view/3535934/2s93eVXZRu

### References
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/docs/6.x/index.html)
- [Jest](https://jestjs.io/)
- [Stackoverflow](https://stackoverflow.com/)
# Partners Location

This web API lets you store the Partner's location coordinates and coverage area and then lets you find the closest partner from your point.

## Deploying the app

This project was built on top of [Docker](https://www.docker.com/) containers, booth the app and the database.
Once you have Docker and [docker-compose](https://docs.docker.com/compose/) running on your machine all you have to do is open the terminal on the project's folder and run the following command:

```sh
docker-compose up
```

> Notice that on some Linux subsystems it might be necessary run the command with sudo depending on the Docker installation

While building the container the project's binaries are compiled, dependencies are downloaded and the tests are run as well, so it may take a couple of minutes
The containers will host the app and the database on the ports 3000 and 27017 respectively, if those ports are busy on your machine you might need to change the designated ports on the docker-compose file changing the value at the left of the colon (:) to the desired port.

## Overview

The app was built in Node.js using the framework [NestJS](https://nestjs.com/) for better maintainability and productivity.
The projects logic is separated by domains, each one with it's own responsibility. The most notable are:

- geojson:
  Responsible for the validation and the contract of GeoJSON typed objects

- partner:
  Responsible for the interactions regarding the entity of the Partners in the application

Following below are some of the techniques used in the app's development:

- Test Driven Development

- Domain Driven Design

- S. O. L. I. D. principles

- Object Oriented Programming

- Functional Programming

# Sassy games

## Architecture

### Database
MySql

### Api
Framework used: NestJs. Communication is based on REST. Websockets are used when communicating during gameplay. 

Choices made just for the sake of this assignment:

- everything is kept in a single repository 
- ongoing matches are stored in built-in memory cache 
- all game moves are logged directly to console 
- security and constraint checks are implemented on a basic level 

### Front
Framework used: Angular 12
- front app is rather functional than pretty

## Requirements
- Node v14
- Npm v6 or v7
- latest docker and docker-compose

## How to run the platform

### Set up database engine
Navigate to `./docker` directory and run `docker compose up -d`. The instance will be created with credentials:
- username: `root`
- password: `secret`

### Create database
Execute `./api/var/create-database.sql` against previously created MySql instance. The database name will be `sassygames`

### Start API

#### Install dependencies
Navigate to `./api` directory and run `npm i`

#### Prepare config
Copy `./api/env.dist` into `./api/.env`

#### Run the server
Navigate to `./api` directory and run `npm run start:dev`. When executed, typeorm will also create database structure. The server will be listening on `localhost:3005`

#### Fill database with basic data
Execute `./api/var/data.sql` against `sassygames` database

### Start frontend app
#### Install dependencies
Navigate to `./front` directory and run `npm i`

#### Run the app
Run `npm start`. The application will be available at `localhost:4200` 

### Start using the app
Open browser and navigate to `http://localhost:4200`. Use one of the following users or create your own. 
- `user1`:`secret`
- `user2`:`secret`
- `user3`:`secret`
- `user4`:`secret`
- `admin`:`secret`


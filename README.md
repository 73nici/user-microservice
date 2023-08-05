# user-microservice

The project is currently in a very minimal working state.
The main goal of this is to try out fastify and getting a deeper understanding of http cookies.

## Overview

The goal of this project is to create a microservice that facilitates user management and allows multiple applications to share the same user.
This allows applications to focus on handling application logic without worrying about managing users.

This projects consists of 3 parts.
- shared-types repository
- user-microservice-backend
- user-microservice-connector

The shared-types repository contains TypeScript types which are used by the user-microservice-backend and user-microservice-connector.
The user-microservice-backend is fastify backend which exposes routes for creating, deleting, updating and reading users.
The user-microservice-connector is a fastify plugin, which exposes routes for managing users by the applications.
This npm package forwards all user requests from the application server to the user microservice backend and returns the responses.

![user-microservice-diagram](https://github.com/73nici/user-microservice/assets/30949443/2d8eef7c-7eeb-46d2-8b43-d0aed7fb9333)

## Installation

Following installation steps are required:

- run `npm ci` in repository root directory
- run `npm ci` in connector-package directory
- run `npm ci` in backend directory
- run `docker compose up` in backend directory for starting local db
- run `npm run start` in backend directory for starting user microservice

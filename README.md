# user-microservice

[![Build backend and connector package](https://github.com/73nici/user-microservice/actions/workflows/build-dev.yaml/badge.svg)](https://github.com/73nici/user-microservice/actions/workflows/build-dev.yaml)

[![Publish connector-package to registry](https://github.com/73nici/user-microservice/actions/workflows/publish-package-to-registry.yml/badge.svg)](https://github.com/73nici/user-microservice/actions/workflows/publish-package-to-registry.yml)

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
- user-microservice is up and running

## Available routes

The payload type and the response type can be viewed in the `shared-types` package.
Once logged in or registered, a session cookie to identify the user is required.
The name of the session cookie can be configured in the `.env` file.
All response types extend the base response and contain the following data.
`{ success: true, body: T, message: M }` if the request is successful and `{ success: false, error: E }` if the request is not successful.
`T` stands for the response type, `M` for the message type and `E` for the occurred error.

| Route         | URI       | Method | Payload type           | Response type         | Possible statuscodes                                                                                                                                                      |
|---------------|-----------|--------|------------------------|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| User register | /register | POST   | TUserRegisterArgs      | TUserRegisterResponse | - 400 -> password and password confirmation don't match <br> - 409 -> User already exist and cannot be created <br> - 200 -> success                                      |
| User login    | /login    | POST   | TUserLoginArgs         | TUserLoginResponse    | - 404 -> user ist not found in the DB or provided password doesn't match <br> - 200 -> success                                                                            |
| User logout   | /logout   | GET    | TUserLogoutArgs (void) | TUserLogoutResponse   | - 200 -> success                                                                                                                                                          |
| User update   | /update   | POST   | TUserUpdateArgs        | TUserUpdateResponse   | - 409 -> new username already exist <br> - 404 -> current user is not found in the DB <br> - 400 -> new password and password confirmation doesn't match - 200 -> success |
| User delete   | /delete   | POST   | TUserDeleteArgs        | TUserDeleteResponse   | - 400 -> password and password confirmation don't match <br> - 404 user is not found in the DB OR provided password doesn't match                                         |

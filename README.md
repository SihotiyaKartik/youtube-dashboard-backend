<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

A backend API using NestJS, TypeORM, and PostgreSQL that fetches the latest and most popular videos from YouTube in 'INDIA' region every 2 hours using CronJob via its API, stores them in a PostgreSQL database, and allows user authentication. User can create account and check videos present in database and able to add videos to their "Watch Later" list with proper authentication.

## Installation

```bash
$ git clone https://github.com/SihotiyaKartik/youtube-dashboard-backend.git

$ cd <application_directory>

$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

```
base url: https://youtube-dashboard-api-v1.onrender.com
```

- Registering user

  ```
  API: {{base_url}}/users/register

  Body: {
    email,
    password
  }

  Method: POST
  ```

- Login User

  ```
  API: {{base_url}}/users/register

  Body: {
    email: string,
    password: string
  }

  Method: POST

  Return: {jwt_access_token} for authentication purpose
  ```

- Get all videos in Database

  ```
  API: {{base_url}}/videos?page=1&limit=10

  Method: GET
  ```

- Get videos by Id

  ```
  API: {{base_url}}/videos/:videoId

  Method: GET
  ```

- Get video by title

  ```
  API: {{base_url}}/videos/title

  Body: {
    title: string
  }

  Method: POST
  ```

- Add videos to watch later

  ```
  API: {{SITE_URL}}/watch_later/:videoId

  Method: POST

  Authorization: Include Jwt token as a bearer token
  ```

- Get all watchLater video for a user

  ```
  API: {{SITE_URL}}/watch_later/list

  Method: GET

  Authorization: Include Jwt token as a bearer token
  ```

- Remove a particular video from watch later

  ```
  API: {{SITE_URL}}/watch_later/:videoId

  Method: DELETE

  Authorization: Include Jwt token as a bearer token
  ```

## Stay in touch

- Author - [Kartik Sihotiya](www.linkedin.com/in/kartik-sihotiya-2002)
- Website - https://kartiksihotiya.netlify.app/
- Twitter - https://twitter.com/KartikSihotiya

## License

Nest is [MIT licensed](LICENSE).

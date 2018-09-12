## TeraVoz Client

Service to handle calls with Teravoz API

### Summary

- [Up and Running](#running)
  - [Adding calls](#add-calls)
- [Builds for Testing and Development](#builds)
- [Project structure](#structure)
  - [src](#src)
  - [src/components](#src/components)
  - [src/routes](#src/routes)
  - [tests](#tests)
  - [pages and components](#dash)
- [Dev Notes](#dev-notes)

### <a name="running"></a>Up and Running

In order to run this project, you need to have the following installed:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

With that, you just need to clone this repo, cd into it and then run:

```bash
$ docker-compose up --build
```

And it will do all the heavy leafiting for you.

With that you're able to hit http://localhost:3000 in your browser and see the calls and their status if there are any.

#### <a name="add-calls"></a>Adding and Updating calls

With the service running you can POST to the /webhook endpoint with a valid call or actor object, like the following:

```javascript
// call schema
{
  type: String, // required
  call_id: String, // required
  direction: String, // required
  our_number: String, // required
  their_number: String, // required
  timestamp: Date, // required
  code: String,
  their_number_type: String
}

// actor schema
{
  type: String, // required
  actor: String, // required
  number: String, // required
  timestamp: String, // required
  queue: String, // required
  code: String,
  call_id: String
}
```

*PS: actor objects will not be persisted, just validated according to the scope of this project*

Right after that you'll be able to see a new call appears in the dashboard.

If you want to update a existing call, you just need to hit the same route with a call object containing the same call_id from the existing one.

### <a name="builds"></a>Builds for Testing and Development

This project also contains specific compose and Dockerfiles to run test and dev environments. To run them you just need run the following:

```bash
# development
$ docker-compose -f docker-compose.dev.yml up --build
```

```bash
# testing
$ docker-compose -f docker-compose.test.yml up --build
```

### <a name="structure"></a>Project Structure

This project is divided in some main folders, they're:

- __src__ - back-end
- __tests__ - back-end testing
- __pages__ and __components__ - dashboard

#### <a name="src"></a>src

This folder contains all the logic related to the back-end, and it's where the `server.js` file is located, that is the main entrypoint of the application.

If you open it, you'll see that it uses a module called `consign`. All that it does is to load files and folders, where JS modules are located, in a single object that will be passed as a function parameter to each of this modules. Because of that, you'll see many files with a similar syntax:

```javascript
// some-module.js
module.exports = app => {
  // some-module logic

  return {
    // some-module functions and data
  }
}
```

#### <a name="src/components"></a>src/components

This dir contains modules that have specific functionalities in the service.

`calls.js` and `webhook.js` are route handlers. `webhook.js` contains most of
the core logic of the service, handling and updating calls as necessary.

The `teravoz.js` is a module to wrap calls to TeraVoz API, it has a condition
that prevents it from making calls, making it a module just for test purposes.

`store.js` acts as a database manager, but it saves data locally in the file-system.

`socket.js` is a module for connecting and creating the socket.io instance.

`next.js` is a module for creating NextJS instances.

#### <a name="src/routes"></a>src/routes

Contain some file to map the routes to the respective handlers in the
`src/components` dir.

#### <a name="tests"></a>tests

Contains the test files for the application. Thinking in the scope of this
project the tests were focused in the core of the application.

`fixtures/` contains some mock data for the tests.

#### <a name="dash"></a>pages and components

These dirs are used by [NextJS](https://nextjs.org) to create the application dashboard with React
Components.

### <a name="dev-notes"></a>Dev Notes

The code was made using the [StandardJS](https://standardjs.com/) code style

When running the app in production, for some reason nextjs shows that the `GET /calls` returns a `404` response. But it works normally.
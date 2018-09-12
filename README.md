## TeraVoz Client

Service to handle calls with Teravoz API

### Up and Running

In order to run this project, you need to have the following installed:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

With that, you just need to clone this repo, cd into it and then run:

```bash
$ docker-compose up --build
```

And it will do the heavy leafiting for you.

With that you're able to hit http://localhost:3000 in your browser and see the calls and their status if there are any.

#### Adding and Updating calls

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
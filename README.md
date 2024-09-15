# Run App in development environment

Running the app depends on a environment variable

`REACT_APP_API_BASE_URL`

Use this command to run in local environment

`REACT_APP_API_BASE_URL=<API Url> npm start`

Use this Url for testing - `https://flight-status-mock.core.travelopia.cloud`

# Run App in docker

- Build docker image `docker build -t flight-stats:1.0 .`
- Check image ID `docker images`
- Run Docker image `docker run -d -it -p 3000:3000 <image id>`

# Run test

`npm test`

# @boilerz/logger

[![GitHub package.json version](https://img.shields.io/github/package-json/v/boilerz/logger)](https://www.npmjs.com/package/@boilerz/logger) [![Greenkeeper badge](https://badges.greenkeeper.io/boilerz/logger.svg)](https://greenkeeper.io/)

> Bunyan logger with Sentry support.

### Install

````bash
npx install-peerdeps @boilerz/logger
````

### Usage

This logger module setup itself by capturing his configuration from the environment. Below the supported config:

| Name               | Default                           | Description                                  |
|--------------------|-----------------------------------|----------------------------------------------|
| LOGGER_NAME        | `package.json[name]`              | Logger name.                                 |
| LOGGER_LEVEL       | `info`                            | Logger level.                                |
| SENTRY_DSN         |                                   | Sentry dsn. (*Optional for sentry support*). |                            |
| SENTRY_DIST        | `process.env.HEROKU_SLUG_COMMIT`  | Sentry dist.                                 |


```js
import logger from '@boilerz/logger';

// Just use it as normal bunyan logger
logger.error({ err, my, extra, info }, 'my log message')
```

### Release

```bash
yarn version
yarn build
yarn publish dist --access public
```

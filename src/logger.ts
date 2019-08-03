import process from 'process';
import * as Sentry from '@sentry/node';
import Logger, { createLogger, LoggerOptions, LogLevelString } from 'bunyan';
import SentryStream from 'bunyan-sentry-stream';
import readPkg from 'read-pkg';

import client from './sentry-stream-client';

const defaultOptions: LoggerOptions = {
  name: process.env.LOGGER_NAME || readPkg.sync({ cwd: process.cwd() }).name,
  level: (process.env.LOGGER_LEVEL as LogLevelString) || 'info',
};

const dist: string | undefined =
  process.env.SENTRY_DIST || process.env.HEROKU_SLUG_COMMIT;
const environment = process.env.NODE_ENV || 'development';
const dsn = process.env.SENTRY_DSN;
const defaultSentryNodeOptions: Sentry.NodeOptions | undefined = dsn
  ? {
      environment,
      dist,
      dsn,
      release: `${dist ? dist.substring(0, 6) : environment}`,
    }
  : undefined;

export function setup(
  options: LoggerOptions,
  sentryNodeOptions?: Sentry.NodeOptions,
): Logger {
  const logger = createLogger({ ...defaultOptions, ...options });

  if (sentryNodeOptions) {
    Sentry.init({ ...defaultSentryNodeOptions, ...sentryNodeOptions });
    logger.addStream(new SentryStream(client));
  }

  return logger;
}

const logger: Logger = setup(defaultOptions, defaultSentryNodeOptions);

export default logger;

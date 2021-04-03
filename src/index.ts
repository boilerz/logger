import process from 'process';

import * as Sentry from '@sentry/node';
import Logger, {
  createLogger,
  LoggerOptions,
  LogLevelString,
  stdSerializers,
} from 'bunyan';
import SentryStream from 'bunyan-sentry-stream';
import { readPackageSync } from 'read-pkg';

import client from './sentry-stream-client';

const defaultOptions: LoggerOptions = {
  name: process.env.LOGGER_NAME || readPackageSync({ cwd: process.cwd() }).name,
  level: (process.env.LOGGER_LEVEL as LogLevelString) || 'info',
  serializers: {
    err: stdSerializers.err,
  },
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

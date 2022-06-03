import * as Sentry from '@sentry/node';
import type { Scope } from '@sentry/node';
import { Client, LegacyRavenContext } from 'bunyan-sentry-stream';

/**
 * Bridge between @sentry-node Client and legacy raven one since `bunyan-sentry-stream`
 * use legacy sentry client.
 */
const client: Client = {
  captureException(
    err: Error,
    { extra = {}, tags = {} }: LegacyRavenContext,
  ): void {
    Sentry.withScope((scope: Scope): void => {
      scope.setExtras(extra);
      scope.setTags(tags);
      Sentry.captureException(err);
    });
  },
  captureMessage(
    message: string,
    { extra = {}, tags = {}, level }: LegacyRavenContext,
  ): void {
    Sentry.withScope((scope: Scope): void => {
      scope.setExtras(extra);
      scope.setTags(tags);
      Sentry.captureMessage(message, level);
    });
  },
};

export default client;

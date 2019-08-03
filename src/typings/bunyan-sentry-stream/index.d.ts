declare module 'bunyan-sentry-stream' {
  import * as Sentry from '@sentry/node';

  interface Dictionary {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  export interface LegacyRavenContext {
    extra: Dictionary;
    level: Sentry.Severity;
    tags: Dictionary;
  }

  export interface Client {
    captureException(err: Error, context: LegacyRavenContext): void;
    captureMessage(message: string, context: LegacyRavenContext): void;
  }

  export default class SentryStream {
    // eslint-disable-next-line no-empty-function,no-useless-constructor
    public constructor(client: Client) {}
  }
}

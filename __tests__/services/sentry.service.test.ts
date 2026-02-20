import { config } from '@config/app.config';
import * as Sentry from '@sentry/react-native';
import { captureError, initializeSentry } from '@services/sentry.service';

describe('sentry service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    config.features.crashReporting = true;
    config.sentry.dsn = 'https://test@sentry.io/1';
    config.sentry.environment = 'test';
    config.sentry.tracesSampleRate = 0.2;
  });

  it('skips initialization when feature flag is disabled', () => {
    config.features.crashReporting = false;

    initializeSentry();

    expect(Sentry.init).not.toHaveBeenCalled();
  });

  it('initializes SDK when enabled and DSN exists', () => {
    initializeSentry();

    expect(Sentry.init).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: 'https://test@sentry.io/1',
        environment: 'test',
        tracesSampleRate: 0.2,
      }),
    );
  });

  it('captures exception after initialization', () => {
    const error = new Error('test');

    initializeSentry();
    captureError(error, {
      tags: { source: 'unit-test' },
      extra: { detail: 'value' },
    });

    expect(Sentry.withScope).toHaveBeenCalled();
    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });
});

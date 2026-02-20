const Sentry = {
  init: jest.fn(),
  captureException: jest.fn(),
  setUser: jest.fn(),
  withScope: jest.fn(callback => {
    const scope = {
      setTag: jest.fn(),
      setExtra: jest.fn(),
    };
    callback(scope);
  }),
};

module.exports = Sentry;

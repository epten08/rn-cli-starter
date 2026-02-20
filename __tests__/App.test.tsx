jest.mock('@store/index', () => ({
  store: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({})),
    replaceReducer: jest.fn(),
    subscribe: jest.fn(() => jest.fn()),
    [Symbol.observable]: jest.fn(),
  },
  persistor: {
    dispatch: jest.fn(),
    getState: jest.fn(() => ({ bootstrapped: true })),
    pause: jest.fn(),
    persist: jest.fn(),
    purge: jest.fn(),
    flush: jest.fn(() => Promise.resolve()),
    subscribe: jest.fn(() => jest.fn()),
  },
}));

import App from '../App';

describe('App', () => {
  it('exports a valid component', () => {
    expect(App).toBeDefined();
  });
});

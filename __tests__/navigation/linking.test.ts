import {
  DEEP_LINK_DOMAIN,
  DEEP_LINK_SCHEME,
  linking,
} from '../../src/navigation/linking';

describe('navigation linking config', () => {
  it('defines expected deep link prefixes', () => {
    expect(linking.prefixes).toContain(`${DEEP_LINK_SCHEME}://`);
    expect(linking.prefixes).toContain(`https://${DEEP_LINK_DOMAIN}`);
    expect(linking.prefixes).toContain(`http://${DEEP_LINK_DOMAIN}`);
  });

  it('maps auth and main routes to stable deep link paths', () => {
    const screens = linking.config?.screens;

    expect(screens?.Onboarding).toBe('onboarding');

    const authScreens = (screens?.Auth as { screens?: Record<string, string> })
      ?.screens;
    expect(authScreens?.Login).toBe('login');
    expect(authScreens?.Register).toBe('register');
    expect(authScreens?.ForgotPassword).toBe('forgot-password');

    const mainScreens = (
      screens?.Main as {
        screens?: Record<string, unknown>;
      }
    )?.screens;
    expect(mainScreens?.Settings).toBe('settings');
    expect(mainScreens?.EditProfile).toBe('profile/edit');
    expect(mainScreens?.Profile).toBe('profile/:userId?');
  });
});

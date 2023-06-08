describe('Login', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should show the login screen after app launch', async () => {
    await expect(element(by.text('Sign in to your account'))).toBeVisible();
    await expect(element(by.text('Username *'))).toBeVisible();
    await expect(element(by.text('Password *'))).toBeVisible();
    await expect(element(by.text('SIGN IN'))).toBeVisible();
  });

  it('should fill username and password and press the login button', async () => {
    await element(by.type('android.widget.EditText')).atIndex(0).typeText('rgeorge13');
    await element(by.type('android.widget.EditText')).atIndex(1).typeText('@Rohan3');

    await element(by.text('SIGN IN')).tap();
    // Now you should wait for the element that is expected to be visible after login
    await expect(element(by.id('flower-text'))).toBeVisible();
  });
});
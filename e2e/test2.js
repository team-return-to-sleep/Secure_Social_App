describe('Login Fail', () => {
  beforeEach(async () => {
    await device.launchApp();
  });


  it('as username is incorrect and wrong sign up', async () => {
    await element(by.type('android.widget.EditText')).atIndex(0).typeText('rgeorge');
    await element(by.type('android.widget.EditText')).atIndex(1).typeText('@Roh3');

    await element(by.text('SIGN IN')).tap();
    await expect(element(by.text('User is not confirmed.'))).toBeVisible();

    await element(by.text('Sign Up')).tap();
    await element(by.type('android.widget.EditText')).atIndex(0).typeText('rgeorge');
    await element(by.type('android.widget.EditText')).atIndex(1).typeText('rgeorge');
    await device.pressBack();
    await element(by.type('android.widget.EditText')).atIndex(2).typeText('rgeorge');
    await device.pressBack();
    await element(by.type('android.widget.EditText')).atIndex(3).typeText('rgeorge');
    await device.pressBack();
    await element(by.text('SIGN UP')).tap();
    await expect(element(by.text('Invalid email address format.'))).toBeVisible();
  });
});
describe('Personal Profile', () => {
  beforeEach(async () => {
    await device.launchApp();
  });

  it('should login first', async () => {
    await element(by.type('android.widget.EditText')).atIndex(0).typeText('rgeorge13');
    await element(by.type('android.widget.EditText')).atIndex(1).typeText('@Rohan3');

    await element(by.text('SIGN IN')).tap();
    // Now you should wait for the element that is expected to be visible after login
    await expect(element(by.id('flower-text'))).toBeVisible();
  });

  it('should test new buds drop down', async () => {
      await element(by.id('BrowseTab')).tap();
      await element(by.text('Age')).tap();
      await element(by.text('35 to 44')).tap();
      await element(by.text('Region')).tap();
      await element(by.text('West')).tap();
      await element(by.text('Select Interests')).tap();
      await element(by.text('Books & Literature')).tap();
      await element(by.text('Business')).tap();
      await element(by.text('Career')).tap();
      await device.pressBack();
      await element(by.text('Business')).tap();
      await element(by.text('Search Users')).tap();
    });


});
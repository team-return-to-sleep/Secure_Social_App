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

  it('should test best buds', async () => {
      // await element(by.id('scrollView3')).scroll(200, 'down');
      await waitFor(element(by.id('viewprofile-rgeorge13'))).toBeVisible().whileElement(by.id('scrollView3')).scroll(200, 'down');
      await element(by.id('viewprofile-rgeorge13')).tap();
      await element(by.id('scrollView2')).scrollTo('bottom');
     // await element(by.type('android.widget.EditText')).atIndex(0).typeText('rgeorge13');
      await element(by.text('Add as Best Bud')).tap();
      await element(by.id('ChatsTab')).tap();
      await element(by.id('chat-rgeorge13')).tap();
      await element(by.id('camera')).tap();

      await device.pressBack();
      await element(by.id('HomeTab')).tap();
      await element(by.text('Remove Best Bud')).tap();
      await element(by.id('ChatsTab')).tap();
      await element(by.id('chat-rgeorge13')).tap();
      await element(by.id('camera')).tap();

      await element(by.text('OK')).tap();

    });


});